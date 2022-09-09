import {
  Flex,
  Box,
  Divider,
  Stack,
  useDisclosure,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import EvalButton from "../../../element/evalButton";
import { PrimaryText } from "../../../element/text";
import { Naming } from "../../../models/naming";
import { NamingEval, NamingEvalKind } from "../../../models/namingEval";
import { useCRUDNaming } from "../../../modules/naming/hooks";
import { useUpsertNamingEval } from "../../../modules/namingEval/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import TargetOwnerMenu from "../targetOwnerMenu";
import DeletionModal from "../deletionModal";
import BasicUser from "../../basicUser";
import { useLoginState } from "../../../modules/login/hooks";

type Props = {
  naming: Naming;
  namingEvals: NamingEval[];
};

const NamingDetail = ({ naming, namingEvals }: Props): JSX.Element => {
  const { id, name, reason, evalCounts, targetId, authorId } = naming;
  const { precise, fun, question, missmatch } = evalCounts;

  const router = useRouter();
  const { personalUser: loginUser, isLogined } = useLoginState();
  const { user } = usePersonalUser(authorId);
  const { isUpdating, onCreate, onEdit } = useUpsertNamingEval();
  const { runDelete } = useCRUDNaming();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOwner = loginUser?.id === authorId;
  const handleEdit = () => {
    router.push(`/namings/${id}/edit`);
  };
  const handleDelete = () => {
    onOpen();
  };

  const requestDelete = async () => {
    await runDelete(targetId, id);
  };

  const onEval = async (kind: NamingEvalKind) => {
    const loginUserId = loginUser?.id;
    if (!loginUserId) {
      return;
    }
    const namingEval = namingEvals.find((e) => e.kind === kind);
    if (!namingEval) {
      await onCreate({
        namingId: id,
        targetId,
        authorId: loginUserId,
        kind,
      });
    } else {
      await onEdit({
        id: namingEval.id,
        namingId: id,
        targetId,
        authorId: loginUserId,
        kind,
      });
    }
  };

  if (naming.isDeleted) {
    return (
      <Box>
        <Center h="136px">
          <PrimaryText>この名付けは削除されました</PrimaryText>
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
          requestDelete();
        }}
      />
      <Flex pb={2}>
        <Stack minW="200px" flexGrow={1} justifyContent="space-between">
          <Flex>
            <PrimaryText
              textStyle="h2"
              flex={1}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {name}
            </PrimaryText>
            {isOwner && (
              <TargetOwnerMenu
                handleEdit={isOwner ? handleEdit : undefined}
                handleDelete={isOwner ? handleDelete : undefined}
              />
            )}
          </Flex>
          <PrimaryText>{reason}</PrimaryText>
          <HStack>
            <EvalButton
              kind={NamingEvalKind.PRECISE}
              count={precise}
              onEval={onEval}
              disabled={!isLogined || isUpdating}
            />
            <EvalButton
              kind={NamingEvalKind.FUN}
              count={fun}
              onEval={onEval}
              disabled={!isLogined || isUpdating}
            />
            <EvalButton
              kind={NamingEvalKind.QUESTION}
              count={question}
              onEval={onEval}
              disabled={!isLogined || isUpdating}
            />
            <EvalButton
              kind={NamingEvalKind.MISSMATCH}
              count={missmatch}
              onEval={onEval}
              disabled={!isLogined || isUpdating}
            />
          </HStack>
          <BasicUser user={user} />
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default NamingDetail;
