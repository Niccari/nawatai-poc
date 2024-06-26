import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  PersonalUser,
  PersonalUserDetailView,
} from "../../models/personalUser";
import { authClient } from "../../services/firebaseOnClient";

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
