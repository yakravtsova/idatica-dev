import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import {EnvelopeOpenFill, PencilFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";

const Profile = () => {

    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Личный кабинет</h1>
                <Button variant="link"><EnvelopeOpenFill/> Написать в поддержку</Button>
            </div>

            <span className="text-decoration-underline">Аккаунт активен до: 20 сентября</span>

            <div>&nbsp;</div>

            <Form>
                <div className="col-md-6">
                    <div className="row row-cols-2">
                        <div className="col">

                            <Form.Group className="mb-3">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="text" placeholder="Введите имя" value="Валерий"/>
                            </Form.Group>


                        </div>
                        <div className="col">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Введите email" value="valeriy.myrza@idatica.com"/>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row row-cols-2">
                        <div className="col">

                            <Form.Group className="mb-3">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="text" placeholder="Введите телефон"/>
                            </Form.Group>


                        </div>
                        <div className="col">
                            <Form.Group className="mb-3">
                                <Form.Label>Компания</Form.Label>
                                <Form.Control type="text" placeholder="Введите название компании"/>
                            </Form.Group>
                        </div>
                    </div>
                </div>

                <div>

                    <Button variant="outline-primary asd" type="button">Редактировать</Button>
                    <Button variant="primary" type="submit" className="m-2 mt-0 mb-0">Сохранить</Button>
                </div>

            </Form>

            <div>&nbsp;</div>


            <h5>Уведомления</h5>

            <Form>

                <Form.Check
                    checked
                    type="switch"
                    id=""
                    label="Уведомление, если товар недоступен"
                />
                <Form.Check
                    type="switch"
                    id=""
                    label="Уведомление, если при парсинге товара произошла ошибка"
                />
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <Form.Check
                            type="switch"
                            id=""
                            label="Уведомление, если цена конкурента"
                        />
                    </div>

                    <div className="col-auto">
                        <Form.Select size="sm" inline>
                            <option defaultValue="selected">Больше/меньше</option>
                            <option value="1">Больше</option>
                            <option value="2">Меньше</option>
                        </Form.Select>
                    </div>

                    <div className="col-auto">
                        <Form.Control size="sm"
                                      type="number"
                                      id=""
                                      value="0.5"
                        />
                    </div>

                    <div className="col-auto">
                        <span>%</span>
                    </div>
                </div>
            </Form>

            <div>&nbsp;</div>


            <h5>Тариф</h5>
            <Link to="">Тарифный план №3</Link> <span className="m-5 mt-0 mb-0 text-muted">Осталось проверок: <u>100 312</u></span>
            <br />
            <Button variant="outline-primary" size="sm" className="mt-2">Сменить тариф</Button>


            <div>&nbsp;</div>


            <h5>Помощь</h5>
            <Link to="#">Как настроить API</Link>

            <div>&nbsp;</div>


            <h5>Расписание проверки цен</h5>

            <Table responsive bordered size="sm" className="small mt-3">
                <thead>
                <tr className="align-middle">
                    <th>Название группы</th>
                    <th>Частота проверки</th>
                    <th>Время начала</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td><Link to="/groups/id">Коррозия Металла</Link></td>
                    <td>Раз в день</td>
                    <td>00:00</td>
                    <td><a className="link-dark" href="#"><PencilFill/></a></td>
                </tr>
                <tr>
                    <td><Link to="/groups/id">ВИА Песняры</Link></td>
                    <td>Раз в день</td>
                    <td>23:59</td>
                    <td><a className="link-dark" href="#"><PencilFill/></a></td>
                </tr>
                <tr>
                    <td><Link to="/groups/id">Комбинация</Link></td>
                    <td>Раз в неделю</td>
                    <td>14:00</td>
                    <td><a className="link-dark" href="#"><PencilFill/></a></td>
                </tr>
                </tbody>
            </Table>

        </Container>
    )
}

export default Profile;