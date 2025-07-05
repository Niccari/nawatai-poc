import { useLoginState } from "../../modules/login/hooks";
import ServiceLogo from "../../assets/serviceLogo.svg";
import ServiceLogoDarken from "../../assets/serviceLogoDarken.svg";
import { Box, Flex, HStack } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePersonalUser } from "../../modules/personalUser/hooks";
import { NextImageAvatar } from "../element/nextImageAvatar";
import { ActionButton } from "../element/actionButton";
import NotificationsList from "./notificationsList";
import { Moon, Sun } from "lucide-react";

type Props = {};

const AppBar = ({}: Props): JSX.Element => {
  const router = useRouter();
  const { firebaseUser, isLoading, isAuthed, isLogined, login, logout } =
    useLoginState();
  const { user } = usePersonalUser(firebaseUser?.uid);
  const { theme, toggleTheme } = useTheme();

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
      <Flex justify="between" wrap="wrap" className="p-2 gap-4">
        <Box>
          <Link href="/">
            {theme === "dark" ? <ServiceLogoDarken /> : <ServiceLogo />}
          </Link>
        </Box>

        <HStack className="items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          {isLogined && (
            <>
              <NotificationsList />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0"
                    aria-label="User menu"
                  >
                    <NextImageAvatar
                      src={user?.imageUrl ?? ""}
                      width="40px"
                      height="40px"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEditUser}>
                    プロフィールを編集する
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEditAccount}>
                    アカウントを管理する
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    ログアウト
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ActionButton onClick={createNewTarget}>
                名付けを求める
              </ActionButton>
            </>
          )}
          {!isLoading && !isAuthed && (
            <ActionButton onClick={login}>ログイン</ActionButton>
          )}
        </HStack>
      </Flex>
      <Separator orientation="horizontal" />
    </>
  );
};

export default AppBar;
