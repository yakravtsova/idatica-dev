import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';
import { useAuth } from '../hooks/useAuth';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const Register = () => {
  const { reg } = useAuth();
  const formControl = useFormWithValidation();
  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});

  const showErrors = (e) => {
    const name = e.target.name;
    setErrors({...errors, [name]: formControl.errors.name });
    setFirstFocused({...firstFocused, [name]: true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    reg(formControl.values);
  }


  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2 position-relative" controlId="registerEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Почта *"
            onBlur={showErrors}
            onChange={formControl.handleEmailChange}
            value={formControl?.values?.email || ''}
            isInvalid={firstFocused.email ? formControl.errors.email : errors.email}
            required />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.email ? formControl.errors.email : errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2 position-relative" controlId="registerPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль *"
            onBlur={showErrors}
            onChange={formControl.handlePasswordChange}
            value={formControl?.values?.password || ''}
            minLength={8}
            maxLength={30}
            isInvalid={firstFocused.password ? formControl.errors.password : errors.password}
            required />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.password ? formControl.errors.password : errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2 position-relative" controlId="registerConfirmPassword">
          <Form.Control
            type="password"
            name="confirm_password"
            placeholder="Повторить пароль *"
            onBlur={showErrors}
            onChange={formControl.handleConfirmPasswordChange}
            value={formControl?.values?.confirm_password || ''}
            isInvalid={firstFocused.confirm_password ? formControl.errors.confirm_password : errors.confirm_password}
            required />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.confirm_password ? formControl.errors.confirm_password : errors.confirm_password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Check className="mb-5 position-relative">
            <Form.Check.Input
              required
              type="checkbox"
              name="accept"
              onBlur={showErrors}
              onChange={formControl.handleChange}
              isInvalid={formControl.errors.accept}
            />
            <Form.Check.Label>Согласен с <Link to="/rules" target="_blank" rel="noopener noreferrer">правилами использования сервиса</Link></Form.Check.Label>
            <Form.Control.Feedback type="invalid"  tooltip>
              {formControl.errors.accept}
            </Form.Control.Feedback>
          </Form.Check>
        <Button type="submit" className="align-self-center" disabled={!formControl.isValid}>Зарегистрироваться</Button>
      </Form>
    </Container>
  )
}

export default Register;