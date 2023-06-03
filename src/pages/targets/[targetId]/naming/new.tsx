import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box, Button, FormErrorMessage, Input, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingContent from "../../../../components/pages/loading";
import { PrimaryText } from "../../../../components/element/text";
import { useLoginState } from "../../../../modules/login/hooks";
import { useCRUDNaming } from "../../../../modules/naming/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../../modules/route/hooks";

type Props = {};

const CreateNewNamingPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const [name, setTitle] = useState("");
  const [reason, setReason] = useState("");

  const { runCreate } = useCRUDNaming();
  const { targetId } = router.query;
  const isNameError = Boolean(!name);

  if (typeof targetId !== "string") {
    return <>エラー: 不正なURLです</>;
  }

  if (!firebaseUser || !isLogined) {
    return <LoadingContent />;
  }
  return (
    <>
      <PrimaryText textStyle="h1" mt={4}>
        名付けする
      </PrimaryText>
      <Box mt={4}>
        <div>
          <Stack spacing={2}>
            <FormControl isInvalid={isNameError}>
              <FormLabel>つける名前</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
              />
              {!isNameError ? (
                <FormHelperText>
                  ※ 付けた名前は編集で変更できません
                </FormHelperText>
              ) : (
                <FormErrorMessage>名前は必須です</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>名付けについて補足してください</FormLabel>
              <Input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button
            mt={4}
            disabled={isNameError}
            onClick={() => {
              runCreate({
                authorId: firebaseUser.uid,
                targetId,
                name,
                reason,
              });
              router.push(`/targets/${targetId}`);
            }}
          >
            これでOK!
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CreateNewNamingPage;
