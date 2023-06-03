import { Box, Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import Constants from "../../../../constants";
import { Naming } from "../../../../models/naming";
import { NamingTargetListGenre } from "../../../../models/namingTarget";
import { useLoginState } from "../../../../modules/login/hooks";
import { useNamingEvalsByUserOfTarget } from "../../../../modules/namingEval/hooks";
import LoadError from "../../../element/loadException/loadError";
import NoContent from "../../../element/loadException/noContent";
import LoadingContent from "../../loading";
import Pager from "../../pager";
import NamingDetail from "./namingDetail";

type Props = {
  namings: Naming[] | undefined;
  namingsError: Error | undefined;
  targetId: string;
  authorId: string;
  page: number;
  genre: NamingTargetListGenre;
};

const NamingDetailList = ({
  namings,
  namingsError,
  targetId,
  page,
  genre,
}: Props): JSX.Element => {
  const { personalUser } = useLoginState();
  const { namingEvals, namingEvalsError } = useNamingEvalsByUserOfTarget({
    targetId,
    authorId: personalUser?.id,
  });
  if (namings === undefined) {
    return <LoadingContent />;
  } else if (namingsError || namingEvalsError) {
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
        <Pager
          endpoint={`/targets/${targetId}`}
          page={page}
          genre={genre}
          hasNext={false}
        />
      </Box>
    );
  }
  return (
    <Box>
      <SimpleGrid columns={[1, null, 1, 2]} gap={4}>
        {namings.map((n) => (
          <NamingDetail
            key={n.id}
            naming={n}
            namingEvals={namingEvals?.filter((e) => e.namingId === n.id) ?? []}
          />
        ))}
      </SimpleGrid>
      <Pager
        endpoint={`/targets/${targetId}`}
        page={page}
        genre={genre}
        hasNext={namings.length === Constants.namingTargetsPageCount}
      />
    </Box>
  );
};

export default NamingDetailList;
