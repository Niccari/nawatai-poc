import {
  Flex,
  Box,
  Divider,
  Stack,
  Link,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextImageAvatar } from "../../element/nextImageAvatar";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../models/namingTarget";
import { useDeleteNamingTarget } from "../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../modules/personalUser/hooks";
import DeletionModal from "./deletionModal";
import TargetOwnerMenu from "./targetOwnerMenu";

type Props = {
  target: NamingTargetForView;
};

const TargetDetail = ({ target }: Props): JSX.Element => {
  const { id, authorId, title, comment, imageUrl, evalCounts, isDeleted } =
    target;
  const { precise, fun, question, missmatch } = evalCounts;

  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  const { onDelete } = useDeleteNamingTarget();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOwner = user?.id === authorId;
  const handleEdit = () => {
    router.push(`/targets/${target.id}/edit`);
  };
  const handleDelete = () => {
    onOpen();
  };
  if (isDeleted) {
    return (
      <Box>
        <Center h="136px">
          <PrimaryText>この名付け対象は削除されました</PrimaryText>
        </Center>
        <Divider />
      </Box>
    );
  }
  return (
    <Box>
      <DeletionModal
        isOpen={isOpen}
        onClose={onClose}
        requestDelete={() => {
          onDelete(id);
        }}
      />
      <Flex pb={2}>
        <Box flexShrink={0} background="#333" w="200px" h="200px">
          <Link href={imageUrl}>
            <Image
              src={imageUrl ?? ""}
              alt={comment}
              width="200px"
              height="200px"
              layout="fixed"
              objectFit="cover"
              quality={80}
            />
          </Link>
        </Box>
        <Stack minW="200px" flexGrow={1} ml={4} justifyContent="space-between">
          <Stack>
            <Flex>
              <PrimaryText
                textStyle="h2"
                flex={1}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {title}
              </PrimaryText>
              {isOwner && (
                <TargetOwnerMenu
                  handleEdit={isOwner ? handleEdit : undefined}
                  handleDelete={isOwner ? handleDelete : undefined}
                />
              )}
            </Flex>
            <PrimaryText>{comment}</PrimaryText>
          </Stack>
          <Stack>
            <PrimaryText>
              👍 {precise} 😂 {fun} ❓ {question} 😵 {missmatch}
            </PrimaryText>
            <Flex alignItems="center">
              <NextImageAvatar
                width="40px"
                height="40px"
                src={user?.imageUrl}
              ></NextImageAvatar>
              <PrimaryText ml={2}>{user?.name}</PrimaryText>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default TargetDetail;
