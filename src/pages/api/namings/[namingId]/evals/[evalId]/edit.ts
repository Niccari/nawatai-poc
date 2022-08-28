import type { NextApiRequest, NextApiResponse } from "next";
import { updateEvalCounts } from "../new";
import { NamingEvalWillEdit } from "../../../../../../models/namingEval";
import namingEvalRepository from "../../../../../../repositories/namingEval";

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
  try {
    const isCancelled = await namingEvalRepository.update(params);
    updateEvalCounts(params, isCancelled);

    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
