import {Modal} from 'react-bootstrap';

const RegistrationInfoTooltip = ({ isOpen, onClose, isOk, errTitle, errMessage }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isOk ? 'Спасибо за регистрацию!' : errTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={isOk ? "bg-light" : "bg-danger bg-gradient"}>
        <p>
          {isOk ? 'На вашу почту придёт письмо с подтверждением активации аккаунта.' : errMessage}
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationInfoTooltip;