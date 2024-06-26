import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../../../constants";
import { NamingTargetListGenre } from "../../../../../models/namingTarget";
import namingRepository from "../../../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId, genre, page } = req.query;
  if (
    (genre !== NamingTargetListGenre.HOT &&
      genre !== NamingTargetListGenre.LATEST) ||
    typeof page !== "string" ||
    typeof targetId !== "string"
  ) {
    res.status(400).send(undefined);
    return;
  }
  const items = await namingRepository.listByTarget(
    Constants.namingsPageCount,
    targetId,
    genre,
    parseInt(page, 10),
  );
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  res.status(200).json(items);
};

export default handler;
