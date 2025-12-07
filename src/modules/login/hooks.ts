import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  PersonalUser,
  PersonalUserDetailView,
} from "../../models/personalUser";
import {
  authClient,
  initializeAuthClient,
} from "../../services/firebaseOnClient";

const fetcher = async (url: string): Promise<PersonalUser> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const useLoginState = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null | undefined>(
    undefined,
  );
  const { data, isValidating } = useSWR<PersonalUserDetailView, Error>(
    firebaseUser ? `/api/users/${firebaseUser.uid}?detailed=true` : null,
    fetcher,
  );
  const login = async () => {
    const { GoogleAuthProvider, signInWithRedirect } =
      await import("firebase/auth");
    await initializeAuthClient();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(authClient, provider);
  };

  const logout = async () => {
    const { signOut } = await import("firebase/auth");
    await initializeAuthClient();
    signOut(authClient);
    setFirebaseUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      await initializeAuthClient();
      onAuthStateChanged(authClient, (newUser) => {
        setFirebaseUser(newUser);
      });
    };
    initAuth();
  }, []);

  const isAuthed = Boolean(firebaseUser);
  return {
    firebaseUser,
    personalUser: data,
    isLoading: Boolean(firebaseUser === undefined || isValidating),
    isAuthed,
    isNotRegistered: isAuthed && Boolean(!isValidating && !data),
    isLogined: isAuthed && Boolean(data),
    login,
    logout,
  };
};
