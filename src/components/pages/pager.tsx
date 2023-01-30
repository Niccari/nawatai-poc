import { Flex, Link, Text } from "@chakra-ui/react";
import { NamingTargetListGenre } from "../../models/namingTarget";

type Props = {
  endpoint: string;
  page: number;
  genre: NamingTargetListGenre;
  hasNext: boolean;
};

const Pager = ({ endpoint, genre, page, hasNext }: Props) => {
  return (
    <Flex justifyContent="center">
      <Flex display="inline-flex">
        <Link
          href={`${endpoint}?genre=${genre}&page=${page - 1}`}
          visibility={page > 1 ? "visible" : "hidden"}
        >
          <Text>{"<"}</Text>
        </Link>
        <Text pl={2} pr={2}>
          {page}
        </Text>
        <Link
          href={`${endpoint}?genre=${genre}&page=${page + 1}`}
          visibility={hasNext ? "visible" : "hidden"}
        >
          <Text>{">"}</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Pager;
