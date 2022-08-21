import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from "react-bootstrap";
import { EnvelopeOpenFill, PencilFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Profile = ({ profile, handleUpdateProfile }) => {
    const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);
    const [profileState, setProfileState] = useState(profile);
    const [ form, setForm ] = useState({
        'name': '',
        'email': '',
        'phone': '',
        'companyName': ''
      });
    
    useEffect(() => {
        if (profileState.name) {
    
            setForm({
                ...form,
                'name': profileState.name,
                'email': profileState.email,
                'phone': profileState.phone,
                'companyName': profileState.companyName
              });
        }
    },[]);

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }

    const setName = (e) => {
        setField('name', e.target.value);
    }

    const setEmail = (e) => {
        setField('email', e.target.value);
    }

    const setPhone = (e) => {
        setField('phone', e.target.value);
    }

    const setCompanyName = (e) => {
        setField('companyName', e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProfile(form);
        handleIsProfileFormDisabled();
        setProfileState(profile);
        console.log(profileState);
    }

    const handleIsProfileFormDisabled = () => {
        setIsProfileFormDisabled(!isProfileFormDisabled);
    }

    const [tariffModalShow, setTariffModalShow] = useState(false);
    const [apiManualModalShow, setApiManualModalShow] = useState(false);



    return (
        <>
            <Container fluid className="bg-white">
                <div className="d-flex align-items-center justify-content-between">
                    <h2>Личный кабинет</h2>
                    <OverlayTrigger
                        rootClose
                        trigger="click"
                        placement="left"
                        overlay={
                            <Popover>
                                <Popover.Body>
                                    <p className='text-center'>
                                        Напишите ваше<br /> <Link
                                            to='#'
                                            onClick={(e) => {
                                                window.location.href = "mailto:manager@company.com";
                                                e.preventDefault();
                                            }}
                                        >
                                            сообщение
                                        </Link>
                                    </p>
                                </Popover.Body>
                            </Popover>
                        }>
                        <Button variant="link"><EnvelopeOpenFill /> Написать в поддержку</Button>
                    </OverlayTrigger>
                </div>

                <span className="text-decoration-underline">Аккаунт активен до: 20 сентября</span>

                <div>&nbsp;</div>

                <Form onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <div className="row row-cols-2">
                            <div className="col">

                                <Form.Group className="mb-3">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control 
                                        disabled={isProfileFormDisabled} 
                                        type="text" 
                                        placeholder="Введите имя" 
                                        onChange={setName}
                                        value={form.name ? form.name : ''}
                                    />
                                </Form.Group>


                            </div>
                            <div className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        disabled={isProfileFormDisabled}
                                        type="email"
                                        placeholder="Введите email"
                                        onChange={setEmail}
                                        value={form.email ? form.email : ''}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row row-cols-2">
                            <div className="col">

                                <Form.Group className="mb-3">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control 
                                        disabled={isProfileFormDisabled} 
                                        type="text"
                                        placeholder="Введите телефон" 
                                        onChange={setPhone}
                                        value={form.phone ? form.phone : ''}
                                    />
                                </Form.Group>


                            </div>
                            <div className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label>Компания</Form.Label>
                                    <Form.Control 
                                        disabled={isProfileFormDisabled} 
                                        type="text"
                                        placeholder="Введите название компании" 
                                        onChange={setCompanyName}
                                        value={form.companyName ? form.companyName : ''} 
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>

                    <Button variant="outline-primary" type="button"
                            onClick={handleIsProfileFormDisabled}>Редактировать</Button>
                        <Button disabled={isProfileFormDisabled}
                            variant="primary" type="submit" className="m-2 mt-0 mb-0">Сохранить</Button>

                </Form>

                <div>&nbsp;</div>


                <h5>Уведомления</h5>

                <Form>

                    <Form.Check
                        defaultChecked
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
                            <Form.Select size="sm" inline="true">
                                <option defaultValue="selected">Больше/меньше</option>
                                <option value="1">Больше</option>
                                <option value="2">Меньше</option>
                            </Form.Select>
                        </div>

                        <div className="col-auto">
                            <Form.Control size="sm"
                                type="number"
                                id=""
                                defaultValue="0.5"
                            />
                        </div>

                        <div className="col-auto">
                            <span>%</span>
                        </div>
                    </div>
                </Form>

                <div>&nbsp;</div>


                <h5>Тариф</h5>
                <a href="#" onClick={() => setTariffModalShow(true)} className="link-primary">Тарифный план №3</a> <span
                    className="m-5 mt-0 mb-0 text-muted">Осталось проверок: <u>100 312</u></span>
                <br />
                <Button variant="outline-primary" size="sm" className="mt-2">Сменить тариф</Button>


                <div>&nbsp;</div>


                <h5>Помощь</h5>
                <a href="#" onClick={() => setApiManualModalShow(true)} className="link-primary">Как настроить API</a>

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
                            <td><a className="link-dark" href="#"><PencilFill /></a></td>
                        </tr>
                        <tr>
                            <td><Link to="/groups/id">ВИА Песняры</Link></td>
                            <td>Раз в день</td>
                            <td>23:59</td>
                            <td><a className="link-dark" href="#"><PencilFill /></a></td>
                        </tr>
                        <tr>
                            <td><Link to="/groups/id">Комбинация</Link></td>
                            <td>Раз в неделю</td>
                            <td>14:00</td>
                            <td><a className="link-dark" href="#"><PencilFill /></a></td>
                        </tr>
                    </tbody>
                </Table>

            </Container>

            <Modal
                size="lg"
                show={tariffModalShow}
                onHide={() => setTariffModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Тарифный план №3
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Тари́ф (от араб. تعريف‎ — «определение») или та́кса (от нем. Тахе ← лат. taxare — «оценивать») —
                        ставка или система ставок оплаты (платёж) за различные производственные и непроизводственные
                        услуги, предоставляемые компаниями, организациями, фирмами и учреждениями. К категории тарифов
                        относят также системы ставок оплаты труда.
                    </p>

                    <p>
                        В русском языке слово «тариф» впервые встречается в Морском уставе 1724 года. Оно пришло через
                        нем. Tarif или фр. tarif из итал. tariffa от араб. ta'rîf‎ — объявление о пошлинных сборах,
                        сообщение, объявление, объявление, таблица.
                    </p>
                </Modal.Body>
            </Modal>


            <Modal
                size="lg"
                show={apiManualModalShow}
                onHide={() => setApiManualModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Как настроить API
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        API (МФА [ˌeɪ.piˈaɪ]; аббр. от англ. Application Programming Interface — «программный интерфейс
                        приложения»[1]) — описание способов (набор классов, процедур, функций, структур или констант),
                        которыми одна компьютерная программа может взаимодействовать с другой программой. Обычно входит
                        в описание какого-либо интернет-протокола (например, SCIM[2]), программного каркаса
                        (фреймворка)[3] или стандарта вызовов функций операционной системы[4]. Часто реализуется
                        отдельной программной библиотекой или сервисом операционной системы. Используется программистами
                        при написании всевозможных приложений.
                    </p>

                    <p>
                        Проще говоря, это набор компонентов, с помощью которых компьютерная программа (бот или же сайт)
                        может взаимодействовать с другой программой (API).
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Profile;