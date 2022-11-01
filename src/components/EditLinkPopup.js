import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditLinkPopup = ({ isOpen, onClose, regions, title, okButtonAction, urlForm, handleUrlForm }) => {
  useEffect(() => console.log(regions), [])
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
/*  setField('region_id', e.target.value);
  setRegionName('');*/
  console.log(urlForm)
}

const setVendorCode = (e) => {
  setField('vendor_sku', e.target.value);
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
            <Form.Select className="m-2" aria-label="Регион" name="region_id" onChange={setRegionName} value={urlForm.region_id ? urlForm.region_id : ''}>
              {regions.map((region, i) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
              <option value=''>Другой регион</option>
            </Form.Select>
            <Form.Control
              className="m-2"
              placeholder="Другой регион"
              name="custom_region"
              onChange={setCustomRegionName}
              value={urlForm.custom_region ? urlForm.custom_region : ''}
              disabled={!!(urlForm.region_id)} />
            <Form.Control className="m-2" placeholder="Артикул" name="vendor_sku" onChange={setVendorCode} value={urlForm.vendor_sku ? urlForm.vendor_sku : ''} />
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