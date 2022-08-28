import { EvalCounts } from "./namingEval";

export type NamingTargetWillSubmit = {
  authorId: string;
  title?: string;
  imageId?: string;
  comment: string;
};

export type NamingTargetWillEdit = {
  id: string;
  comment?: string;
  evalCounts?: EvalCounts;
  totalEvalCounts?: number;
};

export interface NamingTarget extends NamingTargetWillSubmit {
  createdAt: Date;
  evalCounts: EvalCounts;
  totalEvalCounts: number;
  id: string;
  isDeleted: boolean;
}

export type NamingTargetForView = {
  id: string;
  authorId: string;
  title?: string;
  comment: string;
  imageUrl?: string;
  evalCounts: EvalCounts;
  isDeleted: boolean;
};

export const NamingTargetListGenre = {
  HOT: "hot",
  LATEST: "latest",
} as const;
export type NamingTargetListGenre =
  typeof NamingTargetListGenre[keyof typeof NamingTargetListGenre];
