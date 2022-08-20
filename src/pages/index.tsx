import "./index.module.css";
import type { NextPage } from "next";
import { PrimaryText } from "../element/text";
import { useRouterToNewUser } from "../modules/route/hooks";
import TargetList from "../components/targets/targetList";
import { Box } from "@chakra-ui/react";
import { NamingTargetListGenre } from "../models/namingTarget";
import NamingsList from "../components/namings/namingsList";

const Dashboard: NextPage = () => {
  useRouterToNewUser();
  return (
    <>
      <PrimaryText textStyle="h2">🔥 今ホットな名付け一覧</PrimaryText>
      <Box mt={2}>
        <NamingsList genre={NamingTargetListGenre.HOT} page={1} />
      </Box>
      <PrimaryText textStyle="h2">👍 評価を待っている名付け一覧</PrimaryText>
      <Box mt={2}>
        <NamingsList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
      <PrimaryText textStyle="h2">⏰ 名付け募集中！</PrimaryText>
      <Box mt={2}>
        <TargetList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
    </>
  );
};

export default Dashboard;
