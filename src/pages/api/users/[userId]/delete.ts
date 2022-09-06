import type { NextApiRequest, NextApiResponse } from "next";
import namingRepository from "../../../../repositories/naming";
import namingTargetRepository from "../../../../repositories/namingTarget";
import notificationRepository from "../../../../repositories/notification";
import personalUserActivityRepository from "../../../../repositories/personalUserActivity";
import personalUserRepository from "../../../../repositories/personalUser";
import { getAuthedUserId } from "../../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (req.method !== "POST" && typeof userId !== "string") {
    res.status(400).send(undefined);
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  if (ownerId !== userId) {
    res.status(403).send(undefined);
    return;
  }
  try {
    await personalUserRepository.anonymize(ownerId);
    await personalUserActivityRepository.anonymize(ownerId);
    await notificationRepository.anonymize(ownerId);
    await namingTargetRepository.anonymize(ownerId);
    await namingRepository.anonymize(ownerId);
    res.status(200).json({});
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
