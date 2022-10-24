import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';

const ClientsTableRow = ({ client }) => {
  const [ clientState, setClientState ] = useState(client);

  return(
    <tr>
      <td><Button variant="link">{clientState.name}</Button></td>
      <td>{clientState.tariff?.name}</td>
      <td>{clientState?.tariff_expiration_date}</td>
      <td>
                <Form.Check
                  checked={clientState.tariff?.is_active}
                  type="switch"
                /></td>
      <td>{clientState.info?.payment_info}</td>
      <td>{clientState.info?.number}</td>
      <td><Button size="sm" variant="light"><PencilFill/></Button></td>
      <td><Button size="sm" variant="light"><TrashFill/></Button></td>
    </tr>
  );
}

export default ClientsTableRow;