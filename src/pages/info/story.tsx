import { Flex, VStack } from "@/components/ui/layout";
import { Heading } from "@/components/ui/typography";
import { NextPage } from "next";
import { PrimaryText } from "../../components/element/text";

type Props = {};

const StoryPage: NextPage<Props> = ({}) => {
  return (
    <>
      <Heading as="h2" size="lg">
        nawataiについて
      </Heading>
      <Flex className="h-[250px] text-center justify-center items-center">
        <VStack>
          <p>世の中には、数え切れないほどのものが存在します。</p>
          <p>
            それらに良い名前をつけると、イメージの共有や理解がしやすくなります。
          </p>
          <p>
            例えば、&quot;レトロフューチャー&quot;、&quot;2.5次元&quot;などなど。。
          </p>
          <p>とはいえ、一人で名前を決めるのは大変です。</p>
          <p>なので、皆で名前を持ち寄って、皆で名前をつけてみましょう！</p>
        </VStack>
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
