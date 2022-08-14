import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { authClient } from "../../services/firebaseOnClient";

export const useLoginState = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(authClient, provider);
  };

  const logout = async () => {
    signOut(authClient);
  };

  useEffect(() => {
    onAuthStateChanged(authClient, (newUser) => {
      setUser(newUser);
    });
  }, []);

  return { user, login, logout };
};
