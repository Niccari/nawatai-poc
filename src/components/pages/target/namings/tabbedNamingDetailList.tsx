import { Box } from "@/components/ui/layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { NamingTargetListGenre } from "../../../../models/namingTarget";
import { useTargetNamings } from "../../../../modules/naming/hooks";
import NamingDetailList from "./namingDetailList";

type Props = {
  targetId: string | undefined;
  authorId: string;
  page: number;
  genre: NamingTargetListGenre;
};

const TabbedNamingDetailList = ({
  targetId,
  authorId,
  page,
  genre,
}: Props): JSX.Element => {
  const router = useRouter();
  const index = genre === NamingTargetListGenre.HOT ? 0 : 1;
  const { namings, namingsError } = useTargetNamings(targetId, genre, page);
  if (!targetId) {
    return <></>;
  }
  return (
    <Box>
      <Tabs
        defaultValue={index === 0 ? "hot" : "latest"}
        onValueChange={(value) =>
          value === "hot"
            ? router.push(
                `/targets/${targetId}?genre=${NamingTargetListGenre.HOT}&page=${page}`,
              )
            : router.push(
                `/targets/${targetId}?genre=${NamingTargetListGenre.LATEST}&page=${page}`,
              )
        }
      >
        <TabsList>
          <TabsTrigger value="hot">ホット順</TabsTrigger>
          <TabsTrigger value="latest">最新順</TabsTrigger>
        </TabsList>
      </Tabs>
      {namings && (
        <Box className="mt-4 mx-4">
          <NamingDetailList
            namings={namings}
            namingsError={namingsError}
            targetId={targetId}
            authorId={authorId}
            page={page}
            genre={genre}
          />
        </Box>
      )}
    </Box>
  );
};

export default TabbedNamingDetailList;
