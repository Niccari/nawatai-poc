import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
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
        defaultIndex={index}
        size="md"
        variant="enclosed"
        onChange={(index) =>
          index === 0
            ? router.push(
                `/targets/${targetId}?genre=${NamingTargetListGenre.HOT}&page=${page}`
              )
            : router.push(
                `/targets/${targetId}?genre=${NamingTargetListGenre.LATEST}&page=${page}`
              )
        }
      >
        <TabList>
          <Tab>ホット順</Tab>
          <Tab>最新順</Tab>
        </TabList>
      </Tabs>
      {namings && (
        <Box mt={4} ml={4} mr={4}>
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
