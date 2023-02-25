import { useContext } from 'react';
import {Modal} from 'react-bootstrap';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const TariffInfoPopup = ({ isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentUser.tariff?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {currentUser.tariff?.description}
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default TariffInfoPopup;