import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import UserDetail from "../../../components/users/userDetail";
import {
  useDetailedPersonalUser,
  usePersonalUser,
} from "../../../modules/personalUser/hooks";

const checkQueryId = (
  id: string | string[] | undefined
): string | undefined => {
  if (typeof id === "string" || id === undefined) {
    return id;
  }
  return undefined;
};

const PersonalUserPage: NextPage = ({}) => {
  const router = useRouter();
  const { userId: rawUserId } = router.query;
  const userId = checkQueryId(rawUserId);
  const { user, userError } = useDetailedPersonalUser(userId);

  if (typeof userId !== "string" || !user) {
    return <></>;
  }
  return (
    <Box>
      <UserDetail user={user} />
    </Box>
  );
};

export default PersonalUserPage;
