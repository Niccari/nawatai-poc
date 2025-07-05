import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
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
}: Props): JSX.Element => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>削除しますか？</DialogTitle>
          <DialogDescription>
            <PrimaryText>後から復元できません。よろしいですか？</PrimaryText>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-between">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              requestDelete();
              onClose();
            }}
          >
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeletionModal;
