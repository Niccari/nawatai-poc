import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../constants";
import {
  NamingTargetForView,
  NamingTargetListGenre,
} from "../../../models/namingTarget";
import imageRepository from "../../../repositories/image/firebase";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { genre, page } = req.query;
  if (
    (genre !== NamingTargetListGenre.HOT &&
      genre !== NamingTargetListGenre.LATEST) ||
    typeof page !== "string"
  ) {
    res.status(400).send(undefined);
    return;
  }
  const items = await namingTargetRepository.list(
    Constants.namingsPageCount,
    genre,
    parseInt(page, 10),
  );
  const targets: NamingTargetForView[] = await Promise.all(
    items.map(async (item) => ({
      ...item,
      imageUrl: item.imageId
        ? await imageRepository.resolveUrl(item.imageId)
        : undefined,
    })),
  );
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  res.status(200).json(targets);
};

export default handler;
