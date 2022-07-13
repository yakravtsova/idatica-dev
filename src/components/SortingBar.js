import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ArrowDownUp } from 'react-bootstrap-icons';


const SortingBar = () => {
  return(
    <Container>
      <NavBar>
        <Nav>
          <Nav.Link href="#"><ArrowDownUp /> Название</Nav.Link>
          <Nav.Link href="#"><ArrowDownUp /> Разница %</Nav.Link>
          <Nav.Link href="#"><ArrowDownUp /> Цена</Nav.Link>
          <Nav.Link href="#"><ArrowDownUp /> Последняя проверка</Nav.Link>
          <Nav.Link href="#"><ArrowDownUp /> Активно</Nav.Link>
        </Nav>
      </NavBar>
    </Container>
  )
}

export default SortingBar;