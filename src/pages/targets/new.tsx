import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Box,
  Button,
  FormErrorMessage,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LoadingContent from "../../components/loading";
import { PrimaryText } from "../../element/text";
import { useLoginState } from "../../modules/login/hooks";
import { useCreateNamingTarget } from "../../modules/namingTarget/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

type FileState = {
  file?: File;
  imageDataUrl?: string;
  imageSetError?: Error;
};

const CreateNewTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [fileState, setFileState] = useState<FileState>({});

  const { onPost } = useCreateNamingTarget();

  const isTitleError = Boolean(!title);

  if (!firebaseUser || !isLogined) {
    return <LoadingContent />;
  }
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      new Promise<string>((resolve, rejects) => {
        reader.onload = () => {
          const dataUrl = reader.result as string | null;
          if (!dataUrl) {
            rejects(new Error("failed to load image"));
          } else {
            resolve(dataUrl);
          }
        };
        reader.onerror = (e) => {
          rejects(e);
        };
        reader.readAsDataURL(file);
      })
        .then((imageDataUrl) => {
          setFileState({ file, imageDataUrl });
        })
        .catch((err) => {
          setFileState({ imageSetError: err });
        });
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
                    onChange={(e) => handleSetImage(e)}
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
            onClick={() => {
              // upload image
              onPost({
                authorId: firebaseUser.uid,
                title,
                comment,
                imageId: undefined,
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
