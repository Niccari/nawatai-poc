import useSWR, { useSWRConfig } from "swr";
import {
  PersonalUser,
  PersonalUserBasicView,
  PersonalUserDetailView,
} from "../../models/personalUser";
import { authedPost } from "../api";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const usePersonalUser = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserBasicView, Error>(
    userId ? `/api/users/${userId}` : undefined,
    fetcher,
  );
  return { user: data, userError: error };
};

export const useDetailedPersonalUser = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserDetailView, Error>(
    userId ? `/api/users/${userId}?detailed=true` : undefined,
    fetcher,
  );
  return { user: data, userError: error };
};

export const useUpsertPersonalUser = () => {
  const { mutate } = useSWRConfig();
  const onCreate = async (personalUser: PersonalUser) => {
    const { id } = personalUser;
    mutate(`/api/users/${id}`, async () => {
      await authedPost("/api/users/new", { ...personalUser });
    });
  };

  const onEdit = async (personalUser: PersonalUser) => {
    const { id } = personalUser;
    await authedPost(`/api/users/${id}/edit`, { ...personalUser });
    mutate(`/api/users/${id}`);
  };
  return { onCreate, onEdit };
};

export const useAnonymisePersonalUser = () => {
  const onDelete = async (userId: string) => {
    await authedPost(`/api/users/${userId}/delete`);
  };
  return { onDelete };
};
