import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateLinkPopup = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление ссылки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="m-2">
            <Form.Control type="url" placeholder="Ссылка" />
          </Form.Group>
          <div className="d-flex">
            <Form.Select className="m-2" aria-label="Регион">
              <option>Регион</option>
              <option value="1">Москва</option>
              <option value="2">Санкт-Петербург</option>
              <option value="3">Сызрань</option>
            </Form.Select>
            <Form.Control className="m-2" placeholder="Артикул" />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Да
        </Button>
        <Button variant="primary" onClick={onClose}>
          Нет
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateLinkPopup;