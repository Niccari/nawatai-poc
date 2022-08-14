import { Box, Link, Text } from "@chakra-ui/react";

type Props = {};

const Sitemap = ({}: Props): JSX.Element => {
  return (
    <Box>
      <Text variant="h1" />
      <Link href="/info/story">
        <Text>nawataiについて</Text>
      </Link>
      <Link href="/info/tos">
        <Text>利用規約</Text>
      </Link>
      <Link href="/info/privacy">
        <Text>プライバシーポリシー</Text>
      </Link>
    </Box>
  );
};

export default Sitemap;
