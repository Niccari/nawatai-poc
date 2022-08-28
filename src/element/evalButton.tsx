import { Button } from "@chakra-ui/react";
import { NamingEvalKind } from "../models/namingEval";
import { PrimaryText } from "./text";

type Props = {
  kind: NamingEvalKind;
  count: number;
  onEval: (kind: NamingEvalKind) => void;
};

const EvalButton = (props: Props): JSX.Element => {
  const { kind, count, onEval } = props;
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
      onClick={() => {
        onEval(kind);
      }}
    >
      <PrimaryText>{`${icon} ${count}`}</PrimaryText>
    </Button>
  );
};

export default EvalButton;
