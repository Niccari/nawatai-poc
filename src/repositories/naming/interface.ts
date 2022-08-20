import { Naming, NamingWillSubmit } from "../../models/naming";
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
  update(entity: Naming): Promise<void>;
  delete(id: string): Promise<void>;
}
