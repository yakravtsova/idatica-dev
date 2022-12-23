import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToggleButtonGroup, ToggleButton, FormGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CreateUpdaterPopup = ({ isOpen, onClose, handleCreateUpdater }) => {
  const [ form, setForm] = useState({});
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const DAILY_UPDATER = 'daily';
  const WEEKLY_UPDATER = 'weekly';
  const MONTHLY_UPDATER = 'monthly';
  const [ formErrors, setFormErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);
  const [ firstFocused, setFirstFocused ] = useState({});
  const formElement = document.querySelector('.form-updater');

  useEffect(() => {
    setForm({
      updater_type: DAILY_UPDATER,
      weekdays: '',
      days: '',
      update_time: ''
    });
    setFormErrors({
      weekdays: '',
      days: '',
      update_time: 'Задайте время проверки'
    });
    setFirstFocused({});
    setIsValid(false)
  }, [onClose])

  //функция возвращает true, если в аргументе есть непустые поля
  const hasErrors = (object) => {
    let has = false;
    for (let key in object) {
      has = has || object[key]
    }
    return Boolean(has);
  }

  //задаёт полю field значение value
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  //выводит сообщения об ошибках при onBlur
  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  //время проверки
  const setTime = (e) => {
    const target = e.target;
    const name = target.name;
    const errState = {...formErrors, [name]: target.validationMessage };
    setField(e.target.name, e.target.value);
    setFormErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  //тип апдейтера
  const setType = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const errState = value === DAILY_UPDATER ? {...formErrors, weekdays: '', days: '' } : {...formErrors, weekdays: 'Выберите дни для проверки', days: 'Выберите дни для проверки' };
    setField(name, value);
    setFormErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  //выбрать дни недели для проверки
  const handleWeekDayChange = (val) => {
    setField('weekdays', val);
    let errState;
    if (!val.length && form.updater_type === WEEKLY_UPDATER) {
      errState = {...formErrors, weekdays: 'Выберите дни для проверки', days: ''};
    }
    else {
      errState = {...formErrors, weekdays: '', days: ''};
    }
    setFormErrors(errState);
    setIsValid(formElement.checkValidity() && !hasErrors(errState));
  }

  //выбрать дни месяца для проверки
  const handleMonthDayChange = (val) => {
    setField('days', val);
    let errState;
    if (!val.length && form.updater_type === MONTHLY_UPDATER) {
      errState = {...formErrors, weekdays: '', days: 'Выберите дни для проверки'};
    }
    else {
      errState = {...formErrors, weekdays: '', days: ''};
    }
    setFormErrors(errState);
    setIsValid(formElement.checkValidity() && !hasErrors(errState));
  }

  //кнопки дней недели
  const weekdayButtons = () => {
    const buttons = [];
    for (let i=0; i<7; i++) {
      buttons.push(<ToggleButton key={i} id={`tbg-btn-${i}`} variant="outline-primary" value={i + 1}>{weekdays[i]}</ToggleButton>)
    }
    return buttons;
  }

  //кнопки дней месяца
  const monthDayButtons = () => {
    const buttons = [];
    for (let i=0; i<31; i++) {
      buttons.push(<ToggleButton key={i} id={`btn-${i}`} variant="outline-primary" value={i + 1} className="rounded-0" style={{"width": "51px", "maxWidth": "51px"}}>{i + 1}</ToggleButton>)
    }
    return buttons;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUpdater(form);
    onClose();
  }

  return(
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate className="d-flex flex-column align-items-center form-updater" onSubmit={handleSubmit}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Form.Label className="m-1">Выберите частоту проверки</Form.Label>
              <Form.Select
                className="mb-3"
                name="updater_type"
                onChange={setType}
                value={form?.updater_type || ''}
                >
                  <option value={DAILY_UPDATER}>Каждый день</option>
                  <option value={WEEKLY_UPDATER}>Еженедельно</option>
                  <option value={MONTHLY_UPDATER}>Ежемесячно</option>
              </Form.Select>
            {(form.updater_type === WEEKLY_UPDATER) &&
              <>
              <Form.Label className="d-flex flex-column align-items-center justify-content-center m-1">Выберите в какие дни недели делать проверку</Form.Label>
                <ToggleButtonGroup className="mb-3" type="checkbox" onChange={handleWeekDayChange}>
                  {weekdayButtons()}
                </ToggleButtonGroup>
              </>}
            {(form.updater_type === MONTHLY_UPDATER) &&
              <Form.Label className="d-flex flex-column align-items-center justify-content-center">Выберите по каким числам делать проверку
                <ToggleButtonGroup type="checkbox" onChange={handleMonthDayChange} className="d-flex flex-wrap flex-start" style={{width: "357px"}}>
                  {monthDayButtons()}
                </ToggleButtonGroup>
              </Form.Label>}
            <FormGroup className="position-relative mb-3">
             <Form.Label className="m-1">Выберите время</Form.Label>
                <Form.Control
                  className="m-0"
                  type="time"
                  name="update_time"
                  onBlur={showErrors}
                  onChange={setTime}
                  value={form?.update_time || ''}
                  isInvalid={firstFocused.update_time && formErrors.update_time}
                  required />
              <Form.Control.Feedback type="invalid" tooltip>
                {formErrors.update_time}
              </Form.Control.Feedback>
            </FormGroup>
            <Button variant="primary" type="submit" disabled={!isValid}>Создать</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateUpdaterPopup;