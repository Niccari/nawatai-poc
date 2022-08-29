import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { isThisWeek } from "date-fns";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { PrimaryText, SecondaryText } from "../../element/text";
import { PersonalUserDetailView } from "../../models/personalUser";
import { authedPost } from "../../modules/api";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import {
  useDashboardRedirectIfNotLogined,
  useDashboardRedirectIfUserNotRegistered,
} from "../../modules/route/hooks";

type Props = {};

const EditUserProfilePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { firebaseUser, personalUser: owner } = useLoginState();

  const [personalUser, setPersonalUser] = useState<
    PersonalUserDetailView | undefined
  >(undefined);

  const { fileState, handleImageSet } = useImageLoader();
  const { uploadImage } = useImageUploader();

  const { mutate } = useSWRConfig();

  const isUserIdError = personalUser?.id?.length === 0;
  const isNameError = !personalUser?.name;
  const isUrlError =
    personalUser?.url && !/^http[s]*:\/\/.*$/.exec(personalUser.url);
  const isTwitterError =
    personalUser?.twitterUserId &&
    !/^[\d\w_]+$/.exec(personalUser.twitterUserId);

  useDashboardRedirectIfNotLogined();
  useEffect(() => {
    if (owner && !personalUser) {
      setPersonalUser(owner);
    }
  }, [personalUser, owner]);

  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

  const editUser = async () => {
    if (!firebaseUser || !personalUser) {
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
    mutate(`/api/users/${uid}`, async () => {
      await authedPost(`/api/users/${uid}/edit`, {
        ...personalUser,
        iconImageId,
      });
      router.push(`/users/${uid}`);
    });
  };

  const updatePersonalData = (
    key: keyof PersonalUserDetailView,
    value: string
  ) => {
    if (!personalUser) {
      return;
    }
    setPersonalUser({
      ...personalUser,
      [key]: value,
    });
  };

  if (!personalUser) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }
  return (
    <>
      <PrimaryText textStyle="h1" mt={4}>
        プロフィール設定
      </PrimaryText>
      <PrimaryText mt={4}>ユーザアイコン</PrimaryText>
      <Box w="80px" h="80px" position="relative">
        <Avatar
          w="100%"
          h="100%"
          left="0"
          top="0"
          border="1px solid #EEE"
          backgroundColor="#FFF"
          src={
            fileState.imageDataUrl
              ? fileState.imageDataUrl
              : personalUser?.imageUrl
          }
        ></Avatar>
        <Box position="absolute" w="100%" h="100%" left="0" top="0">
          <Input
            type="file"
            opacity="0"
            w="100%"
            h="100%"
            aria-hidden="true"
            accept="image/*"
            onChange={(e) => onSetImage(e)}
          />
        </Box>
      </Box>
      <Box mt={4}>
        <div>
          <Stack spacing={2}>
            <FormControl isInvalid={isUserIdError}>
              <FormLabel>ユーザID</FormLabel>
              <Input
                type="text"
                value={personalUser.userId}
                onChange={(e) => updatePersonalData("userId", e.target.value)}
              />
              {!isUserIdError ? (
                <FormHelperText>ユーザ名を入力してください</FormHelperText>
              ) : (
                <FormErrorMessage>
                  ユーザ名には半角英数字、-、_が使えます
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                type="text"
                value={personalUser.name}
                onChange={(e) => updatePersonalData("name", e.target.value)}
              />
              {!isNameError ? (
                <FormHelperText>ニックネームを入力してください</FormHelperText>
              ) : (
                <FormErrorMessage>ニックネームは必須です</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>URL</FormLabel>
              <Input
                type="text"
                value={personalUser.url}
                onChange={(e) => updatePersonalData("url", e.target.value)}
              />
              {!isUrlError ? (
                <FormHelperText>
                  (公開したい場合のみ) ご自身に関するページのURLを入れてください
                </FormHelperText>
              ) : (
                <FormErrorMessage>URL以外が入力されています</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>TwitterユーザID</FormLabel>
              <Input
                type="text"
                value={personalUser.twitterUserId}
                onChange={(e) =>
                  updatePersonalData("twitterUserId", e.target.value)
                }
              />
              {!isTwitterError ? (
                <FormHelperText>
                  (公開したい場合のみ) TwitterのユーザIDを入れてください
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  TwitterのユーザIDは半角英数字、_のみが使えます
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>紹介プロフィール</FormLabel>
              <Input
                type="text"
                value={personalUser.profile}
                onChange={(e) => updatePersonalData("profile", e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button mt={4} onClick={editUser}>
            これでOK!
          </Button>
        </div>
      </Box>
    </>
  );
};

export default EditUserProfilePage;
