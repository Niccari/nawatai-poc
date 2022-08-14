import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { PersonalUser } from "../../models/personalUser";
import { authClient } from "../../services/firebaseOnClient";

const fetcher = async (url: string): Promise<PersonalUser | undefined> => {
  if (url.endsWith("/")) {
    return undefined;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  } catch (e) {
    return undefined;
  }
};

export const useLoginState = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const { data, error } = useSWR<PersonalUser | undefined, Error>(
    `/api/users/${firebaseUser?.uid ?? ""}`,
    fetcher
  );
  console.log(data);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(authClient, provider);
  };

  const logout = async () => {
    signOut(authClient);
  };

  useEffect(() => {
    onAuthStateChanged(authClient, (newUser) => {
      setFirebaseUser(newUser);
    });
  }, []);

  return { firebaseUser, personalUser: data, login, logout };
};
