import type { NextApiRequest, NextApiResponse } from "next";
import imageRepository from "../../../../repositories/image/firebase";
import personalUserRepository from "../../../../repositories/personalUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, detailed } = req.query;
  if (typeof userId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  const isDetailed = detailed === "true";
  const personalUser = await personalUserRepository.get(userId);
  if (!personalUser || personalUser.isDeleted) {
    res.status(200).json(undefined);
    return;
  }
  const imageUrl = personalUser.iconImageId
    ? await imageRepository.resolveUrl(personalUser.iconImageId)
    : undefined;
  if (isDetailed) {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
    res.status(200).json({
      ...personalUser,
      imageUrl,
    });
    return;
  } else {
    const { id, name, userId } = personalUser;
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
    res.status(200).json({
      id,
      name,
      userId,
      imageUrl,
    });
  }
};

export default handler;
