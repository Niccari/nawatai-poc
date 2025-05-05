import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  requestDelete: () => void;
};

const DeletionModal = ({
  isOpen,
  onClose,
  requestDelete,
}: Props): React.ReactElement => (
  <>
    <DialogRoot
      lazyMount
      trapFocus={false}
      open={isOpen}
      onOpenChange={(p) => {
        if (!p.open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>削除しますか？</DialogHeader>
        <DialogBody>
          <PrimaryText>後から復元できません。よろしいですか？</PrimaryText>
        </DialogBody>
        <DialogFooter justifyContent="space-between">
          <Button onClick={onClose}>閉じる</Button>
          <Button
            colorScheme="red"
            variant="ghost"
            onClick={() => {
              requestDelete();
              onClose();
            }}
          >
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  </>
);
export default DeletionModal;
