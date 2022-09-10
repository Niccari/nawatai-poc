import {
  NamingEval,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../models/namingEval";

export interface INamingEvalRepository {
  get(id: string): Promise<NamingEval>;
  listByUserOfTarget(targetId: string, authorId: string): Promise<NamingEval[]>;
  create(entity: NamingEvalWillSubmit): Promise<NamingEval>;
  update(entity: NamingEvalWillEdit): Promise<NamingEval>;
}
