import type { NextPage } from "next";
import { PrimaryText } from "../element/text";
import { Box, Center } from "@chakra-ui/react";

const NotFoundPage: NextPage = () => {
  return (
    <Center w="100%" h="200px">
      <Box>
        <PrimaryText textStyle="h2">
          ページが見つかりませんでした。。。
        </PrimaryText>
        <PrimaryText>アクセス先が正しいか、お確かめください。</PrimaryText>
      </Box>
    </Center>
  );
};

export default NotFoundPage;
