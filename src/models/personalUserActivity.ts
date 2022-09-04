export type PersonalUserActivity = {
  id: string;
  signUpAt: Date;
  lastReadNotificationAt: Date;
};

export type PersonalUserActivityWillEdit = {
  id: string;
  lastReadNotificationAt: Date;
};
