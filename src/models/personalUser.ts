export type PersonalUserWithoutId = {
  name: string;
  iconImageId: string;
  profile?: string;
  url?: string;
  twitterUserId?: string;
  evalCounts: number;
  signUpAt: Date;
};

export interface PersonalUser extends PersonalUserWithoutId {
  id: string;
}
