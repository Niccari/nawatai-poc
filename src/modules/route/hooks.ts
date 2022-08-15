import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoginState } from "../login/hooks";

export const useRouterToNewUser = () => {
  const router = useRouter();
  const { isLoading, isNotRegistered } = useLoginState();

  useEffect(() => {
    if (!isLoading && isNotRegistered) {
      router.push("/users/new");
    }
  }, [isLoading, isNotRegistered, router]);
};

export const useRouterToDashboard = () => {
  const router = useRouter();
  const { isLoading, isAuthed, isLogined } = useLoginState();

  useEffect(() => {
    if (!isLoading && (!isAuthed || isLogined)) {
      router.push("/");
    }
  }, [isLoading, isAuthed, isLogined, router]);
};
