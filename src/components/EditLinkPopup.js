import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditLinkPopup = ({ isOpen, onClose, regions, title, okButtonAction, formControl, handleUrlForm }) => {

/*  const setField = (field, value) => {
    handleUrlForm({
      ...urlForm,
      [field]: value
    });
}

const setUrl = (e) => {
  setField('url', e.target.value);
  console.log(urlForm)
}

const setCustomRegionName = (e) => {
  setField('custom_region', e?.target?.value);
  console.log(urlForm)
}

const setRegionName = (e) => {
  handleUrlForm({
    ...urlForm,
    region_id: e.target.value,
    custom_region: ''
  });
  console.log(urlForm)
}

const setVendorCode = (e) => {
  setField('vendor_sku', e.target.value);
  console.log(urlForm)
}*/

  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});

  const showErrors = (e) => {
    const name = e.target.name;
    setErrors(formControl.errors);
    setFirstFocused({...firstFocused, [name]: true});
  }


  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={okButtonAction}>
          <Form.Group className="m-2 position-relative">
            <Form.Control
              type="url"
              name="url"
              placeholder="Ссылка *"
              onBlur={showErrors}
              onChange={formControl.handleUrlChange}
              value={formControl?.values?.url || ''}
              isInvalid={firstFocused.url ? formControl.errors.url : errors.url}
              required />
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.url ? formControl.errors.url : errors.url}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex">
            <Form.Select
              className="m-2"
              aria-label="Регион"
              name="region_id"
              onChange={formControl.handleRegionNameChange}
              value={formControl?.values?.region_id || ''}>
              {regions.map((region, i) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
              <option value=''>Другой регион</option>
            </Form.Select>
            <Form.Control
              className="m-2"
              placeholder="Другой регион"
              name="custom_region"
              onBlur={showErrors}
              onChange={formControl.handleChange}
              value={formControl?.values?.custom_region || ''}
              disabled={!!(formControl?.values?.region_id)}
              isInvalid={firstFocused?.custom_region ? formControl?.custom_region : errors?.custom_region}
              required={!formControl?.values?.region_id} />
            <Form.Control
              className="m-2"
              placeholder="Артикул"
              name="vendor_sku"
              onChange={formControl.handleChange}
              value={formControl.values.vendor_sku || ''} />
          </div>
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

export default EditLinkPopup;