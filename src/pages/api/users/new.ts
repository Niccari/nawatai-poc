import type { NextApiRequest, NextApiResponse } from "next";
import { PersonalUser } from "../../../models/personalUser";
import personalUserRepository from "../../../repositories/personalUser";
import personalUserActivityRepository from "../../../repositories/personalUserActivity";
import { getAuthedUserId } from "../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: PersonalUser;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  try {
    await personalUserRepository.create(params);
    await personalUserActivityRepository.create(params.id);
    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
