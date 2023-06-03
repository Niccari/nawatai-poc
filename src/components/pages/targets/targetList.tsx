import { Box, Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import Constants from "../../../constants";
import { NamingTargetListGenre } from "../../../models/namingTarget";
import { useNamingTargets } from "../../../modules/namingTarget/hooks";
import LoadError from "../../element/loadException/loadError";
import NoContent from "../../element/loadException/noContent";
import Pager from "../pager";
import TargetSquare from "./targetSquare";

type Props = {
  genre: NamingTargetListGenre;
  page: number;
};

const TargetList = ({ genre, page }: Props): JSX.Element => {
  const { targets, targetsError } = useNamingTargets(genre, page);

  if (targets === undefined) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  } else if (targetsError) {
    return <LoadError />;
  } else if (targets.length === 0) {
    const objectName = (() => {
      switch (genre) {
        case NamingTargetListGenre.HOT:
          return "ホットな名付け対象一覧";
        case NamingTargetListGenre.LATEST:
          return "最新の名付け対象一覧";
        default:
          return "ホットな名付け対象一覧";
      }
    })();
    return (
      <Box>
        <NoContent objectName={objectName} />
        <Pager endpoint="/targets" page={page} genre={genre} hasNext={false} />
      </Box>
    );
  }
  return (
    <Box>
      <SimpleGrid columns={[1, null, 2, 3]} gap={4}>
        {targets.map((t) => (
          <GridItem key={t.id}>
            <TargetSquare target={t} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Pager
        endpoint="/targets"
        page={page}
        genre={genre}
        hasNext={targets.length === Constants.namingTargetsPageCount}
      />
    </Box>
  );
};

export default TargetList;
