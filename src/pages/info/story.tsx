import { Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { PrimaryText } from "../../components/element/text";

type Props = {};

const StoryPage: NextPage<Props> = ({}) => {
  return (
    <>
      <PrimaryText textStyle="h2">nawataiについて</PrimaryText>
      <Flex
        h="250px"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <p>世の中には、数え切れないほどのものが存在します。</p>
          <p>
            それらに良い名前をつけると、イメージの共有や理解がしやすくなります。
          </p>
          <p>
            例えば、&quot;レトロフューチャー&quot;、&quot;2.5次元&quot;などなど。。
          </p>
          <p>とはいえ、一人で名前を決めるのは大変です。</p>
          <p>なので、皆で名前を持ち寄って、皆で名前をつけてみましょう！</p>
        </Stack>
      </Flex>
    </>
  );
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  return {
    props: {},
  };
};

export default StoryPage;
