import { useLoginState } from "../modules/login/hooks";
import ServiceLogo from "../assets/serviceLogo.svg";
import ServiceLogoDarken from "../assets/ServiceLogoDarken.svg";
import {
  Button,
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePersonalUser } from "../modules/personalUser/hooks";
import { NextImageAvatar } from "../element/nextImageAvatar";
import NotificationsList from "./notificationsList";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type Props = {};

const AppBar = ({}: Props): JSX.Element => {
  const router = useRouter();
  const { firebaseUser, isLoading, isAuthed, isLogined, login, logout } =
    useLoginState();
  const { user } = usePersonalUser(firebaseUser?.uid);
  const { colorMode, toggleColorMode } = useColorMode();

  const createNewTarget = () => {
    router.push("/targets/new");
  };

  const handleEditUser = () => {
    if (!user?.id) {
      return;
    }
    router.push(`/users/${user.id}`);
  };

  const handleEditAccount = () => {
    router.push(`/settings/account`);
  };

  return (
    <>
      <HStack p="2" justifyContent="space-between">
        <Link href="/">
          <a>
            {(colorMode == "light" && <ServiceLogo />) || <ServiceLogoDarken />}
          </a>
        </Link>

        <HStack alignItems="center" spacing="2">
          {(colorMode == "light" && (
            <IconButton
              aria-label="darken"
              icon={<MoonIcon />}
              onClick={toggleColorMode}
            />
          )) || (
            <IconButton
              aria-label="lighten"
              icon={<SunIcon />}
              onClick={toggleColorMode}
            />
          )}
          {isLogined && (
            <>
              <NotificationsList />
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
                  <MenuItem onClick={handleEditAccount}>
                    アカウントを管理する
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
