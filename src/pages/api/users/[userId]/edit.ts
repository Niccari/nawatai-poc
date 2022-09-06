import type { NextApiRequest, NextApiResponse } from "next";
import { PersonalUser } from "../../../../models/personalUser";
import imageRepository from "../../../../repositories/image/firebase";
import personalUserRepository from "../../../../repositories/personalUser";
import { getAuthedUserId } from "../../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  let params: PersonalUser;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const { id } = await personalUserRepository.get(params.id);
  if (ownerId !== id) {
    res.status(403).send(undefined);
    return;
  }
  try {
    await personalUserRepository.update(params);
    const imageUrl = params.iconImageId
      ? await imageRepository.resolveUrl(params.iconImageId)
      : undefined;
    res.status(200).json({
      ...params,
      imageUrl,
    });
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;