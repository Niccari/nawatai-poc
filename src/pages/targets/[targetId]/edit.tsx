import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingContent from "../../../components/loading";
import { PrimaryText } from "../../../element/text";
import { useLoginState } from "../../../modules/login/hooks";
import {
  useEditNamingTarget,
  useNamingTarget,
} from "../../../modules/namingTarget/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../modules/route/hooks";

type Props = {};

const CreateEditTargetPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();

  const { targetId } = router.query;
  const [comment, setComment] = useState<string | undefined>(undefined);

  const { onEdit } = useEditNamingTarget();
  const { target } = useNamingTarget(targetId as string);

  useEffect(() => {
    if (comment === undefined && target) {
      setComment(target.comment);
    }
  }, [comment, setComment, target]);

  if (typeof targetId !== "string") {
    return <>Error!</>;
  }
  if (!firebaseUser || !isLogined || !target) {
    return <LoadingContent />;
  }

  return (
    <>
      <PrimaryText textStyle="h1" mt={4}>
        名付け対象を編集する
      </PrimaryText>
      <Box mt={4}>
        <div>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>どんな名前を付けて欲しいですか？</FormLabel>
              <Input type="text" value={target.title} disabled />
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
          </Stack>
          <Button
            mt={4}
            onClick={async () => {
              console.log(comment);
              await onEdit({
                id: target.id,
                comment,
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

export default CreateEditTargetPage;
