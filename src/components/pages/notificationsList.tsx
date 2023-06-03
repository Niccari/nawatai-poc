import { useLoginState } from "../../modules/login/hooks";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
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

type Props = {};

const NotificationsList = ({}: Props) => {
  const router = useRouter();
  const { personalUser } = useLoginState();
  const { notifications } = useUserNotification(personalUser?.id);
  const { userActivity, userActivityError } = usePersonalUserActivity(
    personalUser?.id
  );
  const { onEdit } = useUpdateNotificationRead();
  const hasNotification = Boolean(
    notifications?.find(
      (n) => userActivity && n.createdAt > userActivity.lastReadNotificationAt
    )
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
    <Menu>
      <MenuButton type="button" w="40px" h="40px" aria-label="Notification">
        <Avatar h="40px" w="40px" icon={<BellIcon />}>
          {hasNotification && (
            <AvatarBadge boxSize="1.25em" bg="red.500"></AvatarBadge>
          )}
        </Avatar>
      </MenuButton>
      <MenuList>
        {(notifications &&
          notifications.length > 0 &&
          notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => handleShowContent(n)}
              bg={
                userActivity &&
                n.createdAt > userActivity.lastReadNotificationAt
                  ? "orange.100"
                  : "transparent"
              }
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
            </MenuItem>
          ))) || <MenuItem>通知はありません</MenuItem>}
      </MenuList>
    </Menu>
  );
};

export default NotificationsList;
