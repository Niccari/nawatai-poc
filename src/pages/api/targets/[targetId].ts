import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetForView } from "../../../models/namingTarget";
import imageRepository from "../../../repositories/image/firebase";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId } = req.query;
  if (typeof targetId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const target = await namingTargetRepository.get(targetId);
    const targetForView: NamingTargetForView = {
      ...target,
      imageUrl: target.imageId
        ? await imageRepository.resolveUrl(target.imageId)
        : undefined,
    };
    res.setHeader("Cache-Control", "max-age=300, s-maxage=300");
    res.status(200).json(targetForView);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
