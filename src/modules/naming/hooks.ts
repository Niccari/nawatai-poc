import { NamingWillSubmit } from "../../models/naming";

export const useCreateNaming = () => {
  const onPost = async (naming: NamingWillSubmit) => {
    await fetch("/api/naming/new", {
      method: "POST",
      body: JSON.stringify(naming),
    });
  };
  return { onPost };
};
