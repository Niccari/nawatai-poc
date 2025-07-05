import { Box, VStack } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading } from "@/components/ui/typography";
import { ActionButton } from "../../../../components/element/actionButton";
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
import { useState } from "react";
import LoadingContent from "../../../../components/pages/loading";
import { PrimaryText } from "../../../../components/element/text";
import { useLoginState } from "../../../../modules/login/hooks";
import { useCRUDNaming } from "../../../../modules/naming/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../../modules/route/hooks";

const formSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  reason: z.string().optional(),
});

type Props = {};

const CreateNewNamingPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const { runCreate } = useCRUDNaming();
  const { targetId } = router.query;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      reason: "",
    },
  });

  if (typeof targetId !== "string") {
    return <>エラー: 不正なURLです</>;
  }

  if (!firebaseUser || !isLogined) {
    return <LoadingContent />;
  }
  return (
    <>
      <Heading as="h1" size="xl" className="mt-4">
        名付けする
      </Heading>
      <Box className="mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              runCreate({
                authorId: firebaseUser.uid,
                targetId,
                name: values.name,
                reason: values.reason,
              });
              router.push(`/targets/${targetId}`);
            })}
          >
            <VStack spacing="2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>つける名前</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      ※ 付けた名前は編集で変更できません
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名付けについて補足してください</FormLabel>
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

export default CreateNewNamingPage;
