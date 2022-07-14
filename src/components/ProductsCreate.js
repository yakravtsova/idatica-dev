import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";

const ProductsCreate = () => {

    return (
        <Container className="bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Новый товар</h1>
                <Button variant="btn-outline-primary" className="btn-outline-primary">Добавить из файла</Button>
            </div>

            <Form>

                <div className="d-flex align-items-center">
                    <Form.Control className="m-1" type="text" placeholder="Название *"></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваша цена"></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваш артикул"></Form.Control>

                    <Form.Select className="m-1">
                        <option defaultValue="selected">Группа *</option>
                        <option value="1">Коррозия Металла</option>
                        <option value="2">ВИА Песняры</option>
                        <option value="3">Комбинация</option>
                    </Form.Select>

                    <Form.Check className="m-1"></Form.Check>
                </div>

                <div className="d-flex align-items-center">
                    <Form.Control className="m-1" type="url" placeholder="Ссылка на товар"></Form.Control>

                    <Form.Select className="m-1">
                        <option defaultValue="selected">Регион *</option>
                        <option value="1">Санкт-Петербург и ЛО</option>
                        <option value="2">Москва</option>
                        <option value="3">ХМАО</option>
                    </Form.Select>

                    <Form.Control className="m-1" type="text" placeholder="Артикул"></Form.Control>
                </div>


                <Accordion className="m-1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Дополнительные поля</Accordion.Header>
                        <Accordion.Body>

                            <div className="d-flex align-items-center">
                                <Form.Control className="m-1" type="text" placeholder="Бренд"></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Закупочная цена"></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Категория"></Form.Control>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


                <div className="d-flex justify-content-center m-2 mb-3">
                    <Button variant="primary" type="submit">Сохранить</Button>
                </div>

            </Form>

        </Container>
    )
}

export default ProductsCreate;