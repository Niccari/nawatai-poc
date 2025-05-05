import type { NextPage } from "next";
import { PrimaryText } from "../../components/element/text";
import { useRouterToNewUser } from "../../modules/route/hooks";
import TargetList from "../../components/pages/targets/targetList";
import { Box, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NamingTargetListGenre } from "../../models/namingTarget";

const TargetsPage: NextPage = ({}) => {
  const router = useRouter();
  const { genre: genre0, page: page0 } = router.query;
  const genre = (() =>
    genre0 === NamingTargetListGenre.HOT ||
    genre0 === NamingTargetListGenre.LATEST
      ? genre0
      : undefined)();
  const page = (() =>
    typeof page0 === "string" ? parseInt(page0, 10) : undefined)();
  useRouterToNewUser();

  if (!genre || !page) {
    return <>不正なパラメータです</>;
  }
  return (
    <>
      <Tabs.Root
        defaultValue={genre}
        size="md"
        variant="enclosed"
        onChange={(value) =>
          router.push(`/targets?genre=${value}&page=${page}`)
        }
      >
        <Tabs.List>
          <Tabs.Trigger value={NamingTargetListGenre.HOT}>
            ホット順
          </Tabs.Trigger>
          <Tabs.Trigger value={NamingTargetListGenre.LATEST}>
            最新順
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value={NamingTargetListGenre.HOT}>
            <PrimaryText textStyle="h2">🔥 ホットな名付け対象一覧</PrimaryText>
          </Tabs.Content>
          <Tabs.Content value={NamingTargetListGenre.LATEST}>
            <PrimaryText textStyle="h2">⏰ 名付け募集中！</PrimaryText>
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
      <Box mt={2}>
        <TargetList genre={genre} page={page} />
      </Box>
    </>
  );
};

export default TargetsPage;
