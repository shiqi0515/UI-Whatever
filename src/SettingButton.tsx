import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import settingIcon from './icons/settings.png';
import './style/settingButton.css';
import closeIcon from './icons/close.png';

const SettingButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fadeOut, setFadeOut] = useState(false);
  const handleBackClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      window.history.back();
    }, 800);
  };
  const handleSelectLevel = () => {
    setFadeOut(true);
    setTimeout(() => {
      window.location.href = "/selectionLevels";
    }, 800);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="Setting_btn">
          <img src={settingIcon} alt="setting" />
      </Button>
      {show && <div className="backdrop" />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Setting</Modal.Title>
          <Button variant="link" onClick={handleClose} className="btn_close">
          <img src={closeIcon} alt="Close" /> 
          </Button>
        </Modal.Header>
        <Modal.Footer>
          <Button className="modal_btn" variant="primary" onClick={handleClose}>
            Game Continue
          </Button>
          <Button className="modal_btn" variant="primary" onClick={handleSelectLevel}>
            Select Level
          </Button>
          <Button className="modal_btn" variant="primary" onClick={handleBackClick}>
            Back to Main Menu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SettingButton;