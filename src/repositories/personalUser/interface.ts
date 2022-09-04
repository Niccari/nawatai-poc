import { PersonalUser } from "../../models/personalUser";

export interface IPersonalUserRepository {
  get(id: string): Promise<PersonalUser>;
  create(entity: PersonalUser): Promise<void>;
  update(entity: PersonalUser): Promise<void>;
  anonymize(id: string): Promise<void>;
}
