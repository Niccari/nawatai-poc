import { useState } from "react";

export const useLoginState = () => {
  const [isLogin, setIsLogin] = useState(false);

  return { isLogin };
};
