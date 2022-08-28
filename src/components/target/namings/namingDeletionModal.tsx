import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PrimaryText } from "../../../element/text";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  requestDelete: () => void;
};

const NamingDeletionModal = ({
  isOpen,
  onClose,
  requestDelete,
}: Props): JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>削除しますか？</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PrimaryText>後から復元できません。よろしいですか？</PrimaryText>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NamingDeletionModal;
