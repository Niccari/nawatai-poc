import { VStack, Text, Flex, Avatar, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Naming } from "../../models/naming";
import { useNamingTarget } from "../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../modules/personalUser/hooks";

type Props = {
  naming: Naming;
};

const NamingSquare = ({ naming }: Props): JSX.Element => {
  const { id, authorId, targetId, name, reason, evalCounts } = naming;
  const { precise, fun, question, missmatch } = evalCounts;
  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  const { target } = useNamingTarget(targetId);
  if (!target) {
    return <Box background={"#333"} h="300px" alignItems="center" />;
  }
  return (
    <Flex
      direction={{ base: "column" }}
      h="300px"
      backgroundColor="#333"
      backgroundImage={target.imageUrl}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      alignItems="center"
      onClick={() => router.push(`/targets/${targetId}`)}
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
            {target.title && <Text textColor="white">{target.title}</Text>}
            <Text textColor="white" textStyle="h3" mt={target.title ? 4 : 0}>
              {name}
            </Text>
            <Text textColor="white">{reason}</Text>
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

export default NamingSquare;
