import type { NextApiRequest, NextApiResponse } from "next";
import personalUserRepository from "../../../repositories/personalUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (typeof userId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const personalUser = await personalUserRepository.get(userId);
    res.setHeader("Cache-Control", "max-age=300, s-maxage=300");
    res.status(200).json(personalUser);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
