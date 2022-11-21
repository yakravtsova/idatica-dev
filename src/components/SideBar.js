import {useContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { PersonCircle, Stack, Basket2Fill, PieChartFill } from 'react-bootstrap-icons';
import {Link} from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const SideBar = ({ active }) => {
  const { logout } = useAuth();
  const currentUser = useContext(CurrentUserContext);

  return(
    <Container className="col-md-2 p-1">
      <Nav variant="pills" className="p-1 d-block">
        {currentUser.is_superuser && <Nav.Item>
          <Nav.Link className="border nav-link m-2" aria-current="clients" as={Link} to="/clients"><PersonCircle /> Клиенты</Nav.Link>
        </Nav.Item>}
        {!currentUser.is_superuser &&
        <>
          <Nav.Item>
            <Nav.Link className="border nav-link m-2" aria-current="profile" as={Link} to="/profile" disabled={!active}><PersonCircle /> Личный кабинет</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="border nav-link m-2" as={Link} to="/groups" disabled={!active}><Stack /> Группы</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="border nav-link m-2" as={Link} to="/products" disabled={!active}><Basket2Fill /> Мои товары</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="border nav-link m-2" as={Link} to="/reports" disabled={!active}><PieChartFill /> Отчёты</Nav.Link>
          </Nav.Item>
        </>}
      </Nav>
      <Button className="m-3" onClick={logout}>Выйти</Button>
    </Container>
  )
}

export default SideBar;