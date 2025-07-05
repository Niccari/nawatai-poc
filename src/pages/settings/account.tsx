import { Box } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import LoadingContent from "../../components/pages/loading";
import DeletionModal from "../../components/pages/target/deletionModal";
import { PrimaryText } from "../../components/element/text";
import { useLoginState } from "../../modules/login/hooks";
import { useAnonymisePersonalUser } from "../../modules/personalUser/hooks";
import { useDashboardRedirectIfNotLogined } from "../../modules/route/hooks";

type Props = {};

const EditAccountPage: NextPage<Props> = ({}) => {
  const route = useRouter();
  const { personalUser: owner, logout } = useLoginState();
  const [isOpen, setIsOpen] = useState(false);
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
        onClose={() => setIsOpen(false)}
        requestDelete={() => {
          handleDelete();
        }}
      />
      <Heading as="h2" size="lg" className="mt-4">
        アカウント設定
      </Heading>
      <Box className="mt-4">
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          アカウントを削除する
        </Button>
      </Box>
    </>
  );
};

export default EditAccountPage;
