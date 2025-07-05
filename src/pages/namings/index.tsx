import type { NextPage } from "next";
import { PrimaryText } from "../../components/element/text";
import { useRouterToNewUser } from "../../modules/route/hooks";
import TargetList from "../../components/pages/targets/targetList";
import { Box } from "@/components/ui/layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/typography";
import { useRouter } from "next/router";
import { NamingTargetListGenre } from "../../models/namingTarget";

const NamingsPage: NextPage = ({}) => {
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
        defaultValue={index === 0 ? "hot" : "latest"}
        onValueChange={(value) =>
          value === "hot"
            ? router.push(
                `/targets?genre=${NamingTargetListGenre.HOT}&page=${page}`,
              )
            : router.push(
                `/targets?genre=${NamingTargetListGenre.LATEST}&page=${page}`,
              )
        }
      >
        <TabsList>
          <TabsTrigger value="hot">ホット順</TabsTrigger>
          <TabsTrigger value="latest">最新順</TabsTrigger>
        </TabsList>
        <TabsContent value="hot">
          <Heading as="h2" size="lg">
            🔥 ホットな名付一覧
          </Heading>
        </TabsContent>
        <TabsContent value="latest">
          <Heading as="h2" size="lg">
            ⏰ 名付け募集中！
          </Heading>
        </TabsContent>
      </Tabs>
      <Box className="mt-2">
        <TargetList genre={genre} page={page} />
      </Box>
    </>
  );
};

export default NamingsPage;
