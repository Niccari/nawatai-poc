import { Box } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import LoadError from "../../../components/element/loadException/loadError";
import LoadingContent from "../../../components/pages/loading";
import MetaHeader from "../../../components/pages/metaHeader";
import TabbedNamingDetailList from "../../../components/pages/target/namings/tabbedNamingDetailList";
import TargetDetail from "../../../components/pages/target/targetDetail";
import {
  NamingTarget,
  NamingTargetForView,
  NamingTargetListGenre,
} from "../../../models/namingTarget";
import { useLoginState } from "../../../modules/login/hooks";
import { useNamingTarget } from "../../../modules/namingTarget/hooks";
import { ActionButton } from "@/components/element/actionButton";

type Props = {
  ogpTarget: NamingTargetForView;
};

const TargetPage: NextPage<Props> = ({ ogpTarget }) => {
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
  if (router.isFallback) {
    return <LoadingContent />;
  }
  if (targetError) {
    return <LoadError />;
  }
  return (
    <>
      <MetaHeader
        title={`名付け対象: ${ogpTarget.title ?? ""}`}
        description={`コメント: ${ogpTarget.comment}`}
      />
      {target && (
        <>
          <TargetDetail target={target} />
          {isLogined && (
            <ActionButton className="mt-4" onClick={handleNaming}>
              名付けする！
            </ActionButton>
          )}
          <Box className="mt-4">
            <TabbedNamingDetailList
              targetId={targetId}
              authorId={target.authorId}
              genre={genre}
              page={page}
            />
          </Box>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const targetId = params?.targetId;
  if (!targetId || typeof targetId !== "string") {
    return {
      notFound: true,
    };
  }
  try {
    const target: NamingTargetForView = await (
      await fetch(
        `${process.env.VERCEL_URL_PROTOCOL}${process.env.VERCEL_URL}/api/targets/${targetId}`,
      )
    ).json();
    return {
      props: {
        ogpTarget: target,
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const targets: NamingTarget[] = await (
      await fetch(
        `${process.env.VERCEL_URL_PROTOCOL}${process.env.VERCEL_URL}/api/targets?genre=${NamingTargetListGenre.LATEST}&page=1`,
      )
    ).json();
    return {
      paths: targets.map((t) => `/targets/${t.id}`),
      fallback: true,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default TargetPage;
