import { useLoginState } from "../../modules/login/hooks";
import { Box, Flex, Menu } from "@chakra-ui/react";
import { useUserNotification } from "../../modules/notifications/hooks";
import { useRouter } from "next/router";
import {
  NotificationForView,
  NotificationKind,
} from "../../models/notification";
import { PrimaryText, SecondaryText } from "../element/text";
import { NextImageAvatar } from "../element/nextImageAvatar";
import {
  usePersonalUserActivity,
  useUpdateNotificationRead,
} from "../../modules/personalUserActivity/hooks";
import { BellIcon } from "../element/compat/icons";
import { Avatar } from "../element/compat/avatar";

type Props = {};

const NotificationsList = ({}: Props) => {
  const router = useRouter();
  const { personalUser } = useLoginState();
  const { notifications } = useUserNotification(personalUser?.id);
  const { userActivity, userActivityError } = usePersonalUserActivity(
    personalUser?.id,
  );
  const { onEdit } = useUpdateNotificationRead();
  const hasNotification = Boolean(
    notifications?.find(
      (n) => userActivity && n.createdAt > userActivity.lastReadNotificationAt,
    ),
  );

  const handleShowContent = (notification: NotificationForView) => {
    const { reactionKind, namingId, targetId } = notification;
    const ownerId = personalUser?.id;
    if (!ownerId) {
      return;
    }
    switch (reactionKind) {
      case NotificationKind.RECEIVED_NAME:
        onEdit(ownerId);
        router.push(`/targets/${targetId}`);
        break;
      case NotificationKind.RECEIVED_EVAL:
        onEdit(ownerId);
        router.push(`/targets/${targetId}?naming=${namingId}`);
        break;
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger />
      <Menu.Positioner />
      <Menu.Content>
        <Menu.ItemGroup>
          {(notifications &&
            notifications.length > 0 &&
            notifications.map((n) => (
              <Menu.Item
                key={n.id}
                onClick={() => handleShowContent(n)}
                bg={
                  userActivity &&
                  n.createdAt > userActivity.lastReadNotificationAt
                    ? "orange.100"
                    : "transparent"
                }
                value={`notification-${n}`}
              >
                <div>
                  <Flex>
                    <NextImageAvatar
                      src={n.authorIconUrl}
                      width="40px"
                      height="40px"
                    />
                    <Box ml={2}>
                      <PrimaryText>{n.message}</PrimaryText>
                      <SecondaryText fontSize="sm">
                        {n.createdAt.toLocaleString()}
                      </SecondaryText>
                    </Box>
                  </Flex>
                </div>
              </Menu.Item>
            ))) || (
            <Menu.Item value="no-notification">通知はありません</Menu.Item>
          )}
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Root>
  );
};

export default NotificationsList;
