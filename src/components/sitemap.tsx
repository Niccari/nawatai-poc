import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { PrimaryText } from "../element/text";

type Props = {};

const Sitemap = ({}: Props): JSX.Element => {
  return (
    <Box w="100vw">
      <PrimaryText textStyle="h2">サイトマップ</PrimaryText>
      <Stack spacing={2} mt={2}>
        <Link href="/info/story">
          <PrimaryText>nawataiについて</PrimaryText>
        </Link>
        <Link href="/info/tos">
          <PrimaryText>利用規約</PrimaryText>
        </Link>
        <Link href="/info/privacy">
          <PrimaryText>プライバシーポリシー</PrimaryText>
        </Link>
      </Stack>
    </Box>
  );
};

export default Sitemap;
