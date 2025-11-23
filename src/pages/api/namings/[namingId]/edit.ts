import type { NextApiRequest, NextApiResponse } from "next";
import { NamingWillEdit } from "../../../../models/naming";
import namingRepository from "../../../../repositories/naming";
import { getAuthedUserId } from "../../authHelper";
import { namingEditSchema } from "../../validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  let params: NamingWillEdit;
  try {
    const body = JSON.parse(req.body);
    params = namingEditSchema.parse(body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const existingNaming = await namingRepository.get(params.id);
  if (!existingNaming) {
    res.status(404).send(undefined);
    return;
  }
  if (existingNaming.authorId !== ownerId) {
    res.status(403).send(undefined);
    return;
  }
  const response = await namingRepository.update(params);
  res.status(200).json(response);
};

export default handler;
