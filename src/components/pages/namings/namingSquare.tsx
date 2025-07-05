import { VStack, Box } from "@/components/ui/layout";
import { Text } from "@/components/ui/typography";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Naming } from "../../../models/naming";
import { useNamingTarget } from "../../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import BasicUser from "../basicUser";

type Props = {
  naming: Naming;
};

const NamingSquare = ({ naming }: Props) => {
  const { id, authorId, targetId, name, reason, evalCounts } = naming;
  const { precise, fun, question, missmatch } = evalCounts;
  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  const { target } = useNamingTarget(targetId);
  if (!target) {
    return <Box className="bg-gray-800 h-[300px] flex items-center" />;
  }
  return (
    <Box
      className="relative w-full aspect-[4/3] bg-gray-800 flex items-center cursor-pointer"
      onClick={() => router.push(`/targets/${targetId}`)}
    >
      {target.imageUrl && (
        <Image
          src={target.imageUrl}
          alt={target.title ?? "naming image"}
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
            {target.title && (
              <Text color="secondary" className="text-[#f1f1f1]">
                {target.title}
              </Text>
            )}
            <Text
              color="primary"
              size="lg"
              weight="semibold"
              className={cn(target.title ? "mt-4" : "", "text-[#f1f1f1]")}
            >
              {name}
            </Text>
            <Text color="secondary" className="text-[#f1f1f1]">
              {reason}
            </Text>
            <Text color="secondary" className="mt-2 text-[#f1f1f1]">
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

export default NamingSquare;
