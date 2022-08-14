import type { NextApiRequest, NextApiResponse } from "next";
import { PersonalUser } from "../../../models/personalUser";
import personalUserRepository from "../../../repositories/personalUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({});
  }
  let personalUser: PersonalUser;
  try {
    const params = JSON.parse(req.body);
    personalUser = {
      ...params,
      evalCounts: 0,
      signUpAt: new Date(),
    };
  } catch (e) {
    res.status(400).json({});
    return;
  }
  try {
    await personalUserRepository.create(personalUser);
    res.status(200).json({});
  } catch (e) {
    res.status(500).json({});
  }
};

export default handler;
