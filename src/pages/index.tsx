import "./index.module.css";
import type { NextPage } from "next";
import MainFrame from "../components/mainFrame";
import { PrimaryText } from "../element/text";

const Dashboard: NextPage = () => {
  return (
    <div>
      <MainFrame>
        <PrimaryText>ダッシュボードページ</PrimaryText>
      </MainFrame>
    </div>
  );
};

export default Dashboard;
