import useSWR, { useSWRConfig } from "swr";
import {
  PersonalUserActivity,
  PersonalUserActivityWillEdit,
} from "../../models/personalUserActivity";
import { authedGet, authedPost } from "../api";

const fetcher = async (url: string) => await (await authedGet(url)).json();

export const usePersonalUserActivity = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserActivity, Error>(
    userId ? `/api/users/${userId}/activities` : undefined,
    fetcher,
  );
  return { userActivity: data, userActivityError: error };
};

export const useUpdateNotificationRead = () => {
  const { mutate } = useSWRConfig();
  const onEdit = async (userId: string) => {
    await authedPost(`/api/users/${userId}/activities/notifications/read`, {
      id: userId,
      lastReadNotificationAt: new Date(),
    } as PersonalUserActivityWillEdit);
    mutate(`/api/users/${userId}/activities`);
  };
  return { onEdit };
};
