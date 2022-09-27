import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const CompleteRegistration = ({ tariffs }) => {
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ nameError, setNameError ] = useState('');
  const [ phoneError, setPhoneError ] = useState('');
  const [ companyNameError, setCompanyNameError ] = useState('');
  const [ tariffIdError, setTariffIdError ] = useState('');

  const {finishReg} = useAuth();

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

  const setName = (e) => {
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage)
    }
    else {
      setNameError(null)
    }
    setField('name', e.target.value);
  }

  const setPhone = (e) => {
    if (!e.target.validity.valid) {
      setPhoneError(e.target.validationMessage)
    }
    else {
      setPhoneError(null)
    }
    setField('phone', e.target.value);
  }

  const setCompanyName = (e) => {
    if (!e.target.validity.valid) {
      setCompanyNameError(e.target.validationMessage)
    }
    else {
      setCompanyNameError(null)
    }
    setField('companyName', e.target.value);
  }

  const setTariffId = (e) => {
    setField('tariffId', e.target.value);
  }

  const findFormErrors = () => {
    const { name, companyName, tariffId } = form;
    const newErrors = {};
    if (!name || name === '') newErrors.name = 'Введите имя'
    else if (nameError) {newErrors.name = nameError}
    if (phoneError) {newErrors.phone = phoneError}
    if (!companyName || companyName === '') newErrors.companyName = 'Введите название компании'
    if (!tariffId || tariffId === '') newErrors.tariffId = 'Выберите тариф'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    }
    else {
      finishReg(form)
    }
  }

  return(
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <h1 className="fs-4 mt-5">
          Остался всего один шаг!
        </h1>
        <p className="fs-5 mb-5">
          Пожалуйста, добавьте необходимые регистрационные данные.
        </p>
        <Form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-2" controlId="name">
            <Form.Control
              type="text"
              placeholder="Ваше имя *"
              onChange={setName}
              isInvalid={errors.name}
              required />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="phone">
            <Form.Control
              type="phone"
              placeholder="Телефон"
              onChange={setPhone}
              isInvalid={errors.phone} />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="companyName">
            <Form.Control
              type="text"
              placeholder="Компания *"
              onChange={setCompanyName}
              isInvalid={errors.companyName}
              required />
            <Form.Control.Feedback type="invalid">
              {errors.companyName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Select
              value={form.tariffId}
              onChange={setTariffId}
              isInvalid={errors.tariffId}
              required>
                <option value=''>Тариф *</option>
                {tariffs.map((t, i) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tariffId}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="align-self-center">Завершить регистрацию</Button>
        </Form>
    </div>
  )
}

export default CompleteRegistration;