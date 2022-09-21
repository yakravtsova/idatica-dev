import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ConfirmEmail = ({ handleConfirmEmail }) => {
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

  const setConfirmCode = (e) => {
    setField('confirm_code', e.target.value);
  }
/*
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
  }*/

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmEmail(form);
  }


  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2" controlId="confirmEmail">
          <Form.Control
            type="text"
            placeholder="Код подтверждения *"
            onChange={setConfirmCode}
          /*  isInvalid={errors.email}*/
            required />
          <Form.Control.Feedback type="invalid">
            {/*errors.email*/}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="align-self-center">Отправить</Button>
      </Form>
    </Container>
  )
}

export default ConfirmEmail;