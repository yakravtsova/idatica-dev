import { Container, Button } from "react-bootstrap";

const ExpiredTariff = () => {
  return(
    <Container className="d-flex flex-column align-items-center">
      <h1 className="fs-2 w-50 mb-5 text-center">Период использования сервиса истёк, для продолжения пополните баланс</h1>
      <div className="d-flex justify-content-center">
        <Button variant="primary" className="m-1">Выйти</Button>
        <Button variant="outline-primary" className="m-1">Пополнить счёт</Button>
      </div>
    </Container>
  );
}

export default ExpiredTariff;