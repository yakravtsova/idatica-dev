import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const StartPage = () => {
  return(
    <Container className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Войдите или зарегистрируйтесь, чтобы начать пользоваться сервисом</h1>
      <Container className="d-flex justify-content-center">
        <Button variant="primary" className="">Вход</Button>
        <Button variant="outline-primary">Регистрация</Button>
      </Container>
    </Container>
  )
}

export default StartPage;