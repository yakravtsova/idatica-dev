import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const Clients = ({ clients }) => {
  return(
    <Container fluid className="bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <InputGroup className="m-1 mt-3 mb-3">
          <Form.Control placeholder="Поиск"
            aria-label="Поиск"
            aria-describedby="button-addon2"/>
            <Button variant="outline-secondary">Найти</Button>
        </InputGroup>
        <Button className="m-1 mt-3 mb-3">Добавить</Button>
      </div>
      <div className="d-flex align-items-center justify-content-between w-50">
        <Form.Group className="m-1 mt-3 mb-3">
          <Form.Check
            type="checkbox"
            label="Только активные"
          />
        </Form.Group>
        <Form.Group className="m-1 mt-3 mb-3">
          <Form.Check
            type="checkbox"
            label="Только неактивные"
          />
        </Form.Group>
      </div>
      <Table responsive bordered size="sm" className="small mt-3">
        <thead>
          <tr className="align-middle">
            <th>Название компании</th>
            <th>Тариф</th>
            <th>Дата окончания</th>
            <th>Активно</th>
            <th>Номер договора</th>
            <th>Платёжные реквизиты</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => (
            <tr key={client.id}>
              <td>{client.companyName}</td>
              <td>{client.tariffName}</td>
              <td>{client.tariffExpirationDate}</td>
              <td>
                <Form.Check
                  checked={client.isActive}
                  type="switch"
                /></td>
              <td>{client.contractNumber}</td>
              <td>{client.paymentDetails}</td>
              <td><Button size="sm" variant="light"><TrashFill /></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button>Сохранить изменения</Button>
    </Container>
  )
}

export default Clients;