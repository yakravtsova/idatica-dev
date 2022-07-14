import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeletePopup = ({ isOpen, onClose }) => {
  return (
    <Modal size="sm" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Да
        </Button>
        <Button variant="primary" onClick={onClose}>
          Нет
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePopup;