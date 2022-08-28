import type { NextApiRequest, NextApiResponse } from "next";
import imageRepository from "../../../../repositories/image/firebase";
import namingTargetRepository from "../../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId } = req.query;
  if (req.method !== "POST" || typeof targetId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const { imageId } = await namingTargetRepository.get(targetId);
    await namingTargetRepository.delete(targetId);
    if (imageId) {
      await imageRepository.delete(imageId);
    }
    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
