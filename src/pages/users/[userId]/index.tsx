import { Box } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import LoadingContent from "../../../components/pages/loading";
import MetaHeader from "../../../components/pages/metaHeader";
import UserDetail from "../../../components/pages/users/userDetail";
import { PersonalUserDetailView } from "../../../models/personalUser";

type Props = {
  user: PersonalUserDetailView;
};

const PersonalUserPage: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingContent />;
  }
  return (
    <Box>
      <MetaHeader
        title={`${user.name}さんの名付け活動記録`}
        description={`紹介文: ${user.profile ?? ""}`}
      />
      <UserDetail user={user} />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const userId = params?.userId;
  if (!userId || typeof userId !== "string") {
    return {
      notFound: true,
    };
  }
  try {
    const user: PersonalUserDetailView = await (
      await fetch(
        `${process.env.VERCEL_URL_PROTOCOL}${process.env.VERCEL_URL}/api/users/${userId}?detailed=true`,
      )
    ).json();
    return {
      props: {
        user,
      },
      revalidate: 30,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default PersonalUserPage;
