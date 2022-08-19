import type { NextApiRequest, NextApiResponse } from "next";
import namingTargetRepository from "../../../repositories/namingTarget";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { targetId } = req.query;
  if (typeof targetId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  try {
    // TODO(Niccari): NamingTargetForViewに互換のある型に変換する
    const target = await namingTargetRepository.get(targetId);
    res.setHeader("Cache-Control", "max-age=300, s-maxage=300");
    res.status(200).json(target);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
