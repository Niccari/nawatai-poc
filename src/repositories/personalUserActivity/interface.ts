import {
  PersonalUserActivity,
  PersonalUserActivityWillEdit,
} from "../../models/personalUserActivity";

export interface IPersonalUserActivityRepository {
  get(id: string): Promise<PersonalUserActivity>;
  create(id: string): Promise<void>;
  update(entity: PersonalUserActivityWillEdit): Promise<void>;
}
