import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextImageAvatar } from "../element/nextImageAvatar";
import { PrimaryText } from "../element/text";
import { PersonalUserBasicView } from "../../models/personalUser";

type Props = {
  user?: PersonalUserBasicView;
  noLink?: boolean;
};

const BasicUser = ({ user, noLink }: Props) => {
  const router = useRouter();
  const handleEditProfile = () => {
    if (noLink === true || !user?.id) {
      return;
    }
    router.push(`/users/${user.id}`);
  };
  return (
    <Flex alignItems="center" onClick={handleEditProfile}>
      <NextImageAvatar
        width="40px"
        height="40px"
        src={user?.imageUrl}
      ></NextImageAvatar>
      {!noLink && <PrimaryText ml={2}>{user?.name}</PrimaryText>}
      {noLink && (
        <Text color="white" ml={2}>
          {user?.name}
        </Text>
      )}
    </Flex>
  );
};

export default BasicUser;
