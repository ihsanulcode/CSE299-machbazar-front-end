import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AllModal({ modalText, modalShow, setModalShow }) {
  const handleClose = () => setModalShow(false);
  return (
    <>
      <Modal show={modalShow} onHide={handleClose} centered>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllModal;
