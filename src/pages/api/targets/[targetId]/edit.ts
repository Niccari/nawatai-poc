import type { NextApiRequest, NextApiResponse } from "next";
import {
  NamingTargetForView,
  NamingTargetWillEdit,
} from "../../../../models/namingTarget";
import imageRepository from "../../../../repositories/image/firebase";
import namingTargetRepository from "../../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: NamingTargetWillEdit;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  try {
    const target = await namingTargetRepository.update(params);
    const targetForView: NamingTargetForView = {
      ...target,
      imageUrl: target.imageId
        ? await imageRepository.resolveUrl(target.imageId)
        : undefined,
    };
    res.status(200).json(targetForView);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
