import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ReportingproblemPopup = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title className="mb-3">Сообщите об одной ссылке, мы проверим настройку на весь сайт:</Modal.Title>
        <Form>
          <Form.Check
            type="checkbox"
            label="Неверная цена"
            id="wrong-price"
          />
          <Form.Check
            type="checkbox"
            label="Неверное наличие"
            id="wrong-availability"
          />
          <Form.Group className="p-2">
            <Form.Label>Другое</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
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

export default ReportingproblemPopup;