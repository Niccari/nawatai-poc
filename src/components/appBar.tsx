import { useLoginState } from "../modules/login/hooks";
import ServiceLogo from "../assets/serviceLogo.svg";
import ServiceLogoDarken from "../assets/serviceLogoDarken.svg";
import {
  Box,
  Button,
  Divider,
  Flex,
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
      <Flex justifyContent="space-between" flexWrap="wrap" p={2} gap={4}>
        <Box>
          <Link href="/">
            <a>
              {(colorMode == "light" && <ServiceLogo />) || (
                <ServiceLogoDarken />
              )}
            </a>
          </Link>
        </Box>

        <HStack alignItems="center">
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
                    ?????????????????????????????????
                  </MenuItem>
                  <MenuItem onClick={handleEditAccount}>
                    ??????????????????????????????
                  </MenuItem>
                  <MenuItem onClick={logout}>???????????????</MenuItem>
                </MenuList>
              </Menu>
              <Button colorScheme="orange" size="sm" onClick={createNewTarget}>
                ?????????????????????
              </Button>
            </>
          )}
          {!isLoading && !isAuthed && (
            <Button colorScheme="orange" size="sm" onClick={login}>
              ????????????
            </Button>
          )}
        </HStack>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};

export default AppBar;
