import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { NamingTargetListGenre } from "../../../models/namingTarget";
import LoadError from "../../element/loadException/loadError";
import NoContent from "../../element/loadException/noContent";
import { useNamings } from "../../../modules/naming/hooks";
import LoadingContent from "../loading";
import NamingSquare from "./namingSquare";
import Constants from "../../../constants";
import Pager from "../pager";

type Props = {
  genre: NamingTargetListGenre;
  page: number;
};

const NamingsList = ({ genre, page }: Props): JSX.Element => {
  const { namings, namingsError } = useNamings(genre, page);

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
          return "最新の名付け一覧";
        default:
          return "ホットな名付け一覧";
      }
    })();
    return (
      <Box>
        <NoContent objectName={objectName} />
        <Pager endpoint="/namings" page={page} genre={genre} hasNext={false} />
      </Box>
    );
  }
  return (
    <Box>
      <SimpleGrid columns={[1, null, 2, 3]} gap={4}>
        {namings.map((n) => (
          <GridItem key={n.id}>
            <NamingSquare naming={n} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Pager
        endpoint="/namings"
        page={page}
        genre={genre}
        hasNext={namings.length === Constants.namingsPageCount}
      />
    </Box>
  );
};

export default NamingsList;
