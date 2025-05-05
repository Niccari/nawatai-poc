import {
  Box,
  Button,
  Flex,
  Field,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PrimaryText, SecondaryText } from "../../components/element/text";
import { PersonalUser } from "../../models/personalUser";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useUpsertPersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfUserNotRegistered } from "../../modules/route/hooks";
import { Avatar } from "../../components/element/compat/avatar";

type Props = {};

const CreateNewUserPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLoading, isLogined } = useLoginState();
  const [id, setId] = useState(Math.random().toString(32).slice(2));
  const [name, setName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [profile, setProfile] = useState("");

  const [isInitialized, setIsInitialized] = useState(false);

  const { fileState, handleImageSet } = useImageLoader();
  const { uploadImage } = useImageUploader();
  const { onCreate } = useUpsertPersonalUser();

  const isIdError = !/^[0-9a-zA-Z-_]*$/.exec(id);
  const isNameError = name === "";

  useDashboardRedirectIfUserNotRegistered();
  useEffect(() => {
    if (!isLoading && firebaseUser && !isInitialized) {
      setIsInitialized(true);
      setName(firebaseUser.displayName ?? "");
      setUserIconUrl(firebaseUser.photoURL ?? "");
    }
  }, [firebaseUser, isLoading, isInitialized]);

  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageSet(file);
    }
  };

  const createUser = async () => {
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
          new File([blob], name, {
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
      name,
      userId: id,
      iconImageId,
      profile,
    };
    onCreate(personalUser);
  };

  return (
    <>
      {!isInitialized ||
        (isLogined && (
          <Flex justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        )) || (
          <>
            <PrimaryText textStyle="h1" mt={4}>
              あと1ステップです！
            </PrimaryText>
            <SecondaryText>プロフィールを入力しましょう</SecondaryText>
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
                  fileState.imageDataUrl ? fileState.imageDataUrl : userIconUrl
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
                <Stack gap={2}>
                  <Field.Root invalid={isIdError}>
                    <Field.Label>ユーザID</Field.Label>
                    <Input
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                    {!isIdError ? (
                      <Field.HelperText>
                        ユーザ名を入力してください
                      </Field.HelperText>
                    ) : (
                      <Field.ErrorText>
                        ユーザ名には半角英数字、-、_が使えます
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={isNameError}>
                    <Field.Label>ニックネーム</Field.Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {!isNameError ? (
                      <Field.HelperText>
                        ニックネームを入力してください
                      </Field.HelperText>
                    ) : (
                      <Field.ErrorText>ニックネームは必須です</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>紹介プロフィール</Field.Label>
                    <Input
                      type="text"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                    />
                  </Field.Root>
                </Stack>
                <Button mt={4} onClick={createUser}>
                  これでOK!
                </Button>
              </div>
            </Box>
          </>
        )}
    </>
  );
};

export default CreateNewUserPage;
