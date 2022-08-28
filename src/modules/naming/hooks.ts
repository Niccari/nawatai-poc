import useSWR, { mutate, useSWRConfig } from "swr";
import { Naming, NamingWillEdit, NamingWillSubmit } from "../../models/naming";
import { NamingTargetListGenre } from "../../models/namingTarget";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useNaming = (namingId?: string) => {
  const { data, error } = useSWR<Naming, Error>(
    namingId ? `/api/namings/${namingId}` : undefined,
    fetcher
  );

  return { naming: data, namingError: error };
};

export const useNamings = (genre: NamingTargetListGenre, page: number = 1) => {
  const { data, error } = useSWR<Naming[], Error>(
    `/api/namings/?genre=${genre}&page=${page}`,
    fetcher
  );

  return { namings: data, namingsError: error };
};

export const useTargetNamings = (
  targetId: string | undefined,
  genre: NamingTargetListGenre,
  page: number = 1
) => {
  const { data, error } = useSWR<Naming[], Error>(
    targetId
      ? `/api/targets/${targetId}/namings/?genre=${genre}&page=${page}`
      : null,
    fetcher
  );

  return { namings: data, namingsError: error };
};

export const useCRUDNaming = () => {
  const runCreate = async (naming: NamingWillSubmit) => {
    const { targetId } = naming;
    const response = await fetch("/api/namings/new", {
      method: "POST",
      body: JSON.stringify(naming),
    });
    const newNaming: Naming = await response.json();
    const cacheKey = `/api/targets/${targetId}/namings/?genre=${NamingTargetListGenre.LATEST}&page=1`;
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

  const runUpdate = async (naming: NamingWillEdit) => {
    const response = await fetch(`/api/namings/${naming.id}/edit`, {
      method: "POST",
      body: JSON.stringify(naming),
    });

    mutate(
      `/api/namings/${naming.id}`,
      async () => {
        const result: Naming = await response.json();
        return result;
      },
      { revalidate: false }
    );
  };

  const runDelete = async (targetId: string, id: string) => {
    await fetch(`/api/namings/${id}/delete`, {
      method: "POST",
    });
    mutate(
      `/api/targets/${targetId}/namings/?genre=${NamingTargetListGenre.HOT}&page=1`
    );
    mutate(
      `/api/targets/${targetId}/namings/?genre=${NamingTargetListGenre.LATEST}&page=1`
    );
  };
  return { runCreate, runUpdate, runDelete };
};
