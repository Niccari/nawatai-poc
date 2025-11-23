import type { NextApiRequest, NextApiResponse } from "next";
import {
  NamingTargetForView,
  NamingTargetWillEdit,
} from "../../../../models/namingTarget";
import imageRepository from "../../../../repositories/image/firebase";
import namingTargetRepository from "../../../../repositories/namingTarget";
import { getAuthedUserId } from "../../authHelper";
import { namingTargetEditSchema } from "../../validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
    return;
  }
  let params: NamingTargetWillEdit;
  try {
    const body = JSON.parse(req.body);
    params = namingTargetEditSchema.parse(body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  const existingTarget = await namingTargetRepository.get(params.id);
  if (!existingTarget) {
    res.status(404).send(undefined);
    return;
  }
  if (ownerId !== existingTarget.authorId) {
    res.status(403).send(undefined);
    return;
  }
  const target = await namingTargetRepository.update(params);
  const targetForView: NamingTargetForView = {
    ...target,
    imageUrl: target.imageId
      ? await imageRepository.resolveUrl(target.imageId)
      : undefined,
  };
  res.status(200).json(targetForView);
};

export default handler;
