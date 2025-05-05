import { VStack, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Naming } from "../../../models/naming";
import { useNamingTarget } from "../../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import BasicUser from "../basicUser";
import { WhiteText } from "../../element/text";

type Props = {
  naming: Naming;
};

const NamingSquare = ({ naming }: Props): React.ReactElement => {
  const { authorId, targetId, name, reason, evalCounts } = naming;
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
      w="100%"
      aspectRatio="4 / 3"
      backgroundColor="#333"
      alignItems="center"
      onClick={() => router.push(`/targets/${targetId}`)}
    >
      {target.imageUrl && (
        <Image
          src={target.imageUrl}
          alt={target.title ?? "naming image"}
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
            {target.title && <WhiteText>{target.title}</WhiteText>}
            <WhiteText textStyle="h3" mt={target.title ? 4 : 0}>
              {name}
            </WhiteText>
            <WhiteText>{reason}</WhiteText>
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

export default NamingSquare;
