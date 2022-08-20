import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { useNamings } from "../../modules/naming/hooks";
import NamingDetailList from "./namingDetailList";

type Props = {
  targetId: string | undefined;
  page: number;
  genre: NamingTargetListGenre;
};

const TabbedNamingDetailList = ({
  targetId,
  page,
  genre,
}: Props): JSX.Element => {
  const router = useRouter();
  const index = genre === NamingTargetListGenre.HOT ? 0 : 1;
  const { namings, namingsError } = useNamings(targetId, genre, page);
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
            page={page}
            genre={genre}
          />
        </Box>
      )}
    </Box>
  );
};

export default TabbedNamingDetailList;
