import { Box, VStack, HStack } from "@/components/ui/layout";
import { Text } from "@/components/ui/typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { NamingTargetForView } from "../../../models/namingTarget";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import BasicUser from "../basicUser";

type Props = {
  target: NamingTargetForView;
};

const TargetSquare = ({ target }: Props): JSX.Element => {
  const { id, authorId, title, comment, imageUrl, evalCounts } = target;
  const { precise, fun, question, missmatch } = evalCounts;
  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  return (
    <Box
      className="w-full aspect-[4/3] relative bg-gray-800 flex items-center cursor-pointer"
      onClick={() => router.push(`/targets/${id}`)}
    >
      {target.imageUrl && (
        <Image
          src={target.imageUrl}
          alt={target.title ?? "target image"}
          fill
          sizes="300"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          quality={80}
        />
      )}
      <VStack className="w-full h-full absolute top-0 left-0 justify-between">
        <VStack className="w-full justify-center flex-1">
          <Box className="w-full text-center px-2 bg-black/60">
            <Text color="secondary" size="lg" weight="semibold">
              {title}
            </Text>
            <Text color="secondary">{comment}</Text>
            <Text color="secondary" className="mt-2">
              👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
            </Text>
          </Box>
        </VStack>
        <Box className="w-full p-2 bg-black/60">
          <BasicUser user={user} noLink />
        </Box>
      </VStack>
    </Box>
  );
};

export default TargetSquare;
