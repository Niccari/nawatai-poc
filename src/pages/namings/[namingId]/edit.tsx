import { Box, Button, Field, Input, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadItemError from "../../../components/element/loadException/loadItemError";
import LoadingContent from "../../../components/pages/loading";
import { PrimaryText } from "../../../components/element/text";
import { useLoginState } from "../../../modules/login/hooks";
import { useCRUDNaming, useNaming } from "../../../modules/naming/hooks";
import { useDashboardRedirectIfNotLogined } from "../../../modules/route/hooks";

type Props = {};

const EditNamingPage: NextPage<Props> = ({}) => {
  const { firebaseUser, isLogined } = useLoginState();
  useDashboardRedirectIfNotLogined();
  const router = useRouter();
  const { namingId } = router.query;

  const { naming, namingError } = useNaming(namingId as string | undefined);

  const [reason, setReason] = useState<string | undefined>(undefined);

  const { runUpdate } = useCRUDNaming();

  useEffect(() => {
    if (reason === undefined && naming?.reason) {
      setReason(naming?.reason);
    }
  }, [reason, setReason, naming]);

  if (typeof namingId !== "string" || namingError) {
    return <LoadItemError />;
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
          <Stack gap={2}>
            <Field.Root>
              <Field.Label>つける名前</Field.Label>
              <Input type="text" value={naming.name} disabled />
            </Field.Root>
            <Field.Root>
              <Field.Label>名付けについて補足してください</Field.Label>
              <Input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field.Root>
          </Stack>
          <Button
            mt={4}
            onClick={() => {
              runUpdate({
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
