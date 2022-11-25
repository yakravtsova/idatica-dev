import { useState, useEffect } from 'react';
import { Button, Modal, Form, FormGroup } from 'react-bootstrap';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const UpdateGroupPopup = ({ isOpen, onClose, formData, handleUpdateGroup, updaters }) => {

const initData = formData.name ? { name: formData.name, updater_id: formData.updater.id } : '';
const formControl = useFormWithValidation();
const { name, updater_id } = formControl.errors;
const [ errors, setErrors ] = useState({});
const [ firstFocused, setFirstFocused ] = useState({});
const [ isChanged, setIsChanged ] = useState(false);

useEffect(() => {
  formControl.resetForm();
  formControl.setValues(initData);
  setErrors({});
}, [isOpen])

useEffect(() => {
  setIsChanged(!(initData.name === formControl.values.name && initData?.updater_id === Number(formControl.values?.updater_id)));
}, [formData, formControl.values.name, formControl.values.updater_id])


const showErrors = (e) => {
  const name = e.target.name;
  setErrors(formControl.errors);
  setFirstFocused({...firstFocused, [name]: true});
}

const handleSubmit = (e) => {
  e.preventDefault();
  handleUpdateGroup(formControl.values);
  onClose();
}


  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton />
      <Form className="p-2" onSubmit={handleSubmit}>
      <FormGroup className="m-1 position-relative">
              <Form.Control
                name="name"
                type="text"
                placeholder="Название *"
                value={formControl.values?.name || ''}
                onBlur={showErrors}
                onChange={formControl.handleChange}
                isInvalid={firstFocused.name ? name : errors.name}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.name ? name : errors.name}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className="m-1 position-relative">
              <Form.Select
                name="updater_id"
                onBlur={showErrors}
                onChange={formControl.handleChange}
                value={formControl.values?.updater_id || ''}
                isInvalid={firstFocused.updater_id ? updater_id : errors.updater_id}
                required
              >
                <option value=''>Частота проверки *</option>
                {updaters.map((u, i) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.updater_id ? updater_id : errors.updater_id}
              </Form.Control.Feedback>
            </FormGroup>
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