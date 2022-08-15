import { Flex, Link, Text } from "@chakra-ui/react";
import { NamingTargetListGenre } from "../../models/namingTarget";

type Props = {
  page: number;
  genre: NamingTargetListGenre;
};

const findRange = (page: number) => {
  const begin = Math.max(page - 5, 1);
  const end = page + 5;
  return Array(end - begin + 1)
    .fill(0)
    .map((e, i) => i + begin);
};

const Pager = ({ genre, page }: Props): JSX.Element => {
  const range = findRange(page);

  return (
    <Flex justifyContent="center">
      <Flex display="inline-flex">
        {range.map((r) => (
          <Link key={r} href={`/targets?genre=${genre}&page=${r}`}>
            <Text
              pl={1}
              pr={1}
              css={
                r === page ? "text-decoration: underline #FF0000;" : undefined
              }
            >
              {r}
            </Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default Pager;
