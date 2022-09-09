import type { NextApiRequest, NextApiResponse } from "next";
import { updateEvalCounts } from "../new";
import { NamingEvalWillEdit } from "../../../../../../models/namingEval";
import namingEvalRepository from "../../../../../../repositories/namingEval";
import { getAuthedUserId } from "../../../../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: NamingEvalWillEdit;
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
  const { authorId } = await namingEvalRepository.get(params.id);
  if (authorId !== ownerId) {
    res.status(403).send(undefined);
    return;
  }
  try {
    const isCancelled = await namingEvalRepository.update(params);
    await updateEvalCounts(params, isCancelled);

    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
