import { Box, VStack, Text, Flex, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NamingTargetForView } from "../../../models/namingTarget";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import BasicUser from "../basicUser";
import { WhiteText } from "../../element/text";

type Props = {
  target: NamingTargetForView;
};

const TargetSquare = ({ target }: Props): React.ReactElement => {
  const { id, authorId, title, comment, imageUrl, evalCounts } = target;
  const { precise, fun, question, missmatch } = evalCounts;
  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  return (
    <Box
      w="100%"
      aspectRatio="4 / 3"
      position="relative"
      backgroundColor="#333"
      alignItems="center"
      onClick={() => router.push(`/targets/${id}`)}
    >
      {target.imageUrl && (
        <Image
          src={target.imageUrl}
          alt={target.title ?? "target image"}
          fill
          sizes="300"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          quality={80}
        />
      )}
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
            <WhiteText textStyle="h3">{title}</WhiteText>
            <WhiteText>{comment}</WhiteText>
            <WhiteText mt={2}>
              👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
            </WhiteText>
          </Box>
        </VStack>
        <Box w="100%" p={2} backgroundColor="#00000099">
          <BasicUser user={user} noLink />
        </Box>
      </Stack>
    </Box>
  );
};

export default TargetSquare;
