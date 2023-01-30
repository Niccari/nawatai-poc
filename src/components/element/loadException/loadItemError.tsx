import { Center } from "@chakra-ui/react";
import { PrimaryText } from "../text";

type Props = {};

const LoadItemError = ({}: Props): JSX.Element => {
  return (
    <Center flexDirection="column" h="200px">
      <PrimaryText textStyle="h3">データが見つかりませんでした</PrimaryText>
      <PrimaryText mt={2}>URLが正しいか、お確かめ下さい。</PrimaryText>
    </Center>
  );
};

export default LoadItemError;
