import "./index.module.css";
import type { NextPage } from "next";
import MainFrame from "../components/mainFrame";
import { PrimaryText } from "../element/text";
import { useRouterToNewUser } from "../modules/route/hooks";

const Dashboard: NextPage = () => {
  useRouterToNewUser();
  return (
    <div>
      <MainFrame>
        <PrimaryText>ダッシュボードページ</PrimaryText>
      </MainFrame>
    </div>
  );
};

export default Dashboard;
