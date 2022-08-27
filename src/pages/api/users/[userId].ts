import type { NextApiRequest, NextApiResponse } from "next";
import { PersonalUserBasicView } from "../../../models/personalUser";
import imageRepository from "../../../repositories/image/firebase";
import personalUserRepository from "../../../repositories/personalUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (typeof userId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const { id, name, iconImageId } = await personalUserRepository.get(userId);
    const imageUrl = iconImageId
      ? await imageRepository.resolveUrl(iconImageId)
      : undefined;
    const personalUserBasicView: PersonalUserBasicView = {
      id,
      name,
      userId,
      imageUrl,
    };
    res.status(200).json(personalUserBasicView);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
