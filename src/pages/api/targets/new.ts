import type { NextApiRequest, NextApiResponse } from "next";
import { NamingTargetWillSubmit } from "../../../models/namingTarget";
import namingTargetRepository from "../../../repositories/namingTarget";
import { getAuthedUserId } from "../authHelper";
import { namingTargetSubmitSchema } from "../validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
    return;
  }
  if (!(await getAuthedUserId(req, res))) {
    return;
  }
  let params: NamingTargetWillSubmit;
  try {
    const body = JSON.parse(req.body);
    params = namingTargetSubmitSchema.parse(body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const response = await namingTargetRepository.create(params);
  res.status(200).json(response);
};

export default handler;
