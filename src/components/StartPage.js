import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const StartPage = ({ redirectTo }) => {

  const redirectToRegister = () => {
    redirectTo("/register");
  }

  const redirectToLogin = () => {
    redirectTo("/login");
  }

  return(
    <Container className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="fs-2 w-50 mb-5 text-center">Войдите или зарегистрируйтесь, чтобы&nbsp;начать пользоваться сервисом</h1>
      <div className="d-flex justify-content-center">
        <Button variant="primary" className="m-1" onClick={redirectToLogin}>Вход</Button>
        <Button variant="outline-primary" className="m-1" onClick={redirectToRegister}>Регистрация</Button>
      </div>
    </Container>
  )
}

export default StartPage;