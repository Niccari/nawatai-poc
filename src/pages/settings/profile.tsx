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
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PrimaryText } from "../../element/text";
import { PersonalUserDetailView } from "../../models/personalUser";
import { useImageLoader, useImageUploader } from "../../modules/image/hooks";
import { useLoginState } from "../../modules/login/hooks";
import { useUpsertPersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const EditUserProfilePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { firebaseUser, personalUser: owner } = useLoginState();

  const [personalUser, setPersonalUser] = useState<
    PersonalUserDetailView | undefined
  >(undefined);

  const { fileState, handleImageSet } = useImageLoader();
  const { uploadImage } = useImageUploader();

  const { onEdit } = useUpsertPersonalUser();

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
    await onEdit({ ...personalUser, iconImageId });
    router.push(`/users/${uid}`);
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
        ????????????????????????
      </PrimaryText>
      <PrimaryText mt={4}>?????????????????????</PrimaryText>
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
              <FormLabel>?????????ID</FormLabel>
              <Input
                type="text"
                value={personalUser.userId}
                onChange={(e) => updatePersonalData("userId", e.target.value)}
              />
              {!isUserIdError ? (
                <FormHelperText>???????????????????????????????????????</FormHelperText>
              ) : (
                <FormErrorMessage>
                  ????????????????????????????????????-???_???????????????
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>??????????????????</FormLabel>
              <Input
                type="text"
                value={personalUser.name}
                onChange={(e) => updatePersonalData("name", e.target.value)}
              />
              {!isNameError ? (
                <FormHelperText>?????????????????????????????????????????????</FormHelperText>
              ) : (
                <FormErrorMessage>?????????????????????????????????</FormErrorMessage>
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
                  (???????????????????????????) ?????????????????????????????????URL????????????????????????
                </FormHelperText>
              ) : (
                <FormErrorMessage>URL?????????????????????????????????</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>Twitter?????????ID</FormLabel>
              <Input
                type="text"
                value={personalUser.twitterUserId}
                onChange={(e) =>
                  updatePersonalData("twitterUserId", e.target.value)
                }
              />
              {!isTwitterError ? (
                <FormHelperText>
                  (???????????????????????????) Twitter????????????ID????????????????????????
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Twitter????????????ID?????????????????????_?????????????????????
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>????????????????????????</FormLabel>
              <Input
                type="text"
                value={personalUser.profile}
                onChange={(e) => updatePersonalData("profile", e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button mt={4} onClick={editUser}>
            ?????????OK!
          </Button>
        </div>
      </Box>
    </>
  );
};

export default EditUserProfilePage;
