import { Box, Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Naming } from "../../models/naming";
import { NamingTargetListGenre } from "../../models/namingTarget";
import LoadError from "../loadException/loadError";
import NoContent from "../loadException/noContent";
import LoadingContent from "../loading";
import Pager from "../targets/pager";
import NamingDetail from "./namingDetail";

type Props = {
  namings: Naming[] | undefined;
  namingsError: Error | undefined;
  page: number;
  genre: NamingTargetListGenre;
};

const NamingDetailList = ({
  namings,
  namingsError,
  page,
  genre,
}: Props): JSX.Element => {
  if (namings === undefined) {
    return <LoadingContent />;
  } else if (namingsError) {
    return <LoadError />;
  } else if (namings.length === 0) {
    const objectName = (() => {
      switch (genre) {
        case NamingTargetListGenre.HOT:
          return "ホットな名付け一覧";
        case NamingTargetListGenre.LATEST:
          return "評価を待っている名付け一覧";
        default:
          return "ホットな名付け一覧";
      }
    })();
    return (
      <Box>
        <NoContent objectName={objectName} />
        <Pager page={page} genre={genre} hasNext={false} />
      </Box>
    );
  }
  return (
    <Box>
      <SimpleGrid columns={[1, null, 1, 2]} gap={4}>
        {namings.map((n) => (
          <NamingDetail key={n.id} naming={n} />
        ))}
      </SimpleGrid>
      <Pager page={page} genre={genre} hasNext={namings.length === 12} />
    </Box>
  );
};

export default NamingDetailList;
