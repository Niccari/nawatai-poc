import { Flex, Link, Text } from "@chakra-ui/react";
import { NamingTargetListGenre } from "../../models/namingTarget";

type Props = {
  page: number;
  genre: NamingTargetListGenre;
  hasNext: boolean;
};

const Pager = ({ genre, page, hasNext }: Props): JSX.Element => {
  return (
    <Flex justifyContent="center">
      <Flex display="inline-flex">
        <Link
          href={`/targets?genre=${genre}&page=${page - 1}`}
          visibility={page > 1 ? "visible" : "hidden"}
        >
          <Text>{"<"}</Text>
        </Link>
        <Text pl={2} pr={2}>
          {page}
        </Text>
        <Link
          href={`/targets?genre=${genre}&page=${page + 1}`}
          visibility={hasNext ? "visible" : "hidden"}
        >
          <Text>{">"}</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Pager;
