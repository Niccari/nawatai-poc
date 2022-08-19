import { EvalCounts } from "./namingEval";

export type NamingWithoutId = {
  authorId: string;
  name: string;
  reason?: string;
  createdAt: Date;
  evalCounts: EvalCounts;
};

export interface Naming extends NamingWithoutId {
  id: string;
}
