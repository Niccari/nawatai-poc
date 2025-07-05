import { Flex, Box, VStack, HStack } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/typography";
import { useState } from "react";
import { useRouter } from "next/router";
import EvalButton from "../../../element/evalButton";
import { PrimaryText } from "../../../element/text";
import { Naming } from "../../../../models/naming";
import { NamingEval, NamingEvalKind } from "../../../../models/namingEval";
import { useCRUDNaming } from "../../../../modules/naming/hooks";
import { useUpsertNamingEval } from "../../../../modules/namingEval/hooks";
import { usePersonalUser } from "../../../../modules/personalUser/hooks";
import TargetOwnerMenu from "../targetOwnerMenu";
import DeletionModal from "../deletionModal";
import BasicUser from "../../basicUser";
import { useLoginState } from "../../../../modules/login/hooks";

type Props = {
  naming: Naming;
  namingEvals: NamingEval[];
};

const NamingDetail = ({ naming, namingEvals }: Props) => {
  const { id, name, reason, evalCounts, targetId, authorId } = naming;
  const { precise, fun, question, missmatch } = evalCounts;

  const router = useRouter();
  const { personalUser: loginUser, isLogined } = useLoginState();
  const { user } = usePersonalUser(authorId);
  const { isUpdating, onCreate, onEdit } = useUpsertNamingEval();
  const { runDelete } = useCRUDNaming();
  const [isOpen, setIsOpen] = useState(false);

  const isOwner = loginUser?.id === authorId;
  const handleEdit = () => {
    router.push(`/namings/${id}/edit`);
  };
  const handleDelete = () => {
    setIsOpen(true);
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
        <div className="h-34 flex items-center justify-center">
          <PrimaryText>この名付けは削除されました</PrimaryText>
        </div>
        <Separator />
      </Box>
    );
  }
  return (
    <Box>
      <DeletionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        requestDelete={() => {
          requestDelete();
        }}
      />
      <Flex className="pb-2">
        <VStack className="min-w-[200px] flex-1 justify-between">
          <Flex>
            <Heading
              as="h2"
              size="lg"
              className="flex-1 whitespace-nowrap truncate"
            >
              {name}
            </Heading>
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
        </VStack>
      </Flex>
      <Separator />
    </Box>
  );
};

export default NamingDetail;
