import { useRef } from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PhoneInput from './PhoneInput';
import './CompleteRegistration.css';

const CompleteRegistration = ({ tariffs }) => {
  const formControl = useFormWithValidation();
  const { name, company_name, tariffId } = formControl.errors;
  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});
  const {finishReg} = useAuth();
  const phoneRef = useRef();

  const showErrors = (e) => {
    const name = e.target.name;
    setErrors(formControl.errors);
    setFirstFocused({...firstFocused, [name]: true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    finishReg(formControl.values);
    console.log(formControl.values);
  }

  return(
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <h1 className="fs-4 mt-5">
          Остался всего один шаг!
        </h1>
        <p className="fs-5 mb-5">
          Пожалуйста, добавьте необходимые регистрационные данные.
        </p>
        <Form className="d-flex flex-column form-width" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-2 position-relative">
            <Form.Control
              name="name"
              type="text"
              placeholder="Ваше имя *"
              onChange={formControl.handleChange}
              value={formControl?.values.name || ''}
              onBlur={showErrors}
              isInvalid={firstFocused.name ? name : errors.name}
              minLength={2}
              maxLength={30}
              required />
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.name ? name : errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2 position-relative">
              <PhoneInput
                onChange={formControl.handleChange}
                value={formControl?.values.phone || ''}
                ref={phoneRef}
              />
          </Form.Group>
          <Form.Group className="mb-2 position-relative">
              <Form.Control
                type="text"
                name="company_name"
                placeholder="Компания *"
                onChange={formControl.handleChange}
                value={formControl?.values.company_name || ''}
                onBlur={showErrors}
                isInvalid={firstFocused.company_name ? company_name : errors.company_name}
                minLength={2}
                maxLength={30}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.company_name ? company_name : errors.company_name}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5 position-relative">
            <Form.Select
              name="tariffId"
              onBlur={showErrors}
              onChange={formControl.handleChange}
              value={formControl.values?.tariffId || ''}
              isInvalid={firstFocused.tariffId ? tariffId : errors.tariffId}
              required>
                <option value=''>Тариф *</option>
                {tariffs.map((t, i) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.tariffId ? tariffId : errors.tariffId}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="align-self-center" disabled={!formControl.isValid}>Завершить регистрацию</Button>
        </Form>
    </div>
  )
}

export default CompleteRegistration;