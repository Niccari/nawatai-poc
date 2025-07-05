import { Link as LinkIcon } from "lucide-react";
import { Flex, Box, VStack, HStack } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import Link from "next/link";
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
      <Flex className="pb-2">
        <Box className="w-20 h-20">
          <NextImageAvatar src={imageUrl ?? ""} width="80px" height="80px" />
        </Box>
        <VStack className="min-w-[200px] flex-1 ml-4 justify-between">
          <VStack>
            <Flex align="center">
              <Box className="flex-1">
                <Heading
                  as="h2"
                  size="lg"
                  className="whitespace-nowrap truncate"
                >
                  {name}
                </Heading>
              </Box>
              {isOwner && <Button onClick={handleEditProfile}>編集する</Button>}
            </Flex>
            <PrimaryText>{profile}</PrimaryText>
          </VStack>
          <VStack>
            {url && (
              <Flex>
                <LinkIcon size={16} />
                <Link href={url}>
                  <PrimaryText>{url}</PrimaryText>
                </Link>
              </Flex>
            )}
            {twitterUserId && (
              <Flex>
                <LinkIcon size={16} />
                <Link href={`https://twitter.com/${twitterUserId}`}>
                  <PrimaryText>{twitterUserId}</PrimaryText>
                </Link>
              </Flex>
            )}
          </VStack>
        </VStack>
      </Flex>
      <Separator />
    </Box>
  );
};

export default UserDetail;
