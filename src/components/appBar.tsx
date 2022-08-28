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
import { useRouter } from "next/router";
import { usePersonalUser } from "../modules/personalUser/hooks";
import { NextImageAvatar } from "../element/nextImageAvatar";

type Props = {};

const AppBar = ({}: Props): JSX.Element => {
  const router = useRouter();
  const { firebaseUser, isLoading, isAuthed, isLogined, login, logout } =
    useLoginState();
  const { user } = usePersonalUser(firebaseUser?.uid);
  const { hasNotification } = useUserNotification();
  const createNewTarget = () => {
    router.push("/targets/new");
  };

  const handleEditUser = () => {
    if (!user?.id) {
      return;
    }
    router.push(`/users/${user.id}`);
  };

  return (
    <>
      <HStack p="2" justifyContent="space-between">
        <Link href="/">
          <a>
            <ServiceLogo />
          </a>
        </Link>

        <HStack alignItems="center" spacing="2">
          {isLogined && (
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
                  <NextImageAvatar
                    src={user?.imageUrl ?? ""}
                    width="40px"
                    height="40px"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleEditUser}>
                    プロフィールを編集する
                  </MenuItem>
                  <MenuItem onClick={logout}>ログアウト</MenuItem>
                </MenuList>
              </Menu>
              <Button colorScheme="orange" size="sm" onClick={createNewTarget}>
                名付けを求める
              </Button>
            </>
          )}
          {!isLoading && !isAuthed && (
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
