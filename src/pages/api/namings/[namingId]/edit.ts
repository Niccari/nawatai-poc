import type { NextApiRequest, NextApiResponse } from "next";
import { NamingWillEdit } from "../../../../models/naming";
import namingRepository from "../../../../repositories/naming";
import { getAuthedUserId } from "../../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  let params: NamingWillEdit;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const { authorId } = await namingRepository.get(params.id);
  if (authorId !== ownerId) {
    res.status(403).send(undefined);
    return;
  }
  try {
    const response = await namingRepository.update(params);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
