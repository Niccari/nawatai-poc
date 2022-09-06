import type { NextApiRequest, NextApiResponse } from "next";
import namingEvalRepository from "../../../../../repositories/namingEval";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId, authorId } = req.query;
  if (
    req.method !== "GET" ||
    typeof targetId !== "string" ||
    typeof authorId !== "string"
  ) {
    res.status(400).send(undefined);
    return;
  }
  const items = await namingEvalRepository.listByUserOfTarget(
    targetId,
    authorId
  );
  res.status(200).json(items);
};

export default handler;
