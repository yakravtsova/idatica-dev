import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const CreateLinkPopup = ({ isOpen, onClose, regions, createUrl }) => {

  const formControl = useFormWithValidation();
  const { url, custom_region } = formControl.errors;
  const [ firstFocused, setFirstFocused ] = useState({});

  useEffect(() => {
    formControl.setValues({
      region_id: regions[0]?.id,
      custom_region: ''
    })
  }, [isOpen])

  //выводит сообщения об ошибках при onBlur
  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  //закрыть попап
  const onPopupClose = () => {
    formControl.resetForm();
    setFirstFocused({});
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUrl(formControl.values);
    onPopupClose();
  }

  return (
    <Modal show={isOpen} onHide={onPopupClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить ссылку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="m-1 position-relative">
            <Form.Label className="m-0">Ссылка на товар <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="url"
              name="url"
              placeholder="Ссылка *"
              onBlur={showErrors}
              onChange={formControl.handleUrlChange}
              value={formControl?.values?.url || ''}
              isInvalid={firstFocused.url && url}
              autoComplete="off"
              required />
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.url && url}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="m-1">
              <Form.Label className="m-0">Регион</Form.Label>
              <Form.Select
                aria-label="Регион"
                name="region_id"
                onChange={formControl.handleRegionNameChange}
                value={formControl?.values?.region_id || ''}
              >
                {regions.map((region, i) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
                <option value=''>Другой регион</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="m-1 position-relative">
              <Form.Label className="m-0">Другой регион {!(formControl?.values?.region_id) && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                placeholder="Другой регион"
                name="custom_region"
                onBlur={showErrors}
                onChange={formControl.handleCustomRegionChange}
                value={formControl?.values?.custom_region || ''}
                disabled={!!formControl?.values?.region_id}
                isInvalid={firstFocused.custom_region && custom_region}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.custom_region && custom_region}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="m-1">
              <Form.Label className="m-0">Артикул</Form.Label>
              <Form.Control
                placeholder="Артикул"
                name="vendor_sku"
                onChange={formControl.handleChange}
                value={formControl.values.vendor_sku || ''}
                autoComplete="off"
              />
            </Form.Group>
          </div>
          <p className="align-self-start m-1" style={{fontSize: "12px"}}><span className="text-danger">*</span> &mdash; поле обязательно для заполнения</p>
          <div className="d-flex justify-content-end">
            <Button className="m-2" variant="secondary" type="submit" disabled={!formControl.isValid}>
              Да
            </Button>
            <Button className="m-2" variant="primary" onClick={onClose}>
              Нет
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateLinkPopup;