import {
  Box,
  Center,
  VStack,
  Text,
  Flex,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NamingTargetForView } from "../../models/namingTarget";
import { usePersonalUser } from "../../modules/personalUser/hooks";

type Props = {
  target: NamingTargetForView;
};

const TargetSquare = ({ target }: Props): JSX.Element => {
  const { id, authorId, title, comment, imageUrl, evalCounts } = target;
  const { precise, fun, question, missmatch } = evalCounts;
  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  return (
    <Flex
      direction={{ base: "column" }}
      backgroundColor="#333"
      backgroundImage={imageUrl}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h="300px"
      alignItems="center"
      onClick={() => router.push(`/targets/${id}`)}
    >
      <Stack
        w="100%"
        h="100%"
        backdropFilter="auto"
        backdropBlur="1px"
        justifyContent="space-between"
      >
        <VStack w="100%" justifyContent="center" flexGrow={1}>
          <Box
            w="100%"
            textAlign="center"
            pl={2}
            pr={2}
            backgroundColor="#00000099"
          >
            <Text textColor="white" textStyle="h3">
              {title}
            </Text>
            <Text textColor="white">{comment}</Text>
            <Text textColor="white" mt={2}>
              👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
            </Text>
          </Box>
        </VStack>
        <Box w="100%" p={2} backgroundColor="#00000099">
          <Flex alignItems="center" w="100%">
            <Avatar
              src={user?.imageUrl}
              onClick={() =>
                user ? router.push(`/users/${user?.id}`) : undefined
              }
            ></Avatar>
            <Text ml={2} textColor="white">
              {user?.name}
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
};

export default TargetSquare;
