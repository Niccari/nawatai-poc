import { useLoginState } from "../modules/login/hooks";
import ServiceLogo from "../assets/serviceLogo.svg";
import {
  Avatar,
  AvatarBadge,
  Button,
  Divider,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useUserNotification } from "../modules/notifications/hooks";

type Props = {};

const AppBar = ({}: Props): JSX.Element => {
  const { isLogin } = useLoginState();
  const { hasNotification } = useUserNotification();

  return (
    <>
      <HStack p="2" justifyContent="space-between">
        <Link href="/">
          <a>
            <ServiceLogo />
          </a>
        </Link>

        <HStack alignItems="center" spacing="2">
          {isLogin && (
            <>
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
              <IconButton
                type="button"
                variant="unstyled"
                aria-label="UserIcon"
                onClick={() => {}}
              >
                <Avatar name="username" src="" w="100%" h="100%" />
              </IconButton>
              <Button colorScheme="orange" size="sm">
                名付けを求める
              </Button>
            </>
          )}
          {!isLogin && (
            <Button colorScheme="orange" size="sm">
              ログイン
            </Button>
          )}
        </HStack>
      </HStack>
      <Divider orientation="horizontal" />
    </>
  );
};

export default AppBar;
