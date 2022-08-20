import { VStack, Text, Flex, Avatar } from "@chakra-ui/react";
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
  return (
    <Flex
      direction={{ base: "column" }}
      background={target?.imageUrl ?? "#333"}
      h="300px"
      alignItems="center"
      onClick={() => router.push(`/targets/${targetId}`)}
    >
      <VStack flexGrow={1} justifyContent="center">
        <Text textColor="white" textStyle="h3">
          {name}
        </Text>
        <Text textColor="white">{reason}</Text>
        <Text textColor="white">
          👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
        </Text>
      </VStack>
      <VStack w="100%" p={2}>
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
      </VStack>
    </Flex>
  );
};

export default NamingSquare;
