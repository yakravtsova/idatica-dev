import { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Kyrt from '../images/kyrt.jpg';
import { CaretDownFill, CaretUpFill, ExclamationTriangleFill, PencilFill, TrashFill, ThreeDots, Plus } from 'react-bootstrap-icons';

const Product = ({ view, isDeletePopupOpen, handleDeletePopupOpen }) => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const menuRef = useRef();
  const handleMenuPopupOpen = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        handleMenuPopupOpen();
        console.log(menuRef.current)
      }
    }
    const closeByClick = (evt) => {
      console.log(evt.target);
      if (menuRef.current && !menuRef.current.contains(evt.target)) {
        handleMenuPopupOpen();
        
      }
    }
    if (isMenuPopupOpen) {
      document.addEventListener('keydown', closeByEscape);
 //     document.addEventListener('click', closeByClick);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
  //      document.removeEventListener('click', closeByClick);
      }
    }

    }, [isMenuPopupOpen]
  )
  return(
    <Card className="m-1">
      <Row className="d-flex">
        <Col xs="auto">
          <Card.Img src={Kyrt} alt="" className="rounded m-2" style={{width: '200px'}}/>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>Құрт 350 гр</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Категория: Мясные продукты
              </ListGroup.Item>
              <ListGroup.Item>
                Категория: Мясные продукты
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Col>
        <Col md={2} className="flex-column justify-content-center align-self-center" style={{fontSize: "20px"}}>
          <Card.Text>Цена:</Card.Text>
          <Card.Text>31000&#8381;</Card.Text>
        </Col>
        <Col xs="auto" className="position-relative">
          <Button size="xs" variant="light" onClick={handleMenuPopupOpen}><ThreeDots /></Button>
          <ButtonGroup ref={menuRef} vertical className={`position-absolute ${!isMenuPopupOpen && "d-none"}`} style={{right: "10px", width: "160px"}}>
            <Button><PencilFill /> Редактировать</Button>
            <Button><TrashFill /> Удалить товар</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Container className={`p-1 ${!view && "d-none"}`}>
        <Table responsive bordered size="sm" className="small mt-3">
          <thead>
            <tr className="align-middle">
              <th>Конкурент</th>
              <th>Цена</th>
              <th>Скидка</th>
              <th>Наличие</th>
              <th>Последняя проверка</th>
              <th>Разница %</th>
              <th>Регион</th>
              <th>Ошибки парсинга</th>
              <th>Сообщить о проблеме</th>
              <th>Артикул</th>
              <th>Изменить ссылку</th>
              <th>Удалить</th>
            </tr>
          </thead>
         <tbody>
            <tr>
              <td><a href="#">lavka.yandex.ru</a></td>
              <td>300</td>
              <td>20%</td>
              <td>Да</td>
              <td>30 мая 12:34</td>
              <td><span class="text-danger"><CaretDownFill /> 3.3%</span></td>
              <td>Москва</td>
              <td>Нет</td>
              <td><a class="link-dark" href="#"><ExclamationTriangleFill /></a></td>
              <td style={{wordWrap: "normal"}}>4896-7352-14</td>
              <td><a class="link-dark" href="#"><PencilFill /></a></td>
              <td><a class="link-dark" href="#"><TrashFill /></a></td>
            </tr>

            <tr>
              <td><a href="#">vprok.ru</a></td>
              <td>410</td>
              <td></td>
              <td>Да</td>
              <td>30 мая 12:32</td>
              <td><span class="text-success"><CaretUpFill /> 36.6%</span></td>
              <td>Москва</td>
              <td>Нет</td>
              <td><a class="link-dark" href="#"><ExclamationTriangleFill /></a></td>
              <td>A451-259</td>
              <td><a class="link-dark" href="#"><PencilFill /></a></td>
              <td><a class="link-dark" href="#"><TrashFill /></a></td>
            </tr>
          </tbody>
        </Table>
        <Button variant="outline-secondary"><Plus /> Добавить ссылку</Button>
      </Container>
    </Card>
  )
}

export default Product;