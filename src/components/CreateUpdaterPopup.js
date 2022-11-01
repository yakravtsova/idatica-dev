import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToggleButtonGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';
import WeekdayButton from './WeekdayButton';
import { useState } from 'react';

const CreateUpdaterPopup = ({ isOpen, onClose, updaters }) => {
  const [ form, setForm] = useState({
    updater_type: '1',
    weekdays: '',
    days: '',
    update_time: ''
  });

  const [ isNewUpdater, setIsNewUpdater ] = useState(false);

  const [weekDays, setWeekDays] = useState([]);
  const [monthDays, setMonthDays] = useState([]);
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
/*
  const weekdayButtons = () => {
    const buttons = [];
    for (let i=0; i<7; i++) {
      buttons.push(<WeekdayButton key={i} day={i} />);
    }
    return (<ToggleButtonGroup type="checkbox" onChange={handleChange}>{buttons}</ToggleButtonGroup>);
  }*/

  const handleNewUpdater = () => {
    setIsNewUpdater(!isNewUpdater);
  }

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
    setWeekDays(val);
    console.log(weekDays)
  }

  const handleMonthDayChange = (val) => {
    setMonthDays(val);
    console.log(monthDays)
  }

  return(
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate className="d-flex flex-column align-items-center">
          <Form.Group className="m-2">
            <Form.Label>Выберите расписание проверки</Form.Label>
            <Form.Select>
              {updaters.map((u, i) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={handleNewUpdater}>Или создайте новое</Button>
          {isNewUpdater && <div className="d-flex flex-column align-items-center justify-content-center">
            <Form.Label>Выберите частоту проверки</Form.Label>
            <Form.Select  className="m-2" onChange={setType} value={form.updater_type ? form.updater_type : ''}>
              <option value="1">Каждый день</option>
              <option value="2">Еженедельно</option>
              <option value="3">Ежемесячно</option>
            </Form.Select>
            {(form.updater_type === '2') &&
              <Form.Label className="d-flex flex-column align-items-center justify-content-center">Выберите в какие дни недели делать проверку
              <ToggleButtonGroup type="checkbox" onChange={handleWeekDayChange}>
              {weekdays.map((day, i) => (
                <ToggleButton key={i} id={`tbg-btn-${i}`} value={i}>{day}</ToggleButton>
              ))}
            </ToggleButtonGroup>
            </Form.Label>}
            {(form.updater_type === '3') &&
            <Form.Label className="d-flex flex-column align-items-center justify-content-center">Выберите по каким числам делать проверку
            <ToggleButtonGroup type="checkbox" onChange={handleMonthDayChange} className="d-flex flex-wrap" style={{width: "280px"}}>
                <ToggleButton  id="btn-0" value={0} className="rounded-0" style={{"min-width": "40px"}}>1</ToggleButton>
                <ToggleButton  id="btn-1" value={1} style={{"min-width": "40px"}}>2</ToggleButton>
                <ToggleButton  id="btn-2" value={2} style={{"min-width": "40px"}}>3</ToggleButton>
                <ToggleButton  id="btn-3" value={3} style={{"min-width": "40px"}}>4</ToggleButton>
                <ToggleButton  id="btn-4" value={4} style={{"min-width": "40px"}}>5</ToggleButton>
                <ToggleButton  id="btn-5" value={5} style={{"min-width": "40px"}}>6</ToggleButton>
                <ToggleButton  id="btn-6" value={6} style={{"min-width": "40px"}}>7</ToggleButton>

                <ToggleButton  id="btn-7" value={7} style={{"min-width": "40px"}}>8</ToggleButton>
                <ToggleButton  id="btn-8" value={8} style={{"min-width": "40px"}}>9</ToggleButton>
                <ToggleButton  id="btn-9" value={9} style={{"min-width": "40px"}}>10</ToggleButton>
                <ToggleButton  id="btn-10" value={10}>11</ToggleButton>
                <ToggleButton  id="btn-11" value={11}>12</ToggleButton>
                <ToggleButton  id="btn-12" value={12}>13</ToggleButton>
                <ToggleButton  id="btn-13" value={13}>14</ToggleButton>

                <ToggleButton  id="btn-14" value={14}>15</ToggleButton>
                <ToggleButton  id="btn-15" value={15}>16</ToggleButton>
                <ToggleButton  id="btn-16" value={16}>17</ToggleButton>
                <ToggleButton  id="btn-17" value={17}>18</ToggleButton>
                <ToggleButton  id="btn-18" value={18}>19</ToggleButton>
                <ToggleButton  id="btn-19" value={19}>20</ToggleButton>
                <ToggleButton  id="btn-20" value={20}>21</ToggleButton>

                <ToggleButton  id="btn-21" value={21}>22</ToggleButton>
                <ToggleButton  id="btn-22" value={22}>23</ToggleButton>
                <ToggleButton  id="btn-23" value={23}>24</ToggleButton>
                <ToggleButton  id="btn-24" value={24}>25</ToggleButton>
                <ToggleButton  id="btn-25" value={25}>26</ToggleButton>
                <ToggleButton  id="btn-26" value={26}>27</ToggleButton>
                <ToggleButton  id="btn-27" value={27}>28</ToggleButton>

                <ToggleButton  id="btn-28" value={28}>29</ToggleButton>
                <ToggleButton  id="btn-29" value={29}>30</ToggleButton>
                <ToggleButton  id="btn-30" value={30} className="rounded-0">31</ToggleButton>
            </ToggleButtonGroup>
            </Form.Label>}
            <Form.Label>Выберите время
                <Form.Control className="m-0" type="time" />
              </Form.Label>
            <Button variant="primary" onClick={onClose}>Создать</Button>
          </div>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateUpdaterPopup;