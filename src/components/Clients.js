import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import ClientsTableRow from "./ClientsTableRow";
// import * as clientsApi from '../utils/clientsApi';

const Clients = ({clients}) => {
  const [ clientsState, setClientsState ] = useState(clients);
//  const [ clients, setClients ] = useState([]);
 useEffect(() => {
  setClientsState(clients);
  console.log(clients);
}, [clients])

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
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => (
            <ClientsTableRow key={client.id} client={client} />
          ))}
        </tbody>
      </Table>
      <Button>Сохранить изменения</Button>
    </Container>
  )
}

export default Clients;