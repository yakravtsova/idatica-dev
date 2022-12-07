import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

const UpdateLinkPopup = ({ initData, regions, index, isOpen, onClose, getUpdateProduct, handleIndexOfProduct, updateUrl }) => {

  const formControl = useFormWithValidation();
  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});

  useEffect(() => {
    if (initData.name) {
      const url = initData.product_urls.find(item => item.id === index);
      formControl.setValues({
        url: url?.url,
        region_id: url?.region?.id || '',
        custom_region: url?.custom_region || '',
        vendor_sku: url?.vendor_sku || '',
        product_id: initData?.id
      })
    }

  }, [isOpen, index, initData])

const showErrors = (e) => {
  const name = e.target.name;
  setErrors(formControl.errors);
  setFirstFocused({...firstFocused, [name]: true});
}

const onPopupClose = () => {
  formControl.resetForm();
  setFirstFocused({});
  getUpdateProduct({});
  handleIndexOfProduct(null);
  onClose();
}

const handleSubmit = (e) => {
  e.preventDefault();
  updateUrl(formControl.values);
  console.log(formControl.values);
  onPopupClose();
}

  return (
    <Modal show={isOpen} onHide={onPopupClose}>
    <Modal.Header closeButton>
      <Modal.Title>Изменить ссылку</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate onSubmit={handleSubmit}>
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
            value={formControl?.values?.region_id || ''}
          >
            {regions.map((region, i) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
            <option value=''>Другой регион</option>
          </Form.Select>
          <Form.Group className="m-2 position-relative">
            <Form.Control
              placeholder="Другой регион"
              name="custom_region"
              onBlur={showErrors}
              onChange={formControl.handleCustomRegionChange}
              value={formControl?.values?.custom_region || ''}
              disabled={!!formControl?.values?.region_id}
              isInvalid={firstFocused.custom_region ? formControl.errors.custom_region : errors.custom_region} />
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.custom_region ? formControl.errors.custom_region : errors.custom_region}
            </Form.Control.Feedback>
          </Form.Group>
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
  </Modal>  )
}

export default UpdateLinkPopup;