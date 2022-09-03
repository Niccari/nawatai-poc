import { useLoginState } from "../modules/login/hooks";
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
import { useUserNotification } from "../modules/notifications/hooks";
import { useRouter } from "next/router";
import { NotificationForView, NotificationKind } from "../models/notification";
import { PrimaryText, SecondaryText } from "../element/text";
import { NextImageAvatar } from "../element/nextImageAvatar";

type Props = {};

const NotificationsList = ({}: Props): JSX.Element => {
  const router = useRouter();
  const { personalUser } = useLoginState();
  const { notifications, hasNotification } = useUserNotification(
    personalUser?.id
  );

  const handleShowContent = (notification: NotificationForView) => {
    const { reactionKind, namingId, targetId } = notification;
    switch (reactionKind) {
      case NotificationKind.RECEIVED_NAME:
        router.push(`/targets/${targetId}`);
        break;
      case NotificationKind.RECEIVED_EVAL:
        router.push(`/targets/${targetId}?naming=${namingId}`);
        break;
    }
  };

  return (
    <Menu>
      <MenuButton w="40px" h="40px" type="button" aria-label="UserIcon">
        <IconButton
          type="button"
          variant="unstyled"
          aria-label="Notification"
          onClick={() => {}}
        >
          <Avatar h="100%" w="100%" icon={<BellIcon />}>
            {hasNotification && (
              <AvatarBadge boxSize="1.25em" bg="red.500"></AvatarBadge>
            )}
          </Avatar>
        </IconButton>
      </MenuButton>
      <MenuList>
        {(notifications &&
          notifications.length > 0 &&
          notifications.map((n) => (
            <MenuItem key={n.id} onClick={() => handleShowContent(n)}>
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
