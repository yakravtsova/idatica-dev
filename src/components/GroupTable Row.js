import { Form, Button } from "react-bootstrap";
import { Plus, PencilFill, TrashFill } from "react-bootstrap-icons";

const GroupTableRow = ({ group, redirectToProductsCreate, handleEditGroupPopupOpen, handleDeletePopupOpen }) => {
  const updateFrequency={
    1: "Раз в день",
    2: "Раз в неделю",
    3: "Раз в две недели",
    4: "Раз в три недели",
    5: "Раз в месяц"
  }

  return(
    <tr>
      <td><a href="#">{group.name}</a></td>
      <td>{group.count}</td>
      <td>
        <Form.Check
          checked={group.isDefault}
          type="radio"
          />
      </td>
      <td>{updateFrequency[group.updateFrequency]}</td>
      <td>
        <Form.Check
          checked={group.isUpdatingEnabled}
          type="switch"
          />
      </td>
      <td><Button size="sm" variant="light" onClick={redirectToProductsCreate}><Plus/></Button></td>
      <td><Button size="sm" variant="light" onClick={handleEditGroupPopupOpen}><PencilFill/></Button></td>
      <td><Button size="sm" variant="light" onClick={handleDeletePopupOpen}><TrashFill/></Button></td>
    </tr>
  )
}

export default GroupTableRow;