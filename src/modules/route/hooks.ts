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

export const useDashboardRedirectIfUserNotRegistered = () => {
  const router = useRouter();
  const { isLoading, isNotRegistered } = useLoginState();

  useEffect(() => {
    if (!isLoading && !isNotRegistered) {
      router.push("/");
    }
  }, [isLoading, isNotRegistered, router]);
};

export const useDashboardRedirectIfNotLogined = () => {
    const router = useRouter();
    const { isLoading, isLogined } = useLoginState();
  
    useEffect(() => {
      if (!isLoading && !isLogined) {
        router.push("/");
      }
    }, [isLoading, isLogined, router]);
  };
