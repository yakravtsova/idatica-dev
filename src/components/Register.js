import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = ({ handleRegister }) => {
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
    if ( errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const setEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError('Адрес электронной почты содержит ошибку');
    } else {
      setEmailError(null);
    }
    setField('email', e.target.value);
  }

  const setPassword = (e) => {
    if (!e.target.validity.valid) {
      setPasswordError(e.target.validationMessage)
    }
    else setPasswordError(null)
    setField('password', e.target.value);
  }

  const setConfirmPassword = (e) => {
    setField('confirmPassword', e.target.value);
  }

  const handleAccept = (e) => {
    setField('accepted', e.target.value);
  }

  const findFormErrors = () => {
    const { email, password, confirmPassword, accepted } = form;
    const newErrors = {};
    if (!email || email === '') newErrors.email = 'Введите адрес электронной почты'
    else if (emailError) {newErrors.email = emailError}
    if (!password || password === '') newErrors.password = 'Введите пароль'
    else if (passwordError) {newErrors.password = passwordError}
    if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = 'Введите пароль ещё раз'
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Пароли не совпадают'
    if (!accepted) newErrors.accepted = 'Чтобы зарегистрироваться, примите правила использования сервиса!'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    }
    else {
      handleRegister(form)
    }
  }

    
  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2" controlId="registerEmail">
          <Form.Control 
            type="email" 
            placeholder="Почта *" 
            onChange={setEmail} 
            isInvalid={errors.email}
            required />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerPassword">
          <Form.Control 
            type="password" 
            placeholder="Пароль *" 
            onChange={setPassword} 
            minLength={5}
            isInvalid={errors.password}
            required />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="registerConfirmPassword">
          <Form.Control 
            type="password" 
            placeholder="Повторить пароль *" 
            onChange={setConfirmPassword} 
            isInvalid={errors.confirmPassword}
            required />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Check className="mb-5">
            <Form.Check.Input 
              required
              type="checkbox" 
              onChange={handleAccept}
              isInvalid={errors.accepted}
            />
            <Form.Check.Label>Согласен с <Link to="/rules" target="_blank" rel="noopener noreferrer">правилами использования сервиса</Link></Form.Check.Label>
            <Form.Control.Feedback type="invalid">{errors.accepted}</Form.Control.Feedback>
          </Form.Check>
        <Button type="submit" className="align-self-center">Зарегистрироваться</Button>
      </Form>
    </Container>
  )
}

export default Register;