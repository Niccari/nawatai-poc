import type { NextApiRequest, NextApiResponse } from "next";
import {
  NotificationForView,
  NotificationKind,
} from "../../../models/notification";
import imageRepository from "../../../repositories/image/firebase";
import namingTargetRepository from "../../../repositories/namingTarget";
import notificationRepository from "../../../repositories/notification";
import personalUserRepository from "../../../repositories/personalUser";
import { getAuthedUserId } from "../authHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ownerId = await getAuthedUserId(req, res);
  if (!ownerId) {
    return;
  }
  try {
    const notifications = await notificationRepository.list(ownerId);
    const notificationMessages: NotificationForView[] = await Promise.all(
      notifications.map(async (n) => {
        const {
          createdAt,
          targetId,
          namingId,
          fromAuthorId,
          id,
          reactionKind,
        } = n;
        const fromUser = await personalUserRepository.get(fromAuthorId);
        const message = await (async () => {
          const target = await namingTargetRepository.get(targetId);
          switch (reactionKind) {
            case NotificationKind.RECEIVED_EVAL:
              return `${fromUser.name}さんが${target.title}に評価をつけました`;
            case NotificationKind.RECEIVED_NAME:
              return `${fromUser.name}さんが${target.title}に名付けしました`;
          }
        })();
        const authorIconUrl = fromUser.iconImageId
          ? await imageRepository.resolveUrl(fromUser.iconImageId)
          : undefined;
        return {
          id,
          targetId,
          namingId,
          createdAt,
          fromAuthorId,
          reactionKind,
          message,
          authorIconUrl,
        };
      })
    );
    res.status(200).json(notificationMessages);
  } catch (e) {
    res.status(500).send(undefined);
  }
};

export default handler;
