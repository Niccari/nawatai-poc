import { Center } from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";

type Props = {
  objectName: string;
};

const NoContent = ({ objectName }: Props): JSX.Element => {
  return (
    <Center flexDirection="column" h="200px">
      <PrimaryText textStyle="h3">{objectName}はまだありません</PrimaryText>
      <PrimaryText mt={2}>ぜひ{objectName}を作ってみましょう！</PrimaryText>
    </Center>
  );
};

export default NoContent;
