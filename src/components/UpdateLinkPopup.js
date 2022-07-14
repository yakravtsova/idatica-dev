import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UpdateLinkPopup = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton />
      <Form>
        <Form.Group className="m-3" controlId="exampleForm.urlInput">
          <Form.Control
            type="url"
            placeholder="Ссылка"
            autoFocus
          />
        </Form.Group>
      </Form>
      <Modal.Footer className="flex-nowrap">
      <Button variant="secondary" onClick={onClose}>
            Сохранить
          </Button>
          <Button variant="primary" onClick={onClose}>
            Отмена
          </Button>
          <Form.Select aria-label="Регион">
            <option>Регион*</option>
            <option value="1">Москва</option>
            <option value="2">Санкт-Петербург</option>
            <option value="3">Сызрань</option>
          </Form.Select>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateLinkPopup;