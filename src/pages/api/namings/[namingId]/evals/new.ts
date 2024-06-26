import type { NextApiRequest, NextApiResponse } from "next";
import {
  NamingEvalKind,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../../../../models/namingEval";
import { NotificationKind } from "../../../../../models/notification";
import namingRepository from "../../../../../repositories/naming";
import namingEvalRepository from "../../../../../repositories/namingEval";
import namingTargetRepository from "../../../../../repositories/namingTarget";
import notificationRepository from "../../../../../repositories/notification";
import { getAuthedUserId } from "../../../authHelper";

// TODO(Niccari): make evalCounts updates in background. Should use transaction
export const updateEvalCounts = async (
  namingEval: NamingEvalWillSubmit | NamingEvalWillEdit,
  isCancelled: boolean,
) => {
  const { targetId, namingId, kind } = namingEval;
  const point = (() => {
    switch (kind) {
      case NamingEvalKind.PRECISE:
        return 1;
      case NamingEvalKind.FUN:
        return 1;
      case NamingEvalKind.QUESTION:
        return 0;
      case NamingEvalKind.MISSMATCH:
        return -1;
    }
  })();
  const sign = isCancelled ? -1 : 1;

  const target = await namingTargetRepository.get(targetId);
  target.evalCounts[kind] += sign;
  await namingTargetRepository.update({
    ...target,
    id: targetId,
    evalCounts: target.evalCounts,
    totalEvalCounts: target.totalEvalCounts + sign * point,
  });

  const naming = await namingRepository.get(namingId);
  naming.evalCounts[kind] += sign;
  await namingRepository.update({
    ...naming,
    id: namingId,
    evalCounts: naming.evalCounts,
    totalEvalCounts: naming.totalEvalCounts + sign * point,
  });
};

const createNotification = async (ownerId: string, namingId: string) => {
  const naming = await namingRepository.get(namingId);
  if (ownerId !== naming.authorId) {
    const notification = await notificationRepository.create({
      targetId: naming.targetId,
      namingId,
      reactionKind: NotificationKind.RECEIVED_EVAL,
      fromAuthorId: ownerId,
      toAuthorId: naming.authorId,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send(undefined);
  }
  let params: NamingEvalWillSubmit;
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
    const namingEval = await namingEvalRepository.create(params);
    await updateEvalCounts(params, false);
    await createNotification(ownerId, params.namingId);

    res.status(200).json(namingEval);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
