import { Flex, Spinner } from "@chakra-ui/react";

const LoadingContent = () => (
  <Flex h="200px" justifyContent="center" alignItems="center">
    <Spinner />
  </Flex>
);

export default LoadingContent;
