import useSWR, { mutate } from "swr";
import { Naming, NamingWillSubmit } from "../../models/naming";
import { NamingTargetListGenre } from "../../models/namingTarget";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useTargetNamings = (
  targetId: string | undefined,
  genre: NamingTargetListGenre,
  page: number = 1
) => {
  const { data, error } = useSWR<Naming[], Error>(
    targetId ? `/api/naming/${targetId}/?genre=${genre}&page=${page}` : null,
    fetcher
  );

  return { namings: data, namingsError: error };
};

export const useCreateNaming = () => {
  const onPost = async (naming: NamingWillSubmit) => {
    const { targetId } = naming;
    const response = await fetch("/api/naming/new", {
      method: "POST",
      body: JSON.stringify(naming),
    });
    const newNaming: Naming = await response.json();
    const cacheKey = `/api/naming/${targetId}/?genre=${NamingTargetListGenre.LATEST}&page=1`;
    mutate(
      cacheKey,
      async () => {
        const response = await fetch(cacheKey);
        const result: Naming[] = await response.json();
        const final = [
          newNaming,
          ...result.filter((result) => result.id !== newNaming.id),
        ];
        return final;
      },
      { revalidate: false }
    );
  };
  return { onPost };
};
