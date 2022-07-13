import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { PersonCircle, Stack, Basket2Fill, PieChartFill } from 'react-bootstrap-icons';

const SideBar = () => {
  return(
    <Nav variant="pills" className="col-md-2 p-1 d-block bg-light">
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" aria-current="page" href="/profile"><PersonCircle /> Личный кабинет</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" href="/groups"><Stack /> Группы</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" href="/products"><Basket2Fill /> Мои товары</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" href="/reports"><PieChartFill /> Отчёты</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default SideBar;