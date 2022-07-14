import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { PersonCircle, Stack, Basket2Fill, PieChartFill } from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

const SideBar = () => {
  return(
    <Nav variant="pills" className="col-md-2 p-1 d-block">
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" aria-current="profile" as={Link} to="/profile"><PersonCircle /> Личный кабинет</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" as={Link} to="/groups"><Stack /> Группы</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" as={Link} to="/products"><Basket2Fill /> Мои товары</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="border nav-link m-2" as={Link} to="/reports"><PieChartFill /> Отчёты</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default SideBar;