import type { NextPage } from "next";
import { PrimaryText } from "../../element/text";
import { useRouterToNewUser } from "../../modules/route/hooks";
import TargetList from "../../components/targets/targetList";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { useState } from "react";

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
  const index = genre === NamingTargetListGenre.HOT ? 0 : 1;
  return (
    <>
      <Tabs
        defaultIndex={index}
        size="md"
        variant="enclosed"
        onChange={(index) =>
          index === 0
            ? router.push(
                `/targets?genre=${NamingTargetListGenre.HOT}&page=${page}`
              )
            : router.push(
                `/targets?genre=${NamingTargetListGenre.LATEST}&page=${page}`
              )
        }
      >
        <TabList>
          <Tab>ホット順</Tab>
          <Tab>最新順</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PrimaryText textStyle="h2">🔥 ホットな名付け対象一覧</PrimaryText>
          </TabPanel>
          <TabPanel>
            <PrimaryText textStyle="h2">⏰ 名付け募集中！</PrimaryText>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mt={2}>
        <TargetList genre={genre} page={page} />
      </Box>
    </>
  );
};

export default TargetsPage;
function setState(): [any, any] {
  throw new Error("Function not implemented.");
}