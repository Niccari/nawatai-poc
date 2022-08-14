import "./index.module.css";
import type { NextPage } from "next";
import MainFrame from "../components/mainFrame";
import { PrimaryText } from "../element/text";
import { useLoginState } from "../modules/login/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { isNotRegistered } = useLoginState();

  useEffect(() => {
    if (isNotRegistered) {
      router.push("/users/new");
    }
  }, [isNotRegistered, router]);

  return (
    <div>
      <MainFrame>
        <PrimaryText>ダッシュボードページ</PrimaryText>
      </MainFrame>
    </div>
  );
};

export default Dashboard;
