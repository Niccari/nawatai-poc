import { useState } from "react";
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

const updateCache = async (
  mutate: ScopedMutator,
  namingEval: NamingEvalWillSubmit
) => {
  const { targetId, authorId } = namingEval;
  return Promise.all([
    mutate(`/api/targets/${targetId}/evals?authorId=${authorId}`),
    mutate(
      `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.HOT}&page=1`
    ),
    mutate(
      `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.LATEST}&page=1`
    ),
  ]);
};

export const useUpsertNamingEval = () => {
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);

  const onCreate = async (namingEval: NamingEvalWillSubmit) => {
    setIsUpdating(true);
    const { namingId } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/new`, namingEval);

    await updateCache(mutate, namingEval);
    setIsUpdating(false);
  };

  const onEdit = async (namingEval: NamingEvalWillEdit) => {
    setIsUpdating(true);
    const { namingId, id } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/${id}/edit`, {
      ...namingEval,
    });

    await updateCache(mutate, namingEval);
    setIsUpdating(false);
  };

  return { isUpdating, onCreate, onEdit };
};
