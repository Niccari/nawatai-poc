import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box, Button, FormErrorMessage, Input, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingContent from "../../../components/loading";
import { PrimaryText } from "../../../element/text";
import { useLoginState } from "../../../modules/login/hooks";
import { useEditNaming, useNaming } from "../../../modules/naming/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../modules/route/hooks";

type Props = {};

const EditNamingPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();
  const { namingId } = router.query;

  const { naming, namingError } = useNaming(namingId as string | undefined);

  const [reason, setReason] = useState<string | undefined>(undefined);

  const { onEdit } = useEditNaming();

  useEffect(() => {
    if (reason === undefined && naming?.reason) {
      setReason(naming?.reason);
    }
  }, [reason, setReason, naming]);

  if (typeof namingId !== "string") {
    return <>エラー: 不正なURLです</>;
  }

  if (namingError) {
    return <>エラー: 名付け情報を取得できませんでした</>;
  }
  if (!firebaseUser || !isLogined || !naming) {
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
            <FormControl>
              <FormLabel>つける名前</FormLabel>
              <Input type="text" value={naming.name} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>名付けについて補足してください</FormLabel>
              <Input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <FormHelperText>
                ※ 付けた名前は編集で変更できません
              </FormHelperText>
            </FormControl>
          </Stack>
          <Button
            mt={4}
            onClick={() => {
              onEdit({
                id: naming.id,
                reason,
              });
              router.push(`/targets/${naming.targetId}`);
            }}
          >
            これでOK!
          </Button>
        </div>
      </Box>
    </>
  );
};

export default EditNamingPage;