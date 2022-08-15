import {
  NamingTarget,
  NamingTargetListGenre,
  NamingTargetWithoutId,
} from "../../models/namingTarget";

export interface INamingTargetRepository {
  get(id: string): Promise<NamingTarget>;
  list(
    count: number,
    genre: NamingTargetListGenre,
    cursorId?: string
  ): Promise<NamingTarget[]>;
  create(entity: NamingTargetWithoutId): Promise<NamingTarget>;
  update(entity: NamingTarget): Promise<void>;
  delete(id: string): Promise<void>;
}
