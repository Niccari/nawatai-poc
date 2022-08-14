import { Box, Flex } from "@chakra-ui/react";
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
        <Box>
          <Box>{children}</Box>
          <Box mt={4}>
            <Sitemap />
          </Box>
        </Box>
      </Flex>
      <ServiceProviderFooter />
    </Flex>
  );
};

export default MainFrame;
