import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/dist/types";
import { Naming } from "../../models/naming";
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

const updateCache = async (mutate: ScopedMutator, namingEval: NamingEval) => {
  const { targetId, authorId, isCancelled } = namingEval;
  const updateNamings = async (namings: Naming[] | undefined) => {
    if (!namings) {
      return namings;
    }
    return namings.map((n) =>
      n.id === namingEval.namingId
        ? {
            ...n,
            evalCounts: {
              ...n.evalCounts,
              [namingEval.kind]: isCancelled
                ? n.evalCounts[namingEval.kind] - 1
                : n.evalCounts[namingEval.kind] + 1,
            },
          }
        : n
    );
  };
  return Promise.all([
    mutate(`/api/targets/${targetId}/evals?authorId=${authorId}`),
    mutate(
      `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.HOT}&page=1`,
      updateNamings,
      { revalidate: false }
    ),
    mutate(
      `/api/targets/${targetId}/namings?genre=${NamingTargetListGenre.LATEST}&page=1`,
      updateNamings,
      { revalidate: false }
    ),
  ]);
};

export const useUpsertNamingEval = () => {
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);

  const onCreate = async (namingEval: NamingEvalWillSubmit) => {
    setIsUpdating(true);
    const { namingId } = namingEval;
    const response = await authedPost(
      `/api/namings/${namingId}/evals/new`,
      namingEval
    );
    if (!response.ok) {
      setIsUpdating(false);
      return;
    }
    const newNamingEval = (await response.json()) as NamingEval;
    await updateCache(mutate, newNamingEval);
    setIsUpdating(false);
  };

  const onEdit = async (namingEval: NamingEvalWillEdit) => {
    setIsUpdating(true);
    const { namingId, id } = namingEval;
    const response = await authedPost(
      `/api/namings/${namingId}/evals/${id}/edit`,
      {
        ...namingEval,
      }
    );
    if (!response.ok) {
      setIsUpdating(false);
      return;
    }
    const newNamingEval = (await response.json()) as NamingEval;
    await updateCache(mutate, newNamingEval);
    setIsUpdating(false);
  };

  return { isUpdating, onCreate, onEdit };
};
