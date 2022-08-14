import { Box, Divider, Flex } from "@chakra-ui/react";
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
      <Flex grow={1}>
        <Box>
          <Box p="2">{children}</Box>
          <Divider mt={2} orientation="horizontal" />
          <Box mt={2} p="2">
            <Sitemap />
          </Box>
        </Box>
      </Flex>
      <ServiceProviderFooter />
    </Flex>
  );
};

export default MainFrame;
