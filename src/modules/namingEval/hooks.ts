import useSWR, { useSWRConfig } from "swr";
import {
  NamingEval,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../models/namingEval";
import { authedPost } from "../api";

const fetcher = async (url: string) => await (await fetch(url)).json();

export const useNamingEvalsByUserOfTarget = (params: {
  authorId: string;
  targetId: string;
}) => {
  const { authorId, targetId } = params;
  const { data, error } = useSWR<NamingEval[], Error>(
    `/api/targets/${targetId}/evals?authorId=${authorId}`,
    fetcher
  );

  return { namingEvals: data, namingEvalsError: error };
};

export const useCreateNamingEval = () => {
  const { mutate } = useSWRConfig();
  const onCreate = async (namingEval: NamingEvalWillSubmit) => {
    const { namingId } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/new`, namingEval);
    mutate(`/api/namings/${namingId}`, { revalidate: true });
  };
  return { onCreate };
};

export const useEditNamingEval = () => {
  const { mutate } = useSWRConfig();
  const onEdit = async (namingEval: NamingEvalWillEdit) => {
    const { namingId, id } = namingEval;
    await authedPost(`/api/namings/${namingId}/evals/${id}/edit`, {
      ...namingEval,
    });
    mutate(`/api/namings/${namingId}`, { revalidate: true });
  };
  return { onEdit };
};
