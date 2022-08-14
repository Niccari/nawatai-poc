import { useLoginState } from "../modules/login/hooks";
import ServiceLogo from "../assets/serviceLogo.svg";
import {
  Avatar,
  AvatarBadge,
  Button,
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useUserNotification } from "../modules/notifications/hooks";

type Props = {};

const AppBar = ({}: Props): JSX.Element => {
  const { firebaseUser, personalUser, login, logout } = useLoginState();
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
          {firebaseUser && personalUser && (
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
              <Menu>
                <MenuButton
                  w="40px"
                  h="40px"
                  type="button"
                  aria-label="UserIcon"
                >
                  <Avatar
                    border="1px solid #EEE"
                    background="#FFF"
                    src={firebaseUser?.photoURL ?? ""}
                    w="100%"
                    h="100%"
                  />
                </MenuButton>
                <MenuList onClick={logout}>
                  <MenuItem>ログアウト</MenuItem>
                </MenuList>
              </Menu>
              <Button colorScheme="orange" size="sm">
                名付けを求める
              </Button>
            </>
          )}
          {firebaseUser === null && !personalUser && (
            <Button colorScheme="orange" size="sm" onClick={login}>
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
