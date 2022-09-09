import {
  Flex,
  Box,
  Divider,
  Stack,
  Link,
  useDisclosure,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../models/namingTarget";
import { useLoginState } from "../../modules/login/hooks";
import { useDeleteNamingTarget } from "../../modules/namingTarget/hooks";
import { usePersonalUser } from "../../modules/personalUser/hooks";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOwner = loginUser?.id === authorId;
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
      <Flex pb={2} flexWrap="wrap" gap={4}>
        <Box
          background="#333"
          w={{ base: "100vw", xl: "300px", lg: "300px", md: "300px" }}
          h={{ base: "40vw", xl: "300px", lg: "300px", md: "300px" }}
          overflow="hidden"
          alignContent="center"
          verticalAlign="center"
        >
          <Link href={imageUrl}>
            <Box position="relative" top={{ md: "0", sm: "-20vw" }}>
              <Image
                src={imageUrl ?? ""}
                alt={comment}
                width="300px"
                height="300px"
                layout="responsive"
                objectFit="cover"
                quality={80}
              />
            </Box>
          </Link>
        </Box>
        <Stack flexGrow={1} justifyContent="space-between">
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
            <BasicUser user={user} />
          </Stack>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default TargetDetail;
