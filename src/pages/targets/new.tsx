import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Box, VStack } from "../../components/ui/layout";
import { Heading } from "../../components/ui/typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingContent from "../../components/pages/loading";
import { PrimaryText } from "../../components/element/text";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useCreateNamingTarget } from "../../modules/namingTarget/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const formSchema = z.object({
  title: z.string().min(1, "名付け対象についての説明は必須です"),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateNewTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const { fileState, handleImageSet } = useImageLoader();
  const { onPost } = useCreateNamingTarget();
  const { uploadImage } = useImageUploader();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      comment: "",
    },
  });

  if (!firebaseUser || !isLogined) {
    return <LoadingContent />;
  }
  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!fileState.file) {
      return;
    }
    const { imageId } = await uploadImage(fileState.file);
    onPost({
      authorId: firebaseUser.uid,
      title: data.title,
      comment: data.comment || "",
      imageId,
    });
    router.push("/");
  };

  return (
    <>
      <Heading as="h1" size="xl" className="mt-4">
        名付けを求める
      </Heading>
      <Box className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <VStack spacing="4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>どんな名前を付けて欲しいですか？</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      名付け対象についての説明を入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      名付けにあたり、気をつけて欲しい点は何ですか？
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>
                  もし名付け対象の画像があれば、アップロードしてください
                </FormLabel>
                <div className="relative">
                  <Box
                    className="w-[300px] h-[300px] bg-gray-800 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: fileState.imageDataUrl
                        ? `url(${fileState.imageDataUrl})`
                        : undefined,
                    }}
                  >
                    <Input
                      type="file"
                      className="h-full w-full opacity-0"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={(e) => onSetImage(e)}
                    />
                  </Box>
                </div>
                {fileState.imageSetError && (
                  <FormMessage>
                    画像を読み込めませんでした。他のソフトで閲覧できるかご確認ください。
                  </FormMessage>
                )}
              </FormItem>
            </VStack>
            <Button type="submit" className="mt-4" disabled={!fileState.file}>
              これでOK!
            </Button>
          </form>
        </Form>
      </Box>
    </>
  );
};

export default CreateNewTargetPage;
