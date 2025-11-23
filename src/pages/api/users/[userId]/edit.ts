import type { NextApiRequest, NextApiResponse } from "next";
import { PersonalUser } from "../../../../models/personalUser";
import imageRepository from "../../../../repositories/image/firebase";
import personalUserRepository from "../../../../repositories/personalUser";
import { getAuthedUserId } from "../../authHelper";
import { personalUserSchema } from "../../validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  let params: PersonalUser;
  try {
    const body = JSON.parse(req.body);
    params = personalUserSchema.parse(body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const personalUser = await personalUserRepository.get(params.id);
  if (ownerId !== personalUser?.id) {
    res.status(403).send(undefined);
    return;
  }
  await personalUserRepository.update(params);
  const imageUrl = params.iconImageId
    ? await imageRepository.resolveUrl(params.iconImageId)
    : undefined;
  res.status(200).json({
    ...params,
    imageUrl,
  });
};

export default handler;
