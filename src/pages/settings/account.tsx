import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import LoadingContent from "../../components/loading";
import DeletionModal from "../../components/target/deletionModal";
import { PrimaryText } from "../../element/text";
import { useLoginState } from "../../modules/login/hooks";
import { useAnonymisePersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const EditAccountPage: NextPage<Props> = ({}) => {
  const route = useRouter();
  const { personalUser: owner, logout } = useLoginState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onDelete } = useAnonymisePersonalUser();

  useDashboardRedirectIfNotLogined();

  const handleDelete = async () => {
    if (!owner) {
      return;
    }
    await onDelete(owner.id);
    await logout();
    route.push("/");
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
