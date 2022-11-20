import {Modal} from 'react-bootstrap';

const RegistrationInfoTooltip = ({ isOpen, onClose, isOk, redirect }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isOk ? 'Спасибо за регистрацию!' : 'Что-то пошло не так!'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={isOk ? "bg-light" : "bg-danger bg-gradient"}>
        <p>
          {isOk ? 'На вашу почту придёт письмо с подтверждением активации аккаунта.' : 'Произошла ошибка! Проверьте свои регистрационные данные.'}
        </p>
        {/*isOk && <Button onClick={redirect}>Перейти ко второму шагу регистрации</Button>*/}
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationInfoTooltip;