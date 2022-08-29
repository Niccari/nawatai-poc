import { authClient } from "../../services/firebaseOnClient";

export const getBearer = async (): Promise<string | undefined> => {
  return authClient.currentUser?.getIdToken();
};

export const authedPost = async (
  endpoint: string,
  body: Record<string, unknown> | undefined = undefined
) => {
  const bearer = await authClient.currentUser?.getIdToken();
  return fetch(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
};

export const authedFormPost = async (endpoint: string, body: FormData) => {
  const bearer = await authClient.currentUser?.getIdToken();
  return fetch(endpoint, {
    method: "POST",
    body,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
};
