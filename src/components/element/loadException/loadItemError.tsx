import { PrimaryText } from "../text";
import { Heading } from "@/components/ui/typography";

type Props = {};

const LoadItemError = ({}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <Heading as="h3" size="md">
        データが見つかりませんでした
      </Heading>
      <PrimaryText className="mt-2">
        URLが正しいか、お確かめ下さい。
      </PrimaryText>
    </div>
  );
};

export default LoadItemError;
