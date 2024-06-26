import { authClient } from "../../services/firebaseOnClient";

const getBearer = async (): Promise<string | undefined> => {
  return authClient.currentUser?.getIdToken();
};

export const authedGet = async (endpoint: string) => {
  const bearer = await getBearer();
  return fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
};

export const authedPost = async (
  endpoint: string,
  body: Record<string, unknown> | undefined = undefined,
) => {
  const bearer = await getBearer();
  return fetch(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
};

export const authedFormPost = async (endpoint: string, body: FormData) => {
  const bearer = await getBearer();
  return fetch(endpoint, {
    method: "POST",
    body,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
};
