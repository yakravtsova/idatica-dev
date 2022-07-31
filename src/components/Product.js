import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Kyrt from '../images/kyrt.jpg';
import { CaretUpFill, ExclamationTriangleFill, PencilFill, TrashFill, ThreeDots, Plus } from 'react-bootstrap-icons';
import UrlTableRow from './UrlTableRow';

const Product = ({ productData, view, checkProduct, handleDeleteUrlId, handleDeleteProductId, deleteLinkPopupOpen, deleteProductPopupOpen, handleEditLinkPopupOpen, handleCreateLinkPopupOpen, handleReportingProblemPopupOpen, getUpdateProduct }) => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ productState, setProductState ] = useState(productData);
  const navigate = useNavigate();
  
  const handleMenuPopupOpen = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  const redirectToProductsCreate = () => {
    getUpdateProduct(productData);
    navigate("/products/create", {replace: false})
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
    checkProduct(isChecked, productState.id)
  }

  const handleDeleteProductPopupOpen = () => {
    handleDeleteProductId(productData.id);
    console.log(productData.id);
    deleteProductPopupOpen();
  }

  

  

  return(
    <Card className="m-1">
      <Row className="d-flex">
        <Col xs="auto">
          <Form.Check type="checkbox" className="m-2" onClick={handleCheck} />
          <Card.Img src={productState.productUrls[0].imgUrl ? productState.productUrls[0].imgUrl : Kyrt} alt="" className="rounded m-2" style={{width: '200px'}}/>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{productState.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Категория: {productState.categoryName}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Col>
        <Col md={2} className="flex-column justify-content-center align-self-center" style={{fontSize: "20px"}}>
          <Card.Text>Цена:</Card.Text>
          <Card.Text>{productState.basePrice}&#8381;</Card.Text>
        </Col>
        <Col xs="auto">
          <OverlayTrigger 
            rootClose 
            trigger="click" 
            placement="left"
            overlay={
              <Popover>
                <ButtonGroup vertical>
                  <Button variant="link" onClick={redirectToProductsCreate}><PencilFill /> Редактировать</Button>
                  <Button variant="link" onClick={handleDeleteProductPopupOpen}><TrashFill /> Удалить товар</Button>
                </ButtonGroup>
              </Popover>
            }>
          <Button size="xs" variant="light" onClick={handleMenuPopupOpen}><ThreeDots /></Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <div className={`p-1 ${!view && "d-none"}`}>
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
            {productState.productUrls.map((url, i) => (
              <UrlTableRow 
                key={url.id} 
                basePrice={productState.basePrice}
                productUrl={url} 
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen} 
                handleEditLinkPopupOpen={handleEditLinkPopupOpen} 
                deleteLinkPopupOpen={deleteLinkPopupOpen}
                handleDeleteUrlId={handleDeleteUrlId} />
            ))}
          </tbody>
        </Table>
        <Button size="sm" variant="outline-secondary" onClick={handleCreateLinkPopupOpen} className="mb-1"><Plus /> Добавить ссылку</Button>
      </div>
    </Card>
  )
}

export default Product;