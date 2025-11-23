import type { NextApiRequest, NextApiResponse } from "next";
import namingRepository from "../../../../repositories/naming";
import { getAuthedUserId } from "../../authHelper";
import { verifyCsrfToken } from "../../csrfProtection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { namingId } = req.query;
  if (req.method !== "POST" || typeof namingId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  // CSRF保護
  if (!verifyCsrfToken(req, res)) {
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  const { authorId } = await namingRepository.get(namingId);
  if (authorId !== ownerId) {
    res.status(403).send(undefined);
    return;
  }
  await namingRepository.delete(namingId);
  res.status(200).json({});
};

export default handler;
