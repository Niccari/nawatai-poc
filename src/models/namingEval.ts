export const NamingEvalKind = {
  PRECISE: "precise",
  FUN: "fun",
  QUESTION: "question",
  MISSMATCH: "missmatch",
} as const;
export type NamingEvalKind = typeof NamingEvalKind[keyof typeof NamingEvalKind];

export type NamingEvalWithoutId = {
  namingId: string;
  authorId: string;
  kind: NamingEvalKind;
};

export interface NamingEval extends NamingEvalWithoutId {
  id: string;
}

export type EvalCounts = { [key in NamingEvalKind]: number };

export const evalCountsInit: EvalCounts = {
  fun: 0,
  precise: 0,
  question: 0,
  missmatch: 0,
};
