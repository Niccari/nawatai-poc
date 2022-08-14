import { Box, Link, Stack, Text } from "@chakra-ui/react";

type Props = {};

const Sitemap = ({}: Props): JSX.Element => {
  return (
    <Box w="100vw">
      <Text textStyle="h2">サイトマップ</Text>
      <Stack spacing={2} mt={2}>
        <Link href="/info/story">
          <Text>nawataiについて</Text>
        </Link>
        <Link href="/info/tos">
          <Text>利用規約</Text>
        </Link>
        <Link href="/info/privacy">
          <Text>プライバシーポリシー</Text>
        </Link>
      </Stack>
    </Box>
  );
};

export default Sitemap;
