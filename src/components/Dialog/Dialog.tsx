import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './Dialog.css';
import close from '../../assets/close.svg';

type DialogProps = {
  children?: React.ReactNode;
  title?: string;
  onClose?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onProceed?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Dialog(props: DialogProps) {
  const { children, title = '', onClose, onProceed } = props;
  return (
    <Modal closedByOverlay={onClose}>
      <div className="DialogHeader">
        <div className="DialogTitle">{title}</div>
        <Button className="icon" onClick={onClose}>
          <img src={close} className="close" alt="close" />
        </Button>
      </div>
      <div className="DialogBody">{children}</div>
      <div className="DialogFooter">
        <Button className="primary DialogButton" onClick={onProceed}>
          Proceed
        </Button>
      </div>
    </Modal>
  );
}

export default Dialog;
