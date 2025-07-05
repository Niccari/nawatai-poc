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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PrimaryText } from "../../components/element/text";
import { PersonalUserDetailView } from "../../models/personalUser";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useUpsertPersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

const formSchema = z.object({
  userId: z
    .string()
    .min(1, "ユーザIDは必須です")
    .regex(
      /^[0-9a-zA-Z-_]*$/,
      "ユーザIDは英数字とハイフン、アンダースコアのみ使用可能です",
    ),
  name: z.string().min(1, "ニックネームは必須です"),
  url: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^http[s]*:\/\/.*$/.test(val),
      "正しいURLを入力してください",
    ),
  twitterUserId: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\w_]+$/.test(val),
      "TwitterユーザIDは英数字とアンダースコアのみ使用可能です",
    ),
  profile: z.string().optional(),
});

type Props = {};

const EditUserProfilePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { firebaseUser, personalUser: owner } = useLoginState();

  const { fileState, handleImageSet } = useImageLoader();
  const { uploadImage } = useImageUploader();
  const { onEdit } = useUpsertPersonalUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      name: "",
      url: "",
      twitterUserId: "",
      profile: "",
    },
  });

  useDashboardRedirectIfNotLogined();
  useEffect(() => {
    if (owner) {
      form.reset({
        userId: owner.userId || "",
        name: owner.name || "",
        url: owner.url || "",
        twitterUserId: owner.twitterUserId || "",
        profile: owner.profile || "",
      });
    }
  }, [owner, form]);

  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firebaseUser || !owner) {
      return;
    }
    const { uid } = firebaseUser;
    const iconImageId = await (async (): Promise<string | undefined> => {
      if (!fileState.file) {
        return undefined;
      }
      const { imageId } = await uploadImage(fileState.file);
      return imageId;
    })();
    await onEdit({ ...owner, ...values, iconImageId });
    router.push(`/users/${uid}`);
  };

  if (!owner) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    );
  }
  return (
    <>
      <Heading as="h1" size="xl" className="mt-4">
        プロフィール設定
      </Heading>
      <PrimaryText className="mt-4">ユーザアイコン</PrimaryText>
      <Box className="w-20 h-20 relative">
        <Avatar className="w-full h-full border border-gray-200 bg-white">
          <AvatarImage
            src={
              fileState.imageDataUrl ? fileState.imageDataUrl : owner?.imageUrl
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
            <VStack spacing="2">
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
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      (公開したい場合のみ)
                      ご自身に関するページのURLを入れてください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterUserId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TwitterユーザID</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      (公開したい場合のみ) TwitterのユーザIDを入れてください
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
  );
};

export default EditUserProfilePage;
