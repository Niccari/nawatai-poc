import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LoadingContent from "../../components/pages/loading";
import { PrimaryText } from "../../components/element/text";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useCreateNamingTarget } from "../../modules/namingTarget/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const CreateNewTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const { fileState, handleImageSet } = useImageLoader();

  const { onPost } = useCreateNamingTarget();
  const { uploadImage } = useImageUploader();

  const isTitleError = Boolean(!title);

  if (!firebaseUser || !isLogined) {
    return <LoadingContent />;
  }
  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

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
              <InputGroup>
                <Box
                  w="300px"
                  h="300px"
                  background="#333"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundImage={
                    fileState.imageDataUrl ? fileState.imageDataUrl : undefined
                  }
                >
                  <Input
                    type="file"
                    height="100%"
                    width="100%"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onChange={(e) => onSetImage(e)}
                  />
                </Box>
              </InputGroup>
              {fileState.imageSetError && (
                <FormErrorMessage>
                  画像を読み込めませんでした。他のソフトで閲覧できるかご確認ください。
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <Button
            mt={4}
            disabled={isTitleError}
            onClick={async () => {
              if (!fileState.file) {
                return;
              }
              const { imageId } = await uploadImage(fileState.file);
              onPost({
                authorId: firebaseUser.uid,
                title,
                comment,
                imageId,
              });
              router.push("/");
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
