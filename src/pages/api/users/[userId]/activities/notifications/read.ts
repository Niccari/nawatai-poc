import type { NextApiRequest, NextApiResponse } from "next";
import personalUserActivityRepository from "../../../../../../repositories/personalUserActivity";
import { getAuthedUserId } from "../../../../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (req.method !== "POST" && typeof userId !== "string") {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  if (userId !== ownerId) {
    res.status(403).send(undefined);
    return;
  }
  await personalUserActivityRepository.update({
    id: userId,
    lastReadNotificationAt: new Date(),
  });
  res.status(200).json({});
};

export default handler;
