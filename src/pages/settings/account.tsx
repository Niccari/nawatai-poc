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
  useDisclosure,
} from "@chakra-ui/react";
import { isThisWeek } from "date-fns";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import LoadingContent from "../../components/loading";
import DeletionModal from "../../components/target/deletionModal";
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

const EditAccountPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { personalUser: owner } = useLoginState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useDashboardRedirectIfNotLogined();

  const handleDelete = async () => {
    if (!owner) {
      return;
    }
    alert("アカウントを削除します");
  };

  if (!owner) {
    return <LoadingContent />;
  }
  return (
    <>
      <DeletionModal
        isOpen={isOpen}
        onClose={onClose}
        requestDelete={() => {
          handleDelete();
        }}
      />
      <PrimaryText textStyle="h2" mt={4}>
        アカウント設定
      </PrimaryText>
      <Box mt={4}>
        <Button colorScheme="red" onClick={onOpen}>
          アカウントを削除する
        </Button>
      </Box>
    </>
  );
};

export default EditAccountPage;
