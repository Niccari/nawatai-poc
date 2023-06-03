import { Center } from "@chakra-ui/react";
import { PrimaryText } from "../text";

type Props = {};

const LoadError = ({}: Props): JSX.Element => {
  return (
    <Center flexDirection="column" h="200px">
      <PrimaryText textStyle="h3">データを読み込めませんでした</PrimaryText>
      <PrimaryText mt={2}>
        再読み込みして改善しない場合、運営までご連絡ください
      </PrimaryText>
    </Center>
  );
};

export default LoadError;
