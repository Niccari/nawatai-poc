import type { NextPage } from "next";
import { PrimaryText } from "../components/element/text";
import { useRouterToNewUser } from "../modules/route/hooks";
import TargetList from "../components/pages/targets/targetList";
import { Box } from "@/components/ui/layout";
import { Heading } from "@/components/ui/typography";
import { NamingTargetListGenre } from "../models/namingTarget";
import NamingsList from "../components/pages/namings/namingsList";

const Dashboard: NextPage = () => {
  useRouterToNewUser();
  return (
    <>
      <Heading as="h2" size="lg">
        🔥 今ホットな名付け一覧
      </Heading>
      <Box className="mt-2">
        <NamingsList genre={NamingTargetListGenre.HOT} page={1} />
      </Box>
      <Heading as="h2" size="lg">
        👍 評価を待っている名付け一覧
      </Heading>
      <Box className="mt-2">
        <NamingsList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
      <Heading as="h2" size="lg">
        ⏰ 名付け募集中！
      </Heading>
      <Box className="mt-2">
        <TargetList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
    </>
  );
};

export default Dashboard;
