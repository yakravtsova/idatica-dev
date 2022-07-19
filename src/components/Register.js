import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  

 const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleAccept = () => {
    setIsAccepted(!isAccepted);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, confirmPassword, isAccepted);
  }

  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column">
        <Form.Group className="mb-2" controlId="registerEmail">
          <Form.Control type="email" placeholder="Почта *" onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerPassword">
          <Form.Control type="password" placeholder="Пароль *" onChange={handlePasswordChange} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerConfirmPassword">
          <Form.Control type="password" placeholder="Повторить пароль *" onChange={handleConfirmPasswordChange} />
        </Form.Group>
        <Form.Check type="checkbox" className="mb-5">
          <Form.Check.Input type="checkbox" onChange={handleAccept} />
          <Form.Check.Label>Согласен с <Link to="/rules" target="_blank" rel="noopener noreferrer">правилами использования сервиса</Link></Form.Check.Label>
        </Form.Check>
        <Button type="submit" className="align-self-center" onClick={handleSubmit}>Зарегистрироваться</Button>
      </Form>
    </Container>
  )
}

export default Register;