import { Image, Flex, Avatar, Box, Divider, Stack } from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../models/namingTarget";
import { usePersonalUser } from "../../modules/personalUser/hooks";
import TargetOwnerMenu from "./targetOwnerMenu";

type Props = {
  target: NamingTargetForView;
};

const TargetDetail = ({ target }: Props): JSX.Element => {
  const { authorId, title, comment, imageUrl, evalCounts } = target;
  const { precise, fun, question, missmatch } = evalCounts;

  const { user } = usePersonalUser(authorId);

  const isOwner = user?.id === authorId;
  const handleDelete = () => {};
  return (
    <Box>
      <Flex pb={2}>
        <Image
          background="#666"
          src={imageUrl}
          alt={comment}
          w="200px"
          h="200px"
          flexShrink={0}
        />
        <Stack minW="200px" flexGrow={1} ml={4} justifyContent="space-between">
          <Stack>
            <Flex>
              <PrimaryText
                textStyle="h2"
                flex={1}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {title}
              </PrimaryText>
              {isOwner && (
                <TargetOwnerMenu
                  handleDelete={isOwner ? handleDelete : undefined}
                />
              )}
            </Flex>
            <PrimaryText>{comment}</PrimaryText>
          </Stack>
          <Stack>
            <PrimaryText>
              👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
            </PrimaryText>
            <Flex alignItems="center">
              <Avatar src={user?.imageUrl}></Avatar>
              <PrimaryText ml={2}>{user?.name}</PrimaryText>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default TargetDetail;
