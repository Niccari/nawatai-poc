import type { NextPage } from "next";
import { PrimaryText } from "../components/element/text";
import { Box } from "@/components/ui/layout";
import { Heading } from "@/components/ui/typography";

const NotFoundPage: NextPage = () => {
  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <Box>
        <Heading as="h2" size="lg">
          ページが見つかりませんでした。。。
        </Heading>
        <PrimaryText>アクセス先が正しいか、お確かめください。</PrimaryText>
      </Box>
    </div>
  );
};

export default NotFoundPage;
