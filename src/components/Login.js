import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import ResetPasswordPopup from './ResetPasswordPopup';

const Login = ({ handleAuthorization, handleReset }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  

 const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleAuthorization(email, password);
  }

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  }

  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="registerEmail">
          <Form.Control type="email" placeholder="Почта *" onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerPassword">
          <Form.Control type="password" placeholder="Пароль *" onChange={handlePasswordChange} />
        </Form.Group>
        <Button type="submit" className="align-self-center m-3">Войти</Button>
      </Form>
      <Button variant="link" onClick={handleForgotPassword}>забыл пароль</Button> 
      <ResetPasswordPopup isOpen={forgotPassword} onClose={handleForgotPassword} handleReset={handleReset} />
    </Container>
  )
}

export default Login;