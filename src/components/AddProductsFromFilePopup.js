import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddProductsFromFilePopup = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление товаров из файла</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group controlId="formFile" className="mb-3 w-100">
            <Form.Control type="file" />
          </Form.Group>
          <Button className="mb-3">Импорт</Button>
        </Form>
        <p className="bg-light">
          Подготовьте файл импорта <a href="#">на основе шаблона</a>. 
          Подробную информацию о подготовке файла массового импорта можно прочитать <a href="#">тут</a>.
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default AddProductsFromFilePopup;