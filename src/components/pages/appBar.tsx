import { useLoginState } from "../../modules/login/hooks";
import ServiceLogo from "../../assets/serviceLogo.svg";
import ServiceLogoDarken from "../../assets/serviceLogoDarken.svg";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  Separator,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePersonalUser } from "../../modules/personalUser/hooks";
import { NextImageAvatar } from "../element/nextImageAvatar";
import NotificationsList from "./notificationsList";
import { useColorMode } from "../ui/color-mode";
import { MoonIcon, SunIcon } from "../element/compat/icons";

type Props = {};

const AppBar = ({}: Props): React.ReactElement => {
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
      <Flex justifyContent="space-between" flexWrap="wrap" p={2} gap={4}>
        <Box>
          <Link href="/">
            {(colorMode == "light" && <ServiceLogo />) || <ServiceLogoDarken />}
          </Link>
        </Box>

        <HStack alignItems="center">
          {(colorMode == "light" && (
            <IconButton aria-label="darken" onClick={toggleColorMode}>
              <MoonIcon />
            </IconButton>
          )) || (
            <IconButton aria-label="lighten" onClick={toggleColorMode}>
              <SunIcon />
            </IconButton>
          )}
          {isLogined && (
            <>
              <NotificationsList />
              <Menu.Root>
                <Menu.Trigger />
                <Menu.Positioner />
                <Menu.Content>
                  <Button w="40px" h="40px" type="button" aria-label="UserIcon">
                    <NextImageAvatar
                      src={user?.imageUrl ?? ""}
                      width="40px"
                      height="40px"
                    />
                  </Button>
                  <Menu.ItemGroup>
                    <Menu.Item onClick={handleEditUser} value="edit-user">
                      プロフィールを編集する
                    </Menu.Item>
                    <Menu.Item onClick={handleEditAccount} value="edit-account">
                      アカウントを管理する
                    </Menu.Item>
                    <Menu.Item onClick={logout} value="logout">
                      ログアウト
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Root>
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
      </Flex>
      <Separator orientation="horizontal" />
    </>
  );
};

export default AppBar;
