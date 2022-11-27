import { useState, useEffect, useContext, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Form, Modal, Table, OverlayTrigger, Popover } from "react-bootstrap";
import { EnvelopeOpenFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProfileTableRow from './ProfileTableRow';
import CreateUpdaterPopup from './CreateUpdaterPopup';
import * as updatersApi from '../utils/updatersApi';
import SchedulesAvailable from './SchedulesAvailable';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PhoneInput from './PhoneInput';

const Profile = ({ handleUpdateProfile, onTariffInfoPopupOpen, groups, getUpdateGroup, updaters, handleUpdateGroupUpdater, getUpdaters }) => {
    const currentUser = useContext(CurrentUserContext);
    const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);
    const [isCreateUpdaterPopupOpen, setIsCreateUpdaterPopupOpen] = useState(false);
    const phoneRef = useRef();

    const formControl = useFormWithValidation();
    const { name, company_name } = formControl.errors;
    const [ errors, setErrors ] = useState({});
    const [ firstFocused, setFirstFocused ] = useState({});
    const [ isChanged, setIsChanged ] = useState(false);

    useEffect(() => {
      if (currentUser.name) {
        formControl.setValues({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          company_name: currentUser.company_name
        });
        console.log(currentUser)
      }
    },[currentUser, isProfileFormDisabled]);

    useEffect(() => {
      setIsChanged(!(currentUser.name === formControl.values.name && currentUser?.phone === formControl.values?.phone && currentUser?.company_name === formControl.values.company_name));
    }, [currentUser, formControl.values.name, formControl.values.phone, formControl.values.company_name])

    useEffect(() => {
      if (!isProfileFormDisabled) {
        phoneRef.current.removeAttribute('disabled');
      }
      else {
        phoneRef.current.setAttribute('disabled', '');
      }
    }, [isProfileFormDisabled])

    const showErrors = (e) => {
      const name = e.target.name;
      setErrors(formControl.errors);
      setFirstFocused({...firstFocused, [name]: true});
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      handleUpdateProfile({
        name: formControl.values.name,
        phone: phoneRef.current.value,
        company_name: formControl.values.company_name,
      });
      handleIsProfileFormDisabled();
    }

    const getDataString = () => {
      const date = new Date(Date.parse(currentUser.tariff_expiration_date));
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }

    const handleIsProfileFormDisabled = () => {
      setIsProfileFormDisabled(!isProfileFormDisabled);
      setFirstFocused({});
      setErrors({});
    }

    const handleCreateUpdaterPopupOpen = () => {
      setIsCreateUpdaterPopupOpen(!isCreateUpdaterPopupOpen);
    }

    const handleCreateUpdater = (data) => {
      updatersApi.createUpdater(data)
        .then(res => {
          const newUpdaters = [ ...updaters, res];
          getUpdaters(newUpdaters)
        })
        .catch(err => console.log(err))
    }

    const handleDeleteUpdater = (updaterId) => {
      updatersApi.deleteUpdater(updaterId)
        .then(res => {
          const newUpdaters = updaters.filter(u => u.id !== updaterId);
          getUpdaters(newUpdaters)
        }
        )
        .catch(err => console.log(err))
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
                      Напишите ваше<br />
                      <Link
                        to='#'
                        onClick={(e) => {
                        window.location.href = "mailto:manager@company.com";
                        e.preventDefault();
                        }}>
                      сообщение
                      </Link>
                    </p>
                  </Popover.Body>
                </Popover>
              }>
              <Button variant="link"><EnvelopeOpenFill /> Написать в поддержку</Button>
            </OverlayTrigger>
          </div>
          <span className="text-decoration-underline">Аккаунт активен до: {getDataString()}</span>
          <div>&nbsp;</div>
          <Form onSubmit={handleSubmit} noValidate>
            <div className="col-md-6">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                      name="name"
                      disabled={isProfileFormDisabled}
                      type="text"
                      placeholder="Введите имя"
                      onChange={formControl.handleChange}
                      value={formControl?.values.name || ''}
                      onBlur={showErrors}
                      isInvalid={firstFocused.name ? name : errors.name}
                      minLength={2}
                      maxLength={30}
                      required
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {firstFocused.name ? name : errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="email"
                      placeholder="Введите email"
                      readOnly
                      value={formControl?.values.email || ''}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group className="mb-3">
                    <Form.Label>Телефон</Form.Label>
                    <PhoneInput
                      onChange={formControl.handleChange}
                      value={formControl?.values.phone || ''}
                      ref={phoneRef}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Компания</Form.Label>
                    <Form.Control
                      disabled={isProfileFormDisabled}
                      type="text"
                      name="company_name"
                      placeholder="Введите название компании"
                      onChange={formControl.handleChange}
                      value={formControl?.values.company_name || ''}
                      onBlur={showErrors}
                      isInvalid={firstFocused.company_name ? company_name : errors.company_name}
                      minLength={2}
                      maxLength={30}
                      required
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {firstFocused.company_name ? company_name : errors.company_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </div>
            <Button variant="outline-primary" type="button" onClick={handleIsProfileFormDisabled}>Редактировать</Button>
            <Button disabled={isProfileFormDisabled || (!formControl.isValid || !isChanged)} variant="primary" type="submit" className="m-2 mt-0 mb-0">Сохранить</Button>
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
                <Form.Control size="sm" type="number" id="" defaultValue="0.5" />
              </div>
              <div className="col-auto">
                <span>%</span>
              </div>
            </div>
          </Form>
          <div>&nbsp;</div>
          <h5>Тариф</h5>
          <Button variant="link" onClick={onTariffInfoPopupOpen}>{currentUser.tariff?.name}</Button>
          <span className="m-5 mt-0 mb-0 text-muted">Осталось проверок: <u>100 312</u></span>
          <br />
          <OverlayTrigger
            rootClose
            trigger="click"
            placement="right"
            overlay={
              <Popover>
                <Popover.Body>
                  <p className='text-center'>
                    Для смены тарифа <br />отправьте
                    <Link
                      to='#'
                      onClick={(e) => {
                        window.location.href = "mailto:manager@company.com";
                        e.preventDefault();
                      }}
                    >запрос
                    </Link>
                  </p>
                </Popover.Body>
              </Popover>
            }>
            <Button variant="outline-primary" size="sm" className="mt-2">Сменить тариф</Button>
          </OverlayTrigger>
          <div>&nbsp;</div>
          <h5>Помощь</h5>
          <a href="#" onClick={() => setApiManualModalShow(true)} className="link-primary">Как настроить API</a>
          <div>&nbsp;</div>
          <h5>Расписание проверки цен</h5>
          <Table responsive bordered size="sm" className="small mt-3 w-50">
            <tbody>
              {groups.map((group, i) => (
                <ProfileTableRow
                  key={group.id}
                  group={group}
                  updaters={updaters}
                  handleUpdateGroupUpdater={handleUpdateGroupUpdater} />
              ))}
            </tbody>
          </Table>
          <SchedulesAvailable
            updaters={updaters}
            handleDeleteUpdater={handleDeleteUpdater}
            handleCreateUpdaterPopupOpen={handleCreateUpdaterPopupOpen}
            groups={groups}  />
        </Container>
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
        <CreateUpdaterPopup onClose={handleCreateUpdaterPopupOpen} isOpen={isCreateUpdaterPopupOpen} updaters={updaters} handleCreateUpdater={handleCreateUpdater} />
      </>
    )
}

export default Profile;