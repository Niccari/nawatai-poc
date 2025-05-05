import { Box, Tabs } from "@chakra-ui/react";
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
}: Props): React.ReactElement => {
  const router = useRouter();
  const { namings, namingsError } = useTargetNamings(targetId, genre, page);
  if (!targetId) {
    return <></>;
  }
  return (
    <Box>
      <Tabs.Root
        defaultValue={genre}
        size="md"
        variant="enclosed"
        onChange={(newGenre) =>
          router.push(`/targets/${targetId}?genre=${newGenre}&page=${page}`)
        }
      >
        <Tabs.List>
          <Tabs.Trigger value={NamingTargetListGenre.HOT}>
            ホット順
          </Tabs.Trigger>
          <Tabs.Trigger value={NamingTargetListGenre.LATEST}>
            最新順
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
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
