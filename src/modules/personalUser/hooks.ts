import useSWR, { useSWRConfig } from "swr";
import {
  PersonalUserBasicView,
  PersonalUserDetailView,
} from "../../models/personalUser";
import { authedPost } from "../api";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const usePersonalUser = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserBasicView, Error>(
    userId ? `/api/users/${userId}` : undefined,
    fetcher
  );
  return { user: data, userError: error };
};

export const useDetailedPersonalUser = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserDetailView, Error>(
    userId ? `/api/users/${userId}?detailed=true` : undefined,
    fetcher
  );
  return { user: data, userError: error };
};

export const useAnonymisePersonalUser = () => {
  const onDelete = async (userId: string) => {
    await authedPost(`/api/users/${userId}/delete`);
  };
  return { onDelete };
};
