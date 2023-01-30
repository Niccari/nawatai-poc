import { Box, Divider, Flex } from "@chakra-ui/react";
import AppBar from "./appBar";
import ServiceProviderFooter from "./serviceProviderFooter";
import Sitemap from "./sitemap";

type Props = {
  children: React.ReactNode;
  growContent?: boolean;
};

const MainFrame = ({ children }: Props) => {
  return (
    <Box>
      <AppBar />
      <Box p="2">{children}</Box>
      <Divider mt={2} orientation="horizontal" />
      <Box mt={2} p="2">
        <Sitemap />
      </Box>
      <ServiceProviderFooter />
    </Box>
  );
};

export default MainFrame;
