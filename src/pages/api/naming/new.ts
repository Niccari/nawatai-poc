import type { NextApiRequest, NextApiResponse } from "next";
import { NamingWillSubmit } from "../../../models/naming";
import namingRepository from "../../../repositories/naming";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: NamingWillSubmit;
  try {
    params = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  try {
    const response = await namingRepository.create(params);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
