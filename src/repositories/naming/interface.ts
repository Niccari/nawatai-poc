import { Naming, NamingWillEdit, NamingWillSubmit } from "../../models/naming";
import { NamingTargetListGenre } from "../../models/namingTarget";

export interface INamingRepository {
  get(id: string): Promise<Naming>;
  list(
    count: number,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<Naming[]>;
  listByTarget(
    count: number,
    targetId: string,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<Naming[]>;
  create(entity: NamingWillSubmit): Promise<Naming>;
  update(entity: NamingWillEdit): Promise<Naming>;
  delete(id: string): Promise<void>;
}
