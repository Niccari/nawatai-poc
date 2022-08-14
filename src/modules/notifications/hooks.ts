import { useState } from "react";

export const useUserNotification = () => {
  const [hasNotification, setNotification] = useState(false);

  return { hasNotification };
};
