import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeletePopup = ({ isOpen, onClose, title, okButtonText, cancelButtonText, bodyText, okButtonAction }) => {
  return (
    <Modal size="sm" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {bodyText && <Modal.Body>
        <p>
          {bodyText}
        </p>
      </Modal.Body>}
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="primary" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button variant="secondary" onClick={okButtonAction}>
          {okButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePopup;