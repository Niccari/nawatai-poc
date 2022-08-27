import useSWR from "swr";
import { PersonalUserBasicView } from "../../models/personalUser";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const usePersonalUser = (userId?: string) => {
  const { data, error } = useSWR<PersonalUserBasicView, Error>(
    userId ? `/api/users/${userId}` : undefined,
    fetcher
  );
  return { user: data, userError: error };
};
