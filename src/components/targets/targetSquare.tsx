import { Box, Center, VStack, Text, Flex, Avatar } from "@chakra-ui/react";
import { NamingTargetForView } from "../../models/namingTarget";
import { usePersonalUser } from "../../modules/personalUser/hooks";

type Props = {
  target: NamingTargetForView;
};

const TargetSquare = ({ target }: Props): JSX.Element => {
  const { authorId, title, comment, imageUrl } = target;

  const { user } = usePersonalUser(authorId);
  return (
    <Flex
      direction={{ base: "column" }}
      background={imageUrl ?? "#333"}
      h="300px"
      alignItems="center"
    >
      <VStack flexGrow={1} justifyContent="center">
        <Text textColor="white" textStyle="h3">
          {title}
        </Text>
        <Text textColor="white">{comment}</Text>
        <Text textColor="white">👍 10 😂 4 ❓１ 😵2</Text>
      </VStack>
      <VStack w="100%" p={2}>
        <Flex alignItems="center" w="100%">
          <Avatar src={user?.imageUrl}></Avatar>
          <Text ml={2} textColor="white">
            {user?.name}
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default TargetSquare;
