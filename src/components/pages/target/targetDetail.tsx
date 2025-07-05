import { Flex, Box, VStack } from "../../ui/layout";
import { Separator } from "../../ui/separator";
import { Heading } from "@/components/ui/typography";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../../models/namingTarget";
import { useLoginState } from "../../../modules/login/hooks";
import { useDeleteNamingTarget } from "../../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import BasicUser from "../basicUser";
import DeletionModal from "./deletionModal";
import TargetOwnerMenu from "./targetOwnerMenu";

type Props = {
  target: NamingTargetForView;
};

const TargetDetail = ({ target }: Props): JSX.Element => {
  const { id, authorId, title, comment, imageUrl, isDeleted } = target;
  const router = useRouter();
  const { personalUser: loginUser } = useLoginState();
  const { user } = usePersonalUser(authorId);
  const { onDelete } = useDeleteNamingTarget();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = loginUser?.id === authorId;
  const handleEdit = () => {
    router.push(`/targets/${target.id}/edit`);
  };
  const handleDelete = () => {
    setIsModalOpen(true);
  };
  if (isDeleted) {
    return (
      <Box>
        <div className="flex items-center justify-center h-[136px]">
          <PrimaryText>この名付け対象は削除されました</PrimaryText>
        </div>
        <Separator />
      </Box>
    );
  }
  return (
    <Box>
      <DeletionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requestDelete={() => {
          onDelete(id);
        }}
      />
      <Flex wrap="wrap" gap="4" className="pb-2 flex-col sm:flex-row">
        <a href={imageUrl} className="block w-full sm:w-auto">
          <Box className="bg-gray-800 relative overflow-hidden flex items-center justify-center w-[calc(100vw-16px)] aspect-[4/3] sm:w-[300px] sm:aspect-square">
            <Image
              src={imageUrl ?? ""}
              alt={comment}
              fill
              sizes="300"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
              priority
              quality={80}
            />
          </Box>
        </a>
        <VStack className="flex-1 justify-between">
          <VStack>
            <Flex className="w-full">
              <Heading
                as="h2"
                size="lg"
                className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {title}
              </Heading>
              {isOwner && (
                <TargetOwnerMenu
                  handleEdit={isOwner ? handleEdit : undefined}
                  handleDelete={isOwner ? handleDelete : undefined}
                />
              )}
            </Flex>
            <PrimaryText>{comment}</PrimaryText>
          </VStack>
          <VStack>
            <BasicUser user={user} />
          </VStack>
        </VStack>
      </Flex>
      <Separator />
    </Box>
  );
};

export default TargetDetail;
