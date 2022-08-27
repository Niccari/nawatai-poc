import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../constants";
import { NamingTargetListGenre } from "../../../models/namingTarget";
import namingRepository from "../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { genre, page } = req.query;
  if (
    (genre !== NamingTargetListGenre.HOT &&
      genre !== NamingTargetListGenre.LATEST) ||
    typeof page !== "string"
  ) {
    res.status(400).send(undefined);
    return;
  }
  try {
    const items = await namingRepository.list(
      Constants.namingsPageCount,
      genre,
      parseInt(page, 10)
    );
    res.status(200).json(items);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
