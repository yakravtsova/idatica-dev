import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
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

  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form>
        <Form.Group className="mb-2" controlId="registerEmail">
          <Form.Control type="email" placeholder="Почта *" onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerPassword">
          <Form.Control type="password" placeholder="Пароль *" onChange={handlePasswordChange} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerConfirmPassword">
          <Form.Control type="password" placeholder="Повторить пароль *" onChange={handleConfirmPasswordChange} />
        </Form.Group>
        <Form.Check type="checkbox" className="mb-5" onChange={handleAccept}>
          <Form.Check.Label>Согласен с <Link to="">правилами использования сервиса</Link></Form.Check.Label>
        </Form.Check>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </Container>
  )
}

export default Register;