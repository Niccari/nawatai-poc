import { Box, VStack } from "@/components/ui/layout";
import Link from "next/link";
import { PrimaryText } from "../element/text";
import { Heading } from "@/components/ui/typography";

type Props = {};

const Sitemap = ({}: Props) => {
  return (
    <Box className="w-screen">
      <Heading as="h2" size="lg">
        サイトマップ
      </Heading>
      <VStack spacing="2" className="mt-2">
        <Link href="/info/story">
          <PrimaryText>nawataiについて</PrimaryText>
        </Link>
        <Link href="https://gist.github.com/Niccari/7cd481038e76e0c7530e8ec9e99cbb85">
          <PrimaryText>利用規約</PrimaryText>
        </Link>
        <Link href="https://gist.github.com/Niccari/8daadcd07b7f0051351241fe638d8acc">
          <PrimaryText>プライバシーポリシー</PrimaryText>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sitemap;
