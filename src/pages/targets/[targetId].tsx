import type { NextPage } from "next";
import { useRouter } from "next/router";
import TargetDetail from "../../components/target/targetDetail";
import { useNamingTarget } from "../../modules/namingTarget/hooks";

type Props = {};

const TargetPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { targetId } = router.query;
  const { target, targetError } = useNamingTarget(targetId as string);
  return <>{target && <TargetDetail target={target} />}</>;
};

export default TargetPage;
