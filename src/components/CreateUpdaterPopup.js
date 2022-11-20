import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CreateUpdaterPopup = ({ isOpen, onClose, updaters, handleCreateUpdater }) => {
  const [ form, setForm] = useState({});
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const DAILY_UPDATER = 'daily';
  const WEEKLY_UPDATER = 'weekly';
  const MONTHLY_UPDATER = 'monthly'

  useEffect(() => {
    setForm({
      updater_type: DAILY_UPDATER,
      weekdays: '',
      days: '',
      update_time: ''
    })
  }, [onClose])

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  const setType = (e) => {
    setField('updater_type', e.target.value);
    console.log(form)
  }

  const handleWeekDayChange = (val) => {
    setField('weekdays', val);
    console.log(form)
  }

  const handleMonthDayChange = (val) => {
    setField('days', val);
    console.log(form)
  }

  const handleTimeChange = (e) => {
    setField('update_time', e.target.value);
    console.log(form)
  }

  const weekdayButtons = () => {
    const buttons = [];
    for (let i=0; i<7; i++) {
      buttons.push(<ToggleButton key={i} id={`tbg-btn-${i}`} value={i + 1}>{weekdays[i]}</ToggleButton>)
    }
    return buttons;
  }

  const monthDayButtons = () => {
    const buttons = [];
    for (let i=0; i<31; i++) {
      buttons.push(<ToggleButton key={i} id={`btn-${i}`} value={i + 1} className="rounded-0" style={{"width": "51px", "maxWidth": "51px"}}>{i + 1}</ToggleButton>)
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
        <Form noValidate className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Form.Label>Выберите частоту проверки</Form.Label>
            <Form.Select  className="m-2" onChange={setType} value={form.updater_type ? form.updater_type : ''}>
              <option value={DAILY_UPDATER}>Каждый день</option>
              <option value={WEEKLY_UPDATER}>Еженедельно</option>
              <option value={MONTHLY_UPDATER}>Ежемесячно</option>
            </Form.Select>
            {(form.updater_type === WEEKLY_UPDATER) &&
              <Form.Label className="d-flex flex-column align-items-center justify-content-center">Выберите в какие дни недели делать проверку
                <ToggleButtonGroup type="checkbox" onChange={handleWeekDayChange}>
                  {weekdayButtons()}
                </ToggleButtonGroup>
              </Form.Label>}
            {(form.updater_type === MONTHLY_UPDATER) &&
              <Form.Label className="d-flex flex-column align-items-center justify-content-center">Выберите по каким числам делать проверку
                <ToggleButtonGroup type="checkbox" onChange={handleMonthDayChange} className="d-flex flex-wrap flex-start" style={{width: "357px"}}>
                  {monthDayButtons()}
                </ToggleButtonGroup>
              </Form.Label>}
            <Form.Label>Выберите время
              <Form.Control className="m-0" type="time" onChange={handleTimeChange} value={form?.update_time || ''} />
            </Form.Label>
            <Button variant="primary" type="submit">Создать</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateUpdaterPopup;