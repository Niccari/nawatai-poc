import useSWR from "swr";
import { Naming, NamingWillSubmit } from "../../models/naming";
import { NamingTargetListGenre } from "../../models/namingTarget";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useNamings = (
  targetId: string | undefined,
  genre: NamingTargetListGenre,
  page: number = 1
) => {
  const { data, error } = useSWR<Naming[], Error>(
    targetId
      ? `/api/naming?targetId=${targetId}&genre=${genre}&page=${page}`
      : null,
    fetcher
  );

  return { namings: data, namingsError: error };
};

export const useCreateNaming = () => {
  const onPost = async (naming: NamingWillSubmit) => {
    await fetch("/api/naming/new", {
      method: "POST",
      body: JSON.stringify(naming),
    });
  };
  return { onPost };
};
