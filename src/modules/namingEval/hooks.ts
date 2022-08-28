import useSWR, { useSWRConfig } from "swr";
import {
  NamingEval,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../models/namingEval";

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
    await fetch(`/api/namings/${namingId}/evals/new`, {
      method: "POST",
      body: JSON.stringify(namingEval),
    });
    mutate(`/api/namings/${namingId}`, { revalidate: true });
  };
  return { onCreate };
};

export const useEditNamingEval = () => {
  const { mutate } = useSWRConfig();
  const onEdit = async (namingEval: NamingEvalWillEdit) => {
    const { namingId, id } = namingEval;
    await fetch(`/api/namings/${namingId}/evals/${id}/edit`, {
      method: "POST",
      body: JSON.stringify(namingEval),
    });
    mutate(`/api/namings/${namingId}`, { revalidate: true });
  };
  return { onEdit };
};
