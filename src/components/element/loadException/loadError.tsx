import { PrimaryText } from "../text";
import { Heading } from "@/components/ui/typography";

type Props = {};

const LoadError = ({}: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <Heading as="h3" size="md">
        データを読み込めませんでした
      </Heading>
      <PrimaryText className="mt-2">
        再読み込みして改善しない場合、運営までご連絡ください
      </PrimaryText>
    </div>
  );
};

export default LoadError;
