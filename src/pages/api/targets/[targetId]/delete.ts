import type { NextApiRequest, NextApiResponse } from "next";
import imageRepository from "../../../../repositories/image/firebase";
import namingTargetRepository from "../../../../repositories/namingTarget";
import { getAuthedUserId } from "../../authHelper";
import { verifyCsrfToken } from "../../csrfProtection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId } = req.query;
  if (req.method !== "POST" || typeof targetId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  // CSRF保護
  if (!verifyCsrfToken(req, res)) {
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  const { authorId, imageId } = await namingTargetRepository.get(targetId);
  if (ownerId !== authorId) {
    res.status(403).send(undefined);
    return;
  }
  await namingTargetRepository.delete(targetId);
  if (imageId) {
    await imageRepository.delete(imageId);
  }
  res.status(200).json({});
};

export default handler;
