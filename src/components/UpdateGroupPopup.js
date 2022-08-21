import { useState, useEffect } from 'react'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UpdateGroupPopup = ({ isOpen, onClose, formData, handleUpdateGroup }) => {
  const [ form, setForm ] = useState({
    name: '',
    updateFrequency: ''
});

  useEffect(() => {
    
    if (formData.name) {
      setForm({
        ...form,
        'name': formData.name,
        'updateFrequency': formData.updateFrequency,
      })
    }
  }, [isOpen]);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  const setGroupName = (e) => {
    setField('name', e.target.value);
}

const setFrequency = (e) => {
    setField('updateFrequency', e.target.value);
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(form);
  handleUpdateGroup(form);
  onClose();
}


  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton />
      <Form className="p-2" onSubmit={handleSubmit}>
        <Form.Group className="m-2" controlId="exampleForm.textInput">
          <Form.Control
            type="text"
            placeholder="Название группы"
            value={form.name}
            onChange={setGroupName}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Select  aria-label="Периодичность" value={form.updateFrequency} onChange={setFrequency}>
              <option>Периодичность</option>
              <option value="1">Раз в день</option>
              <option value="2">Раз в неделю</option>
              <option value="3">Раз в две недели</option>
              <option value="4">Раз в три недели</option>
              <option value="5">Раз в месяц</option>
          </Form.Select>
        </Form.Group>
          <Button variant="secondary" className="m-2" type="submit">
            Сохранить
          </Button>
          <Button variant="primary" onClick={onClose}>
            Отмена
          </Button>
      </Form>
    </Modal>
  )
}

export default UpdateGroupPopup;