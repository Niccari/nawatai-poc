import { PersonalUser } from "../../models/personalUser";

export interface IPersonalUserRepository {
  get(id: string): Promise<PersonalUser | undefined>;
  create(entity: PersonalUser): Promise<void>;
  update(entity: PersonalUser): Promise<void>;
  anonymize(authorId: string): Promise<void>;
}
