import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box, Button, FormErrorMessage, Input, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { PrimaryText } from "../../element/text";
import { NamingTargetWillSubmit } from "../../models/namingTarget";
import { useLoginState } from "../../modules/login/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const CreateNewTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [imageId, setImageId] = useState("");

  const { mutate } = useSWRConfig();

  const isTitleError = Boolean(!title);

  return (
    <>
      <PrimaryText textStyle="h1" mt={4}>
        名付けを求める
      </PrimaryText>
      <Box mt={4}>
        <div>
          <Stack spacing={2}>
            <FormControl isInvalid={isTitleError}>
              <FormLabel>どんな名前を付けて欲しいですか？</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {!isTitleError ? (
                <FormHelperText>
                  名付け対象についての説明を入力してください
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  名付け対象についての説明は必須です
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>
                名付けにあたり、気をつけて欲しい点は何ですか？
              </FormLabel>
              <Input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                もし名付け対象の画像があれば、アップロードしてください
              </FormLabel>
            </FormControl>
          </Stack>
          <Button
            mt={4}
            disabled={isTitleError || !firebaseUser}
            onClick={() => {
              const target: NamingTargetWillSubmit = {
                authorId: firebaseUser?.uid ?? "",
                title,
                comment,
                imageId: (!imageId) ? undefined : imageId,
              };
              mutate(`/api/targets/`, async () => {
                await fetch("/api/targets/new", {
                  method: "POST",
                  body: JSON.stringify(target),
                });
                router.push("/");
              });
            }}
          >
            これでOK!
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CreateNewTargetPage;
