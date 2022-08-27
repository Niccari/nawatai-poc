import type { NextApiRequest, NextApiResponse } from "next";
import namingRepository from "../../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { namingId } = req.query;
  if (typeof namingId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    const naming = await namingRepository.get(namingId);
    res.status(200).json(naming);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
