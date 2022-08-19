import useSWR from "swr";
import {
  NamingTargetForView,
  NamingTargetListGenre,
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

export const useNamingTarget = (
  targetId: string
) => {
  const { data, error } = useSWR<NamingTargetForView, Error>(
    `/api/targets/${targetId}`,
    fetcher
  );

  return { target: data, targetError: error };
};
