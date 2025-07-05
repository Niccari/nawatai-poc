import { Box } from "../../ui/layout";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {namings.map((n) => (
          <NamingSquare key={n.id} naming={n} />
        ))}
      </div>
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
