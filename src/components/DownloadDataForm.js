import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const DownloadDataForm = () => {
  return(
    <Form className="d-flex flex-column">
      <Form.Group className="mb-3">
        <Form.Label>Дата от:</Form.Label>
        <Form.Control type="date"></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Дата до:</Form.Label>
        <Form.Control type="date"></Form.Control>
      </Form.Group>
      <Button className="p-2">Скачать</Button>
    </Form>
  )
}

export default DownloadDataForm;