import { Box, Center, VStack, Text, Flex, Avatar } from "@chakra-ui/react";
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
      background={imageUrl ?? "#333"}
      h="300px"
      alignItems="center"
      onClick={() => router.push(`/targets/${id}`)}
    >
      <VStack flexGrow={1} justifyContent="center">
        <Text textColor="white" textStyle="h3">
          {title}
        </Text>
        <Text textColor="white">{comment}</Text>
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

export default TargetSquare;
