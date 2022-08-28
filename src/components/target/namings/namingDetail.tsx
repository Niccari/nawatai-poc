import {
  Flex,
  Box,
  Divider,
  Stack,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import EvalButton from "../../../element/evalButton";
import { NextImageAvatar } from "../../../element/nextImageAvatar";
import { PrimaryText } from "../../../element/text";
import { Naming } from "../../../models/naming";
import { NamingEval, NamingEvalKind } from "../../../models/namingEval";
import { NamingTargetListGenre } from "../../../models/namingTarget";
import { useCRUDNaming } from "../../../modules/naming/hooks";
import {
  useCreateNamingEval,
  useEditNamingEval,
} from "../../../modules/namingEval/hooks";
import { usePersonalUser } from "../../../modules/personalUser/hooks";
import TargetOwnerMenu from "../targetOwnerMenu";
import DeletionModal from "../deletionModal";
import BasicUser from "../../basicUser";

type Props = {
  naming: Naming;
  namingEvals: NamingEval[];
};

const NamingDetail = ({ naming, namingEvals }: Props): JSX.Element => {
  const { id, name, reason, evalCounts, targetId, authorId } = naming;
  const { precise, fun, question, missmatch } = evalCounts;

  const router = useRouter();
  const { user } = usePersonalUser(authorId);
  const { onCreate } = useCreateNamingEval();
  const { onEdit } = useEditNamingEval();
  const { runDelete } = useCRUDNaming();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOwner = user?.id === authorId;
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
    const namingEval = namingEvals.find((e) => e.kind === kind);
    if (!namingEval) {
      await onCreate({
        namingId: id,
        targetId,
        authorId,
        kind,
      });
    } else {
      await onEdit({
        id: namingEval.id,
        namingId: id,
        targetId,
        kind,
      });
    }
    mutate(`/api/targets/${targetId}`);
    mutate(`/api/targets/${targetId}/evals?authorId=${authorId}`);
    mutate(
      `/api/targets/${targetId}/namings/?genre=${NamingTargetListGenre.HOT}&page=1`
    );
    mutate(
      `/api/targets/${targetId}/namings/?genre=${NamingTargetListGenre.LATEST}&page=1`
    );
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
          <PrimaryText>
            <EvalButton
              kind={NamingEvalKind.PRECISE}
              count={precise}
              onEval={onEval}
            />
            <EvalButton kind={NamingEvalKind.FUN} count={fun} onEval={onEval} />
            <EvalButton
              kind={NamingEvalKind.QUESTION}
              count={question}
              onEval={onEval}
            />
            <EvalButton
              kind={NamingEvalKind.MISSMATCH}
              count={missmatch}
              onEval={onEval}
            />
          </PrimaryText>
          <BasicUser user={user} />
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default NamingDetail;
