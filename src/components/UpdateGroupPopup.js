import { useState, useEffect } from 'react';
import { Button, Modal, Form, FormGroup } from 'react-bootstrap';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const UpdateGroupPopup = ({ isOpen, onClose, formData, handleUpdateGroup, updaters }) => {

  const initData = formData.name ? { name: formData.name, updater_id: formData.updater.id } : '';
  const formControl = useFormWithValidation();
  const { name, updater_id } = formControl.errors;
  const [ firstFocused, setFirstFocused ] = useState({});
  const [ isChanged, setIsChanged ] = useState(false);

  useEffect(() => {
    formControl.resetForm();
    formControl.setValues(initData);
  }, [isOpen])

  useEffect(() => {
    setIsChanged(!(initData.name === formControl.values.name && initData?.updater_id === Number(formControl.values?.updater_id)));
  }, [formData, formControl.values.name, formControl.values.updater_id])

  //выводит сообщения об ошибках при onBlur
  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  //создать группу и закрыть попап
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateGroup(formControl.values);
    onClose();
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
      <Modal.Title>Редактировать группу</Modal.Title>
      </Modal.Header>
      <Form className="p-2" onSubmit={handleSubmit}>
        <FormGroup className="m-2 position-relative">
          <Form.Label className="m-0">Название группы <span className="text-danger">*</span></Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Название *"
            value={formControl.values?.name || ''}
            onBlur={showErrors}
            onChange={formControl.handleChange}
            isInvalid={firstFocused.name && name}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.name && name}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup className="m-2 position-relative">
          <Form.Label className="m-0">Частота проверки <span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="updater_id"
            onBlur={showErrors}
            onChange={formControl.handleChange}
            value={formControl.values?.updater_id || ''}
            isInvalid={firstFocused.updater_id && updater_id}
            required
          >
            <option value=''>Частота проверки *</option>
              {updaters.map((u, i) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid" tooltip>
            {firstFocused.updater_id && updater_id}
          </Form.Control.Feedback>
        </FormGroup>
        <p className="align-self-start m-2" style={{fontSize: "12px"}}><span className="text-danger">*</span> &mdash; поле обязательно для заполнения</p>
        <Button variant="secondary" className="m-2" type="submit" disabled={!formControl.isValid || !isChanged}>
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