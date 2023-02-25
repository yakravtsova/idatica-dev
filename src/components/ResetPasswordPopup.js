import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const ResetPasswordPopup = ({ isOpen, onClose, handleReset }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReset(email)
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <Form className="p-2 d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
          <Form.Group  className="mb-3 w-100">
            <Form.Control type="email" placeholder="Почта" onChange={handleEmailChange} />
          </Form.Group>
          <Button onClick={onClose} type="submit" className="mb-3">
            Сбросить пароль
          </Button>
        </Form>
        <p className="align-self-center text-center">
          Если вы не помните почту,<br/>
          <Link
            to='#'
            onClick={(e) => {
            window.location.href = "mailto:manager@company.com";
            e.preventDefault();
          }}
        >
          напишите нам
        </Link>
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default ResetPasswordPopup;