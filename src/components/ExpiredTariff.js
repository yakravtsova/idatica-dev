import { Container, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const ExpiredTariff = () => {
  const { logout } = useAuth();

  return(
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="fs-2 w-50 mb-5 text-center">Период использования сервиса истёк, для продолжения пополните баланс</h1>
      <div className="d-flex justify-content-center">
        <Button variant="primary" className="m-1" onClick={logout}>Выйти</Button>
        <OverlayTrigger
          rootClose
          trigger="click"
          placement="right"
          overlay={
            <Popover>
              <Popover.Body>
                <div className="d-flex flex-column align-items-center">
                  <Link
                    to='#'
                    onClick={(e) => {
                      window.location.href = "mailto:manager@company.com";
                      e.preventDefault();
                    }}
                  >
                    Написать менеджеру
                  </Link>
                  <Link
                    to='#'
                    onClick={(e) => {
                      window.location.href = "tel:+99999999999";
                      e.preventDefault();
                    }}
                  >
                    Позвонить
                  </Link>
                </div>
              </Popover.Body>
            </Popover>
          }>
          <Button variant="outline-primary" className="m-1">Пополнить счёт</Button>
        </OverlayTrigger>
      </div>
    </Container>
  );
}

export default ExpiredTariff;