import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { PrimaryText } from "../element/text";

type Props = {};

const Sitemap = ({}: Props) => {
  return (
    <Box w="100vw">
      <PrimaryText textStyle="h2">サイトマップ</PrimaryText>
      <Stack spacing={2} mt={2}>
        <Link href="/info/story">
          <PrimaryText>nawataiについて</PrimaryText>
        </Link>
        <Link href="https://gist.github.com/Niccari/7cd481038e76e0c7530e8ec9e99cbb85">
          <PrimaryText>利用規約</PrimaryText>
        </Link>
        <Link href="https://gist.github.com/Niccari/8daadcd07b7f0051351241fe638d8acc">
          <PrimaryText>プライバシーポリシー</PrimaryText>
        </Link>
      </Stack>
    </Box>
  );
};

export default Sitemap;
