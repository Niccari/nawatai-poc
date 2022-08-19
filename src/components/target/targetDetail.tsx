import {
  Image,
  Text,
  Flex,
  Avatar,
  Box,
  Divider,
  Stack,
  MenuButton,
} from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../models/namingTarget";
import { usePersonalUser } from "../../modules/personalUser/hooks";

type Props = {
  target: NamingTargetForView;
};

const TargetDetail = ({ target }: Props): JSX.Element => {
  const { authorId, title, comment, imageUrl, evalCounts } = target;
  const { precise, fun, question, missmatch } = evalCounts;

  const { user } = usePersonalUser(authorId);
  return (
    <Box>
      <Flex pb={2}>
        <Image
          background="#666"
          src={imageUrl}
          alt={comment}
          w="200px"
          h="200px"
        />
        <Stack flexGrow={1} ml={4} justifyContent="space-between">
          <Stack>
            <Flex>
              <PrimaryText textStyle="h2">{title}</PrimaryText>
              {/* <MenuButton /> */}
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
