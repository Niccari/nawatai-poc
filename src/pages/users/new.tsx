import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box, Flex, VStack } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Heading } from "@/components/ui/typography";
import { ActionButton } from "../../components/element/actionButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PrimaryText, SecondaryText } from "../../components/element/text";
import { PersonalUser } from "../../models/personalUser";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useUpsertPersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfUserNotRegistered } from "../../modules/route/hooks";

const formSchema = z.object({
  userId: z
    .string()
    .min(1, "ユーザIDは必須です")
    .regex(
      /^[0-9a-zA-Z-_]*$/,
      "ユーザIDは英数字とハイフン、アンダースコアのみ使用可能です",
    ),
  name: z.string().min(1, "ニックネームは必須です"),
  profile: z.string().optional(),
});

type Props = {};

const CreateNewUserPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLoading, isLogined } = useLoginState();
  const [userIconUrl, setUserIconUrl] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const { fileState, handleImageSet } = useImageLoader();
  const { uploadImage } = useImageUploader();
  const { onCreate } = useUpsertPersonalUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: Math.random().toString(32).slice(2),
      name: "",
      profile: "",
    },
  });

  useDashboardRedirectIfUserNotRegistered();
  useEffect(() => {
    if (!isLoading && firebaseUser && !isInitialized) {
      setIsInitialized(true);
      form.setValue("name", firebaseUser.displayName ?? "");
      setUserIconUrl(firebaseUser.photoURL ?? "");
    }
  }, [firebaseUser, isLoading, isInitialized, form]);

  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firebaseUser) {
      return;
    }
    const { uid } = firebaseUser;

    const iconImageId = await (async (): Promise<string | undefined> => {
      if (!fileState.file) {
        if (!firebaseUser.photoURL) {
          return Promise.resolve(undefined);
        }
        const response = await fetch(firebaseUser.photoURL);
        if (!response.ok) {
          return Promise.resolve(undefined);
        }
        const blob = await response.blob();
        const { imageId } = await uploadImage(
          new File([blob], values.name, {
            type: blob.type,
          }),
        );
        return imageId;
      }
      const { imageId } = await uploadImage(fileState.file);
      return imageId;
    })();
    const personalUser: PersonalUser = {
      id: uid,
      name: values.name,
      userId: values.userId,
      iconImageId,
      profile: values.profile || "",
    };
    onCreate(personalUser);
  };

  return (
    <>
      {!isInitialized ||
        (isLogined && (
          <Flex justify="center" align="center">
            <Spinner />
          </Flex>
        )) || (
          <>
            <Heading as="h1" size="xl" className="mt-4">
              あと1ステップです！
            </Heading>
            <SecondaryText>プロフィールを入力しましょう</SecondaryText>
            <PrimaryText className="mt-4">ユーザアイコン</PrimaryText>
            <Box className="w-20 h-20 relative">
              <Avatar className="w-full h-full border border-gray-200 bg-white">
                <AvatarImage
                  src={
                    fileState.imageDataUrl
                      ? fileState.imageDataUrl
                      : userIconUrl
                  }
                />
              </Avatar>
              <Box className="absolute w-full h-full left-0 top-0">
                <Input
                  type="file"
                  className="opacity-0 w-full h-full"
                  aria-hidden="true"
                  accept="image/*"
                  onChange={(e) => onSetImage(e)}
                />
              </Box>
            </Box>
            <Box className="mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <VStack spacing="4">
                    <FormField
                      control={form.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ユーザID</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            ユーザ名を入力してください
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ニックネーム</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            ニックネームを入力してください
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>紹介プロフィール</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </VStack>
                  <ActionButton type="submit" className="mt-4">
                    これでOK!
                  </ActionButton>
                </form>
              </Form>
            </Box>
          </>
        )}
    </>
  );
};

export default CreateNewUserPage;
