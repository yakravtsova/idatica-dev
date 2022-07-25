import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CompleteRegistration = ({ handleCompleteRegister }) => {
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ usernameError, setUsernameError ] = useState('');
  const [ phoneError, setPhoneError ] = useState('');
  const [ companyError, setCompanyError ] = useState('');
  const [ tariffIdError, setTariffIdError ] = useState('');

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

  const setUsername = (e) => {
    if (!e.target.validity.valid) {
      setUsernameError(e.target.validationMessage)
    }
    else {
      setUsernameError(null)
    }
    setField('username', e.target.value);
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

  const setCompany = (e) => {
    if (!e.target.validity.valid) {
      setCompanyError(e.target.validationMessage)
    }
    else {
      setCompanyError(null)
    }
    setField('company', e.target.value);
  }

  const setTariffId = (e) => {
    setField('tariffId', e.target.value);
  }

  const findFormErrors = () => {
    const { username, company, tariffId } = form;
    const newErrors = {};
    if (!username || username === '') newErrors.username = 'Введите имя'
    else if (usernameError) {newErrors.username = usernameError}
    if (phoneError) {newErrors.phone = phoneError}
    if (!company || company === '') newErrors.company = 'Введите название компании'
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
      handleCompleteRegister(form)
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
          <Form.Group className="mb-2" controlId="username">
            <Form.Control 
              type="text" 
              placeholder="Ваше имя *" 
              onChange={setUsername} 
              isInvalid={errors.username}
              required />
            <Form.Control.Feedback type="invalid">
              {errors.username}
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
          <Form.Group className="mb-2" controlId="company">
            <Form.Control 
              type="text" 
              placeholder="Компания *" 
              onChange={setCompany} 
              isInvalid={errors.company}
              required />
            <Form.Control.Feedback type="invalid">
              {errors.company}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Select  
              value={form.tariffId} 
              onChange={setTariffId} 
              isInvalid={errors.tariffId}
              required>
                <option value=''>Тариф *</option>
                <option value="1">Дёшево</option>
                <option value="2">Недорого</option>
                <option value="3">Дорого</option>
                <option value="4">Очень дорого</option>
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