import React, { useState } from "react";

import { FlexColumn } from "./Flex";
import "./Modal.scss";

export type ModalProps = {};

export type showModalFunc = (content: JSX.Element) => void;
export type closeModalFunc = () => void;
export const useModal = (): [
  showModalFunc,
  closeModalFunc,
  (props: ModalProps) => JSX.Element
] => {
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const showModal = (content: JSX.Element) => {
    setModalContent(content);
  };
  const closeModal = () => {
    setModalContent(undefined);
  };

  const Modal = (props: ModalProps) => {
    if (!modalContent) {
      return <></>;
    }
    return (
      <div className="modal-overlay">
        <FlexColumn className="modal-container">{modalContent}</FlexColumn>
      </div>
    );
  };
  return [showModal, closeModal, Modal];
};

export default useModal;
