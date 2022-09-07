import Modal from 'react-bootstrap/Modal';

const RegistrationInfoTooltip = ({ isOpen, onClose, isOk }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isOk ? 'Спасибо за регистрацию!' : 'Что-то пошло не так!'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={isOk ? "bg-light" : "bg-danger bg-gradient"}>
        <p>
          {isOk ? 'На вашу почту придёт письмо с подтверждением активации аккаунта.' : 'Произошла ошибка! Проверьте свои регистрационные данные.'}
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationInfoTooltip;