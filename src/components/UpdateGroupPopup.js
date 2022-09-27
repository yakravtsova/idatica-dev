import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UpdateGroupPopup = ({ isOpen, onClose, formData, handleUpdateGroup, updaters }) => {
  const [ form, setForm ] = useState({
    name: '',
    updater_id: ''
  //  updateFrequency: ''
});

  useEffect(() => {
    console.log(formData);
    if (formData.name) {
      setForm({
        ...form,
        'name': formData.name,
        'updater_id': formData.updater.id
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

const setUpdater = (e) => {
    setField('updater_id', e.target.value);
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
          <Form.Select  aria-label="Периодичность" value={form.updater_id} onChange={setUpdater}>
              <option>Периодичность</option>
              {updaters.map((u, i) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
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