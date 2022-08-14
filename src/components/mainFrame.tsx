import { Box, Flex, VStack } from "@chakra-ui/react";
import AppBar from "./appBar";
import ServiceProviderFooter from "./serviceProviderFooter";
import Sitemap from "./sitemap";

type Props = {
  children: React.ReactNode;
};

const MainFrame = ({ children }: Props): JSX.Element => {
  return (
    <Flex direction={{ base: "column" }} w="100%" minH="100vh">
      <AppBar />
      <Flex p="2" grow={1}>
        <VStack>
          <Box>{children}</Box>
          <Sitemap />
        </VStack>
      </Flex>
      <ServiceProviderFooter />
    </Flex>
  );
};

export default MainFrame;
