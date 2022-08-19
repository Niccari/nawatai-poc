import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import TargetDetail from "../../components/target/targetDetail";
import { useLoginState } from "../../modules/login/hooks";
import { useNamingTarget } from "../../modules/namingTarget/hooks";

type Props = {};

const TargetPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { isLogined } = useLoginState();
  const { targetId } = router.query;
  const { target, targetError } = useNamingTarget(targetId as string);

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
        </>
      )}
    </>
  );
};

export default TargetPage;
