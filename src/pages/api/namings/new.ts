import type { NextApiRequest, NextApiResponse } from "next";
import { NamingWillSubmit } from "../../../models/naming";
import { NotificationKind } from "../../../models/notification";
import namingRepository from "../../../repositories/naming";
import namingTargetRepository from "../../../repositories/namingTarget";
import notificationRepository from "../../../repositories/notification";
import { getAuthedUserId } from "../authHelper";
import { namingSubmitSchema } from "../validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
    return;
  }
  let params: NamingWillSubmit;
  try {
    const body = JSON.parse(req.body);
    params = namingSubmitSchema.parse(body);
  } catch (e) {
    res.status(400).send(undefined);
    return;
  }
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  const target = await namingTargetRepository.get(params.targetId);
  if (!target) {
    res.status(404).send(undefined);
    return;
  }
  const namings = await namingRepository.create(params);
  if (ownerId !== target.authorId) {
    const notification = await notificationRepository.create({
      targetId: namings.targetId,
      namingId: namings.id,
      reactionKind: NotificationKind.RECEIVED_NAME,
      fromAuthorId: ownerId,
      toAuthorId: target.authorId,
    });
  }
  res.status(200).json(namings);
};

export default handler;
