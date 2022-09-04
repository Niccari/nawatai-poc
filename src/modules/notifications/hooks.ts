import useSWR from "swr";
import { NotificationForView } from "../../models/notification";
import { authedGet } from "../api";

const fetcher = async (url: string) => await (await authedGet(url)).json();

export const useUserNotification = (userId: string | undefined) => {
  const { data, error } = useSWR<NotificationForView[], Error>(
    userId ? `/api/users/notifications` : undefined,
    fetcher
  );

  return { notifications: data, notificationsError: error };
};
