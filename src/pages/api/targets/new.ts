import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetWillSubmit } from "../../../models/namingTarget";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: NamingTargetWillSubmit;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  try {
    const response = await namingTargetRepository.create(params);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
