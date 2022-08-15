import { Center, Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { useNamingTargets } from "../../modules/namingTarget/hooks";
import LoadError from "../loadException/loadError";
import NoContent from "../loadException/noContent";
import TargetSquare from "./targetSquare";

type Props = {
  genre: NamingTargetListGenre;
  pages: number;
};

const TargetList = ({ genre, pages }: Props): JSX.Element => {
  const { targets, targetsError } = useNamingTargets(genre, pages);

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
    return <NoContent objectName={objectName} />;
  }
  return (
    <SimpleGrid columns={[1, null, 2, 3]} gap={4}>
      {targets.map((t) => (
        <GridItem key={t.id}>
          <TargetSquare target={t} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default TargetList;
