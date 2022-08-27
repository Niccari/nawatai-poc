import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import TabbedNamingDetailList from "../../../components/target/namings/tabbedNamingDetailList";
import TargetDetail from "../../../components/target/targetDetail";
import { NamingTargetListGenre } from "../../../models/namingTarget";
import { useLoginState } from "../../../modules/login/hooks";
import { useTargetNamings } from "../../../modules/naming/hooks";
import { useNamingTarget } from "../../../modules/namingTarget/hooks";

type Props = {};

const TargetPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { isLogined } = useLoginState();
  const { targetId: targetId0 } = router.query;
  const { genre: genre0, page: page0 } = router.query;
  const genre = (() =>
    genre0 === NamingTargetListGenre.HOT ||
    genre0 === NamingTargetListGenre.LATEST
      ? genre0
      : NamingTargetListGenre.LATEST)();
  const targetId = (() =>
    typeof targetId0 === "string" ? targetId0 : undefined)();
  const page = (() => (typeof page0 === "string" ? parseInt(page0, 10) : 1))();
  const { target, targetError } = useNamingTarget(targetId);
  const handleNaming = () => {
    if (!target) {
      return;
    }
    router.push(`/targets/${target.id}/naming/new`);
  };
  return (
    <>
      {target && (
        <>
          <TargetDetail target={target} />
          {isLogined && (
            <Button
              mt={2}
              colorScheme="orange"
              size="sm"
              onClick={handleNaming}
            >
              名付けする！
            </Button>
          )}
          <Box mt={4}>
            <TabbedNamingDetailList
              targetId={targetId}
              genre={genre}
              page={page}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default TargetPage;
