import { Flex, Box, Divider, Stack } from "@chakra-ui/react";
import { NextImageAvatar } from "../../../element/nextImageAvatar";
import { PrimaryText } from "../../../element/text";
import { Naming } from "../../../models/naming";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import TargetOwnerMenu from "../targetOwnerMenu";

type Props = {
  naming: Naming;
};

const NamingDetail = ({ naming }: Props): JSX.Element => {
  const { name, reason, evalCounts, authorId } = naming;
  const { precise, fun, question, missmatch } = evalCounts;

  const { user } = usePersonalUser(authorId);

  const isOwner = user?.id === authorId;
  const handleDelete = () => {};
  return (
    <Box>
      <Flex pb={2}>
        <Stack minW="200px" flexGrow={1} justifyContent="space-between">
          <Flex>
            <PrimaryText
              textStyle="h2"
              flex={1}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {name}
            </PrimaryText>
            {isOwner && (
              <TargetOwnerMenu
                handleDelete={isOwner ? handleDelete : undefined}
              />
            )}
          </Flex>
          <PrimaryText>{reason}</PrimaryText>
          <PrimaryText>
            👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
          </PrimaryText>
          <Flex alignItems="center">
            <NextImageAvatar
              width="40px"
              height="40px"
              src={user?.imageUrl}
            ></NextImageAvatar>
            <PrimaryText ml={2}>{user?.name}</PrimaryText>
          </Flex>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default NamingDetail;
