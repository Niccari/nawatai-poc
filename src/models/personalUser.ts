export interface PersonalUserProfile {
  profile?: string;
  url?: string;
  twitterUserId?: string;
}

export interface PersonalUser extends PersonalUserProfile {
  id: string;
  name: string;
  userId: string;
  iconImageId?: string;
}

export type PersonalUserBasicView = {
  id: string;
  name: string;
  userId: string;
  imageUrl?: string;
};

export interface PersonalUserDetailView
  extends PersonalUserBasicView,
    PersonalUserProfile {}
