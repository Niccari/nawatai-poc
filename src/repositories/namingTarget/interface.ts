import {
  NamingTarget,
  NamingTargetListGenre,
  NamingTargetWillEdit,
  NamingTargetWillSubmit,
} from "../../models/namingTarget";

export interface INamingTargetRepository {
  get(id: string): Promise<NamingTarget>;
  list(
    count: number,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<NamingTarget[]>;
  create(entity: NamingTargetWillSubmit): Promise<NamingTarget>;
  update(entity: NamingTargetWillEdit): Promise<NamingTarget>;
  delete(id: string): Promise<void>;
}
