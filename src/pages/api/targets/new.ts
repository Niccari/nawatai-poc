import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetWithoutId } from "../../../models/namingTarget";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({});
  }
  let namingTarget: NamingTargetWithoutId;
  try {
    const params = JSON.parse(req.body);
    namingTarget = {
      ...params,
      createdAt: new Date(),
      evalCounts: 0,
    };
  } catch (e) {
    res.status(400).json({});
    return;
  }
  try {
    await namingTargetRepository.create(namingTarget);
    res.status(200).json({});
  } catch (e) {
    res.status(500).json({});
  }
};

export default handler;
