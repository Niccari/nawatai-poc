import { EvalCounts } from "./namingEval";

export type NamingWillSubmit = {
  authorId: string;
  targetId: string;
  name: string;
  reason?: string;
};

export interface Naming extends NamingWillSubmit {
  id: string;
  createdAt: Date;
  evalCounts: EvalCounts;
  totalEvalCounts: number;
}
