import React from 'react';
import './Modal.css';

type ModalProps = {
  children?: React.ReactNode;
  closedByOverlay?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Modal(props: ModalProps) {
  const { children, closedByOverlay = () => {} } = props;
  return (
    <div className="Modal">
      <div className="ModalOverlay" onClick={closedByOverlay}></div>
      <div className="ModalCard">{children}</div>
    </div>
  );
}

export default Modal;
