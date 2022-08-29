import type { NextApiRequest, NextApiResponse } from "next";
import { NamingWillSubmit } from "../../../models/naming";
import { NotificationKind } from "../../../models/notification";
import namingRepository from "../../../repositories/naming";
import notificationRepository from "../../../repositories/notification";
import { getAuthedUserId } from "../authHelper";

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
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  try {
    const response = await namingRepository.create(params);
    // TODO(Niccari): use authenticated author id as toAuthorId.
    const notification = await notificationRepository.create({
      reactedModelId: response.id,
      reactionKind: NotificationKind.RECEIVED_NAME,
      fromAuthorId: params.authorId,
      toAuthorId: params.authorId,
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
