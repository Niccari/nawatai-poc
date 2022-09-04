import type { NextApiRequest, NextApiResponse } from "next";
import {
  PersonalUserBasicView,
  PersonalUserDetailView,
} from "../../../../models/personalUser";
import imageRepository from "../../../../repositories/image/firebase";
import personalUserRepository from "../../../../repositories/personalUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, detailed } = req.query;
  if (typeof userId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const isDetailed = detailed === "true";
    const personalUser = await personalUserRepository.get(userId);
    const imageUrl = personalUser.iconImageId
      ? await imageRepository.resolveUrl(personalUser.iconImageId)
      : undefined;
    if (isDetailed) {
      res.status(200).json({
        ...personalUser,
        imageUrl,
      });
      return;
    } else {
      const { id, name, userId } = personalUser;
      res.status(200).json({
        id,
        name,
        userId,
        imageUrl,
      });
    }
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
