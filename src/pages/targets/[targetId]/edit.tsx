import { Box, VStack } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading } from "@/components/ui/typography";
import { ActionButton } from "../../../components/element/actionButton";
import {
  Form,
  FormControl,
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
import React, { useEffect, useState } from "react";
import LoadItemError from "../../../components/element/loadException/loadItemError";
import LoadingContent from "../../../components/pages/loading";
import { PrimaryText } from "../../../components/element/text";
import { useLoginState } from "../../../modules/login/hooks";
import {
  useEditNamingTarget,
  useNamingTarget,
} from "../../../modules/namingTarget/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../modules/route/hooks";

const formSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  comment: z.string().optional(),
});

type Props = {};

const CreateEditTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const { targetId } = router.query;
  const { onEdit } = useEditNamingTarget();
  const { target, targetError } = useNamingTarget(
    targetId as string | undefined,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (target) {
      form.reset({
        title: target.title,
        comment: target.comment || "",
      });
    }
  }, [target, form]);

  if (typeof targetId !== "string" || targetError) {
    return <LoadItemError />;
  }
  if (!firebaseUser || !isLogined || !target) {
    return <LoadingContent />;
  }

  return (
    <>
      <Heading as="h1" size="xl" className="mt-4">
        名付け対象を編集する
      </Heading>
      <Box className="mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onEdit({
                id: target.id,
                comment: values.comment,
              });
              router.push(`/targets/${targetId}`);
            })}
          >
            <VStack spacing="2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>どんな名前を付けて欲しいですか？</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled />
                    </FormControl>
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

export default CreateEditTargetPage;
