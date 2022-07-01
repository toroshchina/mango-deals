import React from 'react';
import Modal from '../Modal/Modal';
import './Alert.css';
import check from '../../assets/check.svg';

type AlertProps = {
  onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Alert(props: AlertProps) {
  return (
    <Modal closedByOverlay={props.onClose}>
      <div className="Alert">
        <div className="AlertIcon">
          <img src={check} className="check" alt="check" />
        </div>
        <div className="AlertMessage">
          Your deal was
          <br />
          submitted successfully!
        </div>
      </div>
    </Modal>
  );
}

export default Alert;
