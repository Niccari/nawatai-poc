import useSWR, { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/dist/types";
import {
  NamingEval,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../models/namingEval";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { authedPost } from "../api";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useNamingEvalsByUserOfTarget = (params: {
  authorId: string | undefined;
  targetId: string;
}) => {
  const { authorId, targetId } = params;
  const { data, error } = useSWR<NamingEval[], Error>(
    authorId ? `/api/targets/${targetId}/evals?authorId=${authorId}` : null,
    fetcher
  );

  return { namingEvals: data, namingEvalsError: error };
};

const updateCache = (
  mutate: ScopedMutator,
  namingEval: NamingEvalWillSubmit
) => {
  const { targetId, authorId } = namingEval;
  mutate(`/api/targets/${targetId}`);
  mutate(`/api/targets/${targetId}/evals?authorId=${authorId}`);
  mutate(
    `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.HOT}&page=1`
  );
  mutate(
    `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.LATEST}&page=1`
  );
};

export const useUpsertNamingEval = () => {
  const { mutate } = useSWRConfig();
  const onCreate = async (namingEval: NamingEvalWillSubmit) => {
    const { namingId } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/new`, namingEval);

    updateCache(mutate, namingEval);
  };

  const onEdit = async (namingEval: NamingEvalWillEdit) => {
    const { namingId, id } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/${id}/edit`, {
      ...namingEval,
    });

    updateCache(mutate, namingEval);
  };

  return { onCreate, onEdit };
};
