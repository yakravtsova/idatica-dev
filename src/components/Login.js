import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import ResetPasswordPopup from './ResetPasswordPopup';

const Login = ({ handleAuthorization, handleReset }) => {
  const [ form, setForm ] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  const setEmail = (e) => {
    /*if (!isValidEmail(e.target.value)) {
      setEmailError('Адрес электронной почты содержит ошибку');
    } else {
      setEmailError(null);
    }*/
    setField('email', e.target.value);
  }

  const setPassword = (e) => {
   /* if (!e.target.validity.valid) {
      setPasswordError(e.target.validationMessage)
    }
    else setPasswordError(null)*/
    setField('password', e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return;
    }
    handleAuthorization(form);
  }

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  }

  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="registerEmail">
          <Form.Control
            type="email" 
            placeholder="Почта *" 
            onChange={setEmail} 
            // isInvalid={errors.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerPassword">
          <Form.Control
            type="password" 
            placeholder="Пароль *" 
            onChange={setPassword} 
            // isInvalid={errors.password}
            required
          />
        </Form.Group>
        <Button type="submit" className="align-self-center m-3">Войти</Button>
      </Form>
      <Button variant="link" onClick={handleForgotPassword}>забыл пароль</Button> 
      <ResetPasswordPopup isOpen={forgotPassword} onClose={handleForgotPassword} handleReset={handleReset} />
    </Container>
  )
}

export default Login;