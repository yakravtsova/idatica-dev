import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CompleteRegistration = ({ handleCompleteRegister }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [plan, setPlan] = useState('');
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }
  
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  }
  
  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCompleteRegister(username, phone, company, plan);
  }

  return(
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <h1 className="fs-4 mt-5">
          Остался всего один шаг!
        </h1>
        <p className="fs-5 mb-5">
          Пожалуйста, добавьте необходимые регистрационные данные.
        </p>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="username">
            <Form.Control type="text" placeholder="Ваше имя *" onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group className="mb-2" controlId="phone">
            <Form.Control type="phone" placeholder="Телефон" onChange={handlePhoneChange} />
          </Form.Group>
          <Form.Group className="mb-2" controlId="company">
            <Form.Control type="text" placeholder="Компания *" onChange={handleCompanyChange} />
          </Form.Group>
          <Form.Select className="mb-4" value={plan} onChange={handlePlanChange}>
            <option disabled value=''>Тариф *</option>
            <option value="1">Дёшево</option>
            <option value="2">Недорого</option>
            <option value="3">Дорого</option>
            <option value="4">Очень дорого</option>
          </Form.Select>
          <Button type="submit" className="align-self-center">Зарегистрироваться</Button>
        </Form>
    </div>
  )
}

export default CompleteRegistration;