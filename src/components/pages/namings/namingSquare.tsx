import { VStack, Text, Flex, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Naming } from "../../../models/naming";
import { useNamingTarget } from "../../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import { NextImageAvatar } from "../../element/nextImageAvatar";
import BasicUser from "../basicUser";

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
    <Box
      position="relative"
      h="300px"
      backgroundColor="#333"
      alignItems="center"
      onClick={() => router.push(`/targets/${targetId}`)}
    >
      <Box>
        {target.imageUrl && (
          <Image
            src={target.imageUrl}
            alt={target.title}
            layout="fill"
            objectFit="cover"
            quality={80}
          />
        )}
      </Box>
      <Stack
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
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
          <BasicUser user={user} noLink />
        </Box>
      </Stack>
    </Box>
  );
};

export default NamingSquare;
