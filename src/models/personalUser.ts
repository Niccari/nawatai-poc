import { EvalCounts } from "./namingEval";

export type PersonalUserWillSubmit = {
  id: string;
  name: string;
  userId: string;
  iconImageId?: string;
  profile?: string;
  url?: string;
  twitterUserId?: string;
};

export interface PersonalUser extends PersonalUserWillSubmit {
  evalCounts: EvalCounts;
  signUpAt: Date;
}

export type PersonalUserBasicView = {
  id: string;
  name: string;
  userId: string;
  imageUrl?: string;
};
