import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { PersonalUser } from "../../models/personalUser";
import { authClient } from "../../services/firebaseOnClient";

export const useLoginState = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [personalUser, setPersonalUser] = useState<PersonalUser | null>(null);

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

  return { firebaseUser, personalUser, login, logout, setPersonalUser };
};
