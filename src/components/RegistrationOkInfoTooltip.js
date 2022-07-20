import Modal from 'react-bootstrap/Modal';

const RegistrationOkInfoTooltip = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Спасибо за регистрацию!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="bg-light">
          На вашу почту придёт письмо с подтверждением активации аккаунта.
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationOkInfoTooltip;