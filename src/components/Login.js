import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import ResetPasswordPopup from './ResetPasswordPopup';
import { useAuth } from '../hooks/useAuth';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import './Login.css';

const Login = ({ handleReset }) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const { login } = useAuth();
  const formControl = useFormWithValidation();
  const { email, password } = formControl.errors;
  const [ firstFocused, setFirstFocused ] = useState({});

  //выводит сообщения об ошибках при onBlur
  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formControl.values);
  }

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  }

  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-4 position-relative" controlId="registerEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Почта *"
            onBlur={showErrors}
            onChange={formControl.handleEmailChange}
            value={formControl?.values?.email || ''}
            isInvalid={firstFocused.email && email}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.email && email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4 position-relative" controlId="registerPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль *"
            onChange={formControl.handleChange}
            value={formControl?.values?.password || ''}
            isInvalid={password}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="align-self-center m-3" disabled={!formControl.isValid}>Войти</Button>
      </Form>
      <Button variant="link" onClick={handleForgotPassword}>забыл пароль</Button>
      <ResetPasswordPopup isOpen={forgotPassword} onClose={handleForgotPassword} handleReset={handleReset} />
    </Container>
  )
}

export default Login;