import { useState, useEffect } from 'react';
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
import { CaretUpFill, CaretDownFill, ExclamationTriangleFill, PencilFill, TrashFill, ThreeDots, Plus } from 'react-bootstrap-icons';
import UrlTableRow from './UrlTableRow';

const Product = ({ productData, productDataForUpdate, view, checkProduct, handleDeleteUrlId, handleDeleteProductId, deleteLinkPopupOpen, deleteProductPopupOpen, createLinkPopupOpen, handleReportingProblemPopupOpen, getUpdateProduct, handleUpdateProduct, handleIndexOfProduct, handleUpdateLinkPopupOpen }) => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ productState, setProductState ] = useState(productData);

  useEffect(() => {
    setProductState(productData)
  }, [getUpdateProduct])

  const navigate = useNavigate();

  const handleMenuPopupOpen = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  const handleProductState = (newProductState) => {
    setProductState(newProductState);
  }

  const redirectToProductsCreate = () => {
    getUpdateProduct(productState);
    navigate("/create-product", {replace: false})
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

  ///////////
  const urlLabel = (url) => {
    if (!url.indexOf('https://')) {
      let newUrl = url.substring(8, url.indexOf('/', 8));
      return newUrl;
    }
    else if (!url.indexOf('http://')) {
      let newUrl = url.substring(7, url.indexOf('/', 7));
      return newUrl;
    }
    return url.substring(0, url.indexOf('/'))
  }

  const handleDeleteLinkPopupOpen = (index) => {
    handleIndexOfProduct(index);
    getUpdateProduct(productState);
    deleteLinkPopupOpen();
  }


  const handleCreateLinkPopupOpen = () => {
    getUpdateProduct(productState);
    createLinkPopupOpen();
  }

  const updateLinkPopupOpen = (index) => {
    getUpdateProduct(productState);
    handleIndexOfProduct(index);
    handleUpdateLinkPopupOpen();
  }

  const priceDifference = (i) => {
    const dif = (productState.basePrice-productState.productUrls[i].price)*100/productState.basePrice;
    return dif;
  }

  const dif = (i) => priceDifference(i).toFixed(2);
  const isCheaper = (i) => (dif(i) >= 0);

  /////////////////////







  return(
    <Card className="m-1">
      <Row className="d-flex">
        <Col xs="auto">
          <Form.Check type="checkbox" className="m-2" onClick={handleCheck} />
          <Card.Img alt="" className="rounded m-2" style={{width: '200px'}}/>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{productState.name}</Card.Title>
            <ListGroup variant="flush">
              {productState.category && <ListGroup.Item>
                Категория: {productState.category}
              </ListGroup.Item>}
              {productState.own_vendor_code &&
              <ListGroup.Item>
                Артикул: {productState.own_vendor_code}
              </ListGroup.Item>}
              {productState.brand &&
              <ListGroup.Item>
                Бренд: {productState.brand}
              </ListGroup.Item>}
              {productState.purchase_price &&
              <ListGroup.Item>
                Закупочная цена: {productState.purchase_price}&#8381;
              </ListGroup.Item>}
              {productState.group.name &&
              <ListGroup.Item>
                Группа: {productState.group.name}
              </ListGroup.Item>}
            </ListGroup>
          </Card.Body>
        </Col>
        <Col md={2} className="flex-column justify-content-center align-self-center" style={{fontSize: "20px"}}>
          <Card.Text>Цена:</Card.Text>
          <Card.Text>{productState.base_price}&#8381;</Card.Text>
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

          {/*  {productState.productUrls.map((url, i) => (
              <UrlTableRow
                key={url.id}
                basePrice={productState.basePrice}
                productUrl={url}
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen}
                handleEditLinkPopupOpen={handleEditLinkPopupOpen}
                deleteLinkPopupOpen={deleteLinkPopupOpen}
                handleDeleteUrlId={handleDeleteUrlId} />
          ))}*/}
          {Boolean(productState.product_urls.length) && productState.product_urls.map((url, i) => (
            <tr key={url.id}>
              <td><a href={url.url}>{urlLabel(url.url)}</a></td>
              <td>{url.price}</td>
              <td>{url?.discount}%</td>
              <td>{url?.in_stock ? "Да" : "Нет"}</td>
              <td>{url?.last_collected_at}</td>
              <td><span /*className={isCheaper(i) ? "text-danger" : "text-success"}*/>{/*(isCheaper(i)) ? <CaretDownFill /> : <CaretUpFill /> */} {url.price_diff}%</span></td>
              <td>{url.region ? url.region.name : url.custom_region}</td>
              <td>{url?.has_parsing_errors ? "Да" : "Нет"}</td>
              <td><Button size="sm" variant="light" onClick={handleReportingProblemPopupOpen}><ExclamationTriangleFill /></Button></td>
              <td style={{wordWrap: "normal"}}>{url.vendor_sku}</td>
              <td><Button size="sm" variant="light" onClick={() => updateLinkPopupOpen(url.id)}><PencilFill /></Button></td>
              <td><Button size="sm" variant="light" onClick={() => handleDeleteLinkPopupOpen(url.id)}><TrashFill /></Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
        <Button size="sm" variant="outline-secondary" onClick={handleCreateLinkPopupOpen} className="mb-1"><Plus /> Добавить ссылку</Button>
      </div>
    </Card>
  )
}

export default Product;