import type { NextApiRequest, NextApiResponse } from "next";
import namingRepository from "../../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { namingId } = req.query;
  if (req.method !== "POST" || typeof namingId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    await namingRepository.delete(namingId);
    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
