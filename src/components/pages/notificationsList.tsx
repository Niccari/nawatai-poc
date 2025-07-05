import { useLoginState } from "../../modules/login/hooks";
import { Avatar } from "@/components/ui/avatar";
import { Box, Flex } from "@/components/ui/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
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
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-10 h-10 relative rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex items-center justify-center"
        aria-label="Notification"
      >
        <Bell size={20} />
        {hasNotification && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {(notifications &&
          notifications.length > 0 &&
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              onClick={() => handleShowContent(n)}
              className={
                userActivity &&
                n.createdAt > userActivity.lastReadNotificationAt
                  ? "bg-orange-100"
                  : ""
              }
            >
              <div className="w-full">
                <Flex>
                  <NextImageAvatar
                    src={n.authorIconUrl}
                    width="40px"
                    height="40px"
                  />
                  <Box className="ml-2">
                    <PrimaryText>{n.message}</PrimaryText>
                    <SecondaryText className="text-sm">
                      {n.createdAt.toLocaleString()}
                    </SecondaryText>
                  </Box>
                </Flex>
              </div>
            </DropdownMenuItem>
          ))) || <DropdownMenuItem>通知はありません</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsList;
