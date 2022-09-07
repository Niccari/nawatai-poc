import type { NextApiRequest, NextApiResponse } from "next";
import namingRepository from "../../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { namingId } = req.query;
  if (typeof namingId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  const naming = await namingRepository.get(namingId);
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  res.status(200).json(naming);
};

export default handler;
