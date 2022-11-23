import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const ConfirmEmail = () => {
  const {confirm} = useAuth();

  const formControl = useFormWithValidation();
  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});

  const showErrors = (e) => {
    const name = e.target.name;
    setErrors(formControl.errors);
    setFirstFocused({...firstFocused, [name]: true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    confirm(formControl.values);
  }


  return(
    <Container fluid className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="h6">Спасибо за регистрацию! На вашу почту пришло письмо с кодом подтверждения. Введите его в форму ниже.</h1>
      <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2 position-relative" controlId="confirmEmail">
          <Form.Control
            type="text"
            name="confirm_code"
            placeholder="Код подтверждения *"
            onBlur={showErrors}
            onChange={formControl.handleChange}
            minLength={8}
            maxLength={8}
            isInvalid={firstFocused.confirm_code ? formControl.errors.confirm_code : errors.confirm_code}
            required />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.confirm_code ? formControl.errors.confirm_code : errors.confirm_code}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="align-self-center" disabled={!formControl.isValid}>Отправить</Button>
      </Form>
    </Container>
  )
}

export default ConfirmEmail;