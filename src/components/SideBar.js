import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { PersonCircle, Stack, Basket2Fill, PieChartFill } from 'react-bootstrap-icons';

const SideBar = () => {
  return(
    <Nav variant="pills" className="col-md-2 p-1 d-block bg-light">
      <Nav.Item>
        <Nav.Link className="border nav-link m-2 bg-white" aria-current="page" href="#"><PersonCircle /> Личный кабинет</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2 bg-white" href="#"><Stack /> Группы</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2 bg-white" href="#"><Basket2Fill /> Мои товары</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2 bg-white" href="#"><PieChartFill /> Отчёты</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default SideBar;