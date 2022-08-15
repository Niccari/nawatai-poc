import useSWR from "swr";
import { PersonalUser, PersonalUserForView } from "../../models/personalUser";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const usePersonalUser = (userId: string) => {
  const { data, error } = useSWR<PersonalUser, Error>(
    `/api/users/${userId}`,
    fetcher
  );
  // TODO(Niccari): iconImageId -> imageUrl
  const user: PersonalUserForView | undefined = (() => {
    if (!data) {
      return undefined;
    }
    return {
      id: data.id,
      imageUrl: data.iconImageId,
      name: data.name,
    };
  })();
  return { user, userError: error };
};
