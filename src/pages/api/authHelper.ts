import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthClient } from "../../services/firebaseOnServer";

export const getAuthedUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!(req.headers && req.headers.authorization)) {
    res.status(400).send(undefined);
    return;
  }
  try {
    const idToken = req.headers.authorization.split(" ")[1];
    const { uid } = await firebaseAuthClient.verifyIdToken(idToken);
    return uid;
  } catch (e) {
    return res.status(401).send(undefined);
  }
};
