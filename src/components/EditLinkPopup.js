import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditLinkPopup = ({ isOpen, onClose, title, okButtonAction, urlForm, handleUrlForm }) => {
  const setField = (field, value) => {
    handleUrlForm({
      ...urlForm,
      [field]: value
    });
}

const setUrl = (e) => {
  setField('url', e.target.value);
  console.log(urlForm)
}

const setRegionName = (e) => {
  setField('regionName', e.target.value);
  console.log(urlForm)
}

const setVendorCode = (e) => {
  setField('vendorCode', e.target.value);
  console.log(urlForm)
}


  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={okButtonAction}>
          <Form.Group className="m-2">
            <Form.Control type="url" name="url" placeholder="Ссылка" onChange={setUrl} value={urlForm.url ? urlForm.url : ''} />
          </Form.Group>
          <div className="d-flex">
            <Form.Select className="m-2" aria-label="Регион" name="regionName" onChange={setRegionName} value={urlForm.regionName ? urlForm.regionName : ''}>
              <option>Регион</option>
              <option value="1">Санкт-Петербург</option>
              <option value="2">Москва</option>
              <option value="3">ХМАО</option>
            </Form.Select>
            <Form.Control className="m-2" placeholder="Артикул" name="vendorCode" onChange={setVendorCode} value={urlForm.vendorCode ? urlForm.vendorCode : ''} />
          </div>
          <div className="d-flex justify-content-end">
            <Button className="m-2" variant="secondary" type="submit">
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