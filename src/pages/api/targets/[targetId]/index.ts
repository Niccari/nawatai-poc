import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetForView } from "../../../../models/namingTarget";
import imageRepository from "../../../../repositories/image/firebase";
import namingTargetRepository from "../../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId } = req.query;
  if (typeof targetId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  const target = await namingTargetRepository.get(targetId);
  const targetForView: NamingTargetForView = {
    ...target,
    imageUrl: target.imageId
      ? await imageRepository.resolveUrl(target.imageId)
      : undefined,
  };
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  res.status(200).json(targetForView);
};

export default handler;
