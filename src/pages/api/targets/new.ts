import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetWithoutId } from "../../../models/namingTarget";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
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
    res.status(400).send(undefined);
    return;
  }
  try {
    // TODO(Niccari): NamingTargetForViewに互換のある型に変換する
    const response = await namingTargetRepository.create(namingTarget);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
