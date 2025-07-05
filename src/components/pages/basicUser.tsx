import { Flex } from "../ui/layout";
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
    <Flex align="center" onClick={handleEditProfile}>
      <NextImageAvatar
        width="40px"
        height="40px"
        src={user?.imageUrl}
      ></NextImageAvatar>
      {!noLink && <PrimaryText className="ml-2">{user?.name}</PrimaryText>}
      {noLink && <span className="text-white ml-2">{user?.name}</span>}
    </Flex>
  );
};

export default BasicUser;
