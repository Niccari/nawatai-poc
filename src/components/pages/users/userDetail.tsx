import { LinkIcon } from "@chakra-ui/icons";
import { Flex, Box, Divider, Stack, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextImageAvatar } from "../../element/nextImageAvatar";
import { PrimaryText } from "../../element/text";
import { PersonalUserDetailView } from "../../../models/personalUser";
import { useLoginState } from "../../../modules/login/hooks";

type Props = {
  user: PersonalUserDetailView;
};

const UserDetail = ({ user }: Props): JSX.Element => {
  const router = useRouter();
  const { personalUser: owner } = useLoginState();

  const { imageUrl, profile, name, url, twitterUserId } = user;
  const isOwner = user?.id === owner?.id;

  const handleEditProfile = () => {
    router.push(`/settings/profile`);
  };
  return (
    <Box>
      <Flex pb={2}>
        <Box width="80px" height="80px">
          <NextImageAvatar src={imageUrl ?? ""} width="80px" height="80px" />
        </Box>
        <Stack minW="200px" flexGrow={1} ml={4} justifyContent="space-between">
          <Stack>
            <Flex alignItems="center">
              <Box flex={1}>
                <PrimaryText
                  textStyle="h2"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {name}
                </PrimaryText>
              </Box>
              {isOwner && <Button onClick={handleEditProfile}>編集する</Button>}
            </Flex>
            <PrimaryText>{profile}</PrimaryText>
          </Stack>
          <Stack>
            {url && (
              <Flex>
                <LinkIcon />
                <Link href={url}>
                  <PrimaryText>{url}</PrimaryText>
                </Link>
              </Flex>
            )}
            {twitterUserId && (
              <Flex>
                <LinkIcon />
                <Link href={`https://twitter.com/${twitterUserId}`}>
                  <PrimaryText>{twitterUserId}</PrimaryText>
                </Link>
              </Flex>
            )}
          </Stack>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default UserDetail;
