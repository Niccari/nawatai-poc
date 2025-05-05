import { Button } from "@chakra-ui/react";
import { NamingEvalKind } from "../../models/namingEval";
import { PrimaryText } from "./text";

type Props = {
  kind: NamingEvalKind;
  count: number;
  onEval: (kind: NamingEvalKind) => void;
  disabled?: boolean;
};

const EvalButton = (props: Props): React.ReactElement => {
  const { kind, count, onEval, disabled } = props;
  const icon = (() => {
    switch (kind) {
      case NamingEvalKind.PRECISE:
        return "👍";
      case NamingEvalKind.FUN:
        return "😂";
      case NamingEvalKind.QUESTION:
        return "❓";
      case NamingEvalKind.MISSMATCH:
        return "😵";
    }
  })();
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        onEval(kind);
      }}
    >
      <PrimaryText>{`${icon} ${count}`}</PrimaryText>
    </Button>
  );
};

export default EvalButton;
