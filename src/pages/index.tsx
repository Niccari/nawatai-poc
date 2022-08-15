import "./index.module.css";
import type { NextPage } from "next";
import { PrimaryText } from "../element/text";
import { useRouterToNewUser } from "../modules/route/hooks";

const Dashboard: NextPage = () => {
  useRouterToNewUser();
  return (
    <>
      <PrimaryText>ダッシュボードページ</PrimaryText>
    </>
  );
};

export default Dashboard;
