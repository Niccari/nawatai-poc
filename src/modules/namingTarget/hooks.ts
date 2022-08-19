import useSWR, { useSWRConfig } from "swr";
import {
  NamingTargetForView,
  NamingTargetListGenre,
  NamingTargetWillSubmit,
} from "../../models/namingTarget";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useNamingTargets = (
  genre: NamingTargetListGenre,
  page: number = 1
) => {
  const { data, error } = useSWR<NamingTargetForView[], Error>(
    `/api/targets?genre=${genre}&page=${page}`,
    fetcher
  );

  return { targets: data, targetsError: error };
};

export const useNamingTarget = (targetId: string | undefined) => {
  const { data, error } = useSWR<NamingTargetForView, Error>(
    targetId ? `/api/targets/${targetId}` : null,
    fetcher
  );

  return { target: data, targetError: error };
};

export const useCreateNamingTarget = () => {
  const { mutate } = useSWRConfig();
  const onPost = async (target: NamingTargetWillSubmit) => {
    const response = await fetch("/api/targets/new", {
      method: "POST",
      body: JSON.stringify(target),
    });
    const newTarget: NamingTargetForView = await response.json();
    const cacheKey = `/api/targets?genre=${NamingTargetListGenre.LATEST}&page=1`;

    mutate(
      cacheKey,
      async () => {
        const response = await fetch(cacheKey);
        const result: NamingTargetForView[] = await response.json();
        const final = [
          newTarget,
          ...result.filter((result) => result.id !== newTarget.id),
        ];
        return final;
      },
      { revalidate: false }
    );
  };
  return { onPost };
};
