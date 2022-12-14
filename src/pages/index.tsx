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
      <PrimaryText textStyle="h2">π₯ δ»γγγγͺεδ»γδΈθ¦§</PrimaryText>
      <Box mt={2}>
        <NamingsList genre={NamingTargetListGenre.HOT} page={1} />
      </Box>
      <PrimaryText textStyle="h2">π θ©δΎ‘γεΎγ£γ¦γγεδ»γδΈθ¦§</PrimaryText>
      <Box mt={2}>
        <NamingsList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
      <PrimaryText textStyle="h2">β° εδ»γειδΈ­οΌ</PrimaryText>
      <Box mt={2}>
        <TargetList genre={NamingTargetListGenre.LATEST} page={1} />
      </Box>
    </>
  );
};

export default Dashboard;
