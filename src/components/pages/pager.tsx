import { Flex } from "../ui/layout";
import Link from "next/link";
import { NamingTargetListGenre } from "../../models/namingTarget";

type Props = {
  endpoint: string;
  page: number;
  genre: NamingTargetListGenre;
  hasNext: boolean;
};

const Pager = ({ endpoint, genre, page, hasNext }: Props) => {
  return (
    <Flex justify="center">
      <Flex className="inline-flex">
        <Link
          href={`${endpoint}?genre=${genre}&page=${page - 1}`}
          className={page > 1 ? "visible" : "invisible"}
        >
          <span>{"<"}</span>
        </Link>
        <span className="px-2">{page}</span>
        <Link
          href={`${endpoint}?genre=${genre}&page=${page + 1}`}
          className={hasNext ? "visible" : "invisible"}
        >
          <span>{">"}</span>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Pager;
