import { Flex } from "../ui/layout";
import { Spinner } from "../ui/spinner";

const LoadingContent = () => (
  <Flex justify="center" align="center" className="h-[200px]">
    <Spinner />
  </Flex>
);

export default LoadingContent;
