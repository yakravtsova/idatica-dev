import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UpdateGroupPopup = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton />
      <Form className="p-2" >
        <Form.Group className="mb-3" controlId="exampleForm.textInput">
          <Form.Control
            type="text"
            placeholder="Название"
            autoFocus
          />
        </Form.Group>
        <Form.Select className="mb-3"  aria-label="Периодичность">
            <option>Периодичность</option>
            <option value="1">Раз в день</option>
            <option value="2">Раз в неделю</option>
            <option value="3">Раз в две недели</option>
            <option value="4">Раз в три недели</option>
            <option value="5">Раз в месяц</option>
          </Form.Select>
      </Form>
      <Modal.Footer className="flex-nowrap">
      <Button variant="secondary" onClick={onClose}>
            Сохранить
          </Button>
          <Button variant="primary" onClick={onClose}>
            Отмена
          </Button>
          
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateGroupPopup;