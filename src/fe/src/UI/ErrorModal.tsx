import React from "react";

import {
 
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface IErrorModalPros {
  isOpen: boolean;
  onModalClose: () => void;
  message: string;
}

function ErrorModal({ isOpen, onModalClose, message }: IErrorModalPros) {
  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ErrorModal;
