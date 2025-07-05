import { PrimaryText } from "../text";
import { Heading } from "@/components/ui/typography";

type Props = {
  objectName: string;
};

const NoContent = ({ objectName }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <Heading as="h3" size="md">
        {objectName}はまだありません
      </Heading>
      <PrimaryText className="mt-2">
        ぜひ{objectName}を作ってみましょう！
      </PrimaryText>
    </div>
  );
};

export default NoContent;
