import { Box, Flex } from "@chakra-ui/react";
import AppBar from "./appBar";
import ServiceProviderFooter from "./serviceProviderFooter";

type Props = {
  children: React.ReactNode;
};

const MainFrame = ({ children }: Props): JSX.Element => {
  return (
    <Flex direction={{ base: "column" }} minH="100vh">
      <AppBar />
      <Flex p="2" grow={1}>
        {children}
      </Flex>
      <ServiceProviderFooter />
    </Flex>
  );
};

export default MainFrame;
