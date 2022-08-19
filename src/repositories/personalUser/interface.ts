import {
  PersonalUser,
  PersonalUserWillSubmit,
} from "../../models/personalUser";

export interface IPersonalUserRepository {
  get(id: string): Promise<PersonalUser>;
  create(entity: PersonalUserWillSubmit): Promise<void>;
  update(entity: PersonalUser): Promise<void>;
  anonymize(id: string): Promise<void>;
}
