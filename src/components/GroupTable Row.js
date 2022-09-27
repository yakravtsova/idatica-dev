import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Plus, PencilFill, TrashFill } from "react-bootstrap-icons";

const GroupTableRow = ({ group, redirectTo, getUpdateGroup, handleActivateGroup, handleIsDefaultGroup, handleEditGroupPopupOpen, handleDeleteGroupPopupOpen }) => {
  const [groupState, setGroupState] = useState(group);
  const [isUpdatingAnabledState, setIsUpdatingAnabledState] = useState(group.isUpdatingAnabled);

  useEffect(() => {
    setGroupState(group)
  }, [getUpdateGroup])

  const updateFrequency={
    2: "Раз в день",
    3: "Раз в неделю",
    4: "Раз в две недели",
    5: "Раз в три недели",
    6: "Раз в месяц"
  }

  const handleUpdateFrequencyChange = () => {
    handleActivateGroup(groupState);
    setGroupState({
      ...groupState,
      is_active: !groupState.is_active
    });
  }

  const handleIsDefaultChange = () => {
    handleIsDefaultGroup(groupState);
  }

  const editGroupPopupOpen = () => {
    getUpdateGroup(groupState);
    handleEditGroupPopupOpen();
  }

  const handleCreateProduct = () => {
    getUpdateGroup(groupState);
    console.log(groupState);
    redirectTo('/create-product');
  }

  const deleteGroupPopupOpen = () => {
    getUpdateGroup(groupState);
    handleDeleteGroupPopupOpen();

  }

  const handleGroupProductsOutput = () => {
    getUpdateGroup(groupState);
    redirectTo('/products');
  }



  return(
    <tr>
      <td><Button variant="link" onClick={handleGroupProductsOutput}>{groupState.name}</Button></td>
      <td>{groupState.count}</td>
      <td>
        <Form.Check
          checked={groupState.is_default}
          type="radio"
          onChange={handleIsDefaultChange}
          />
      </td>
      <td>{updateFrequency[groupState.updater.id]}</td>
      <td>
        <Form.Check
          checked={groupState.is_active}
          type="switch"
          onChange={handleUpdateFrequencyChange}
          />
      </td>
      <td><Button className="text-center" size="sm" variant="light" onClick={handleCreateProduct}><Plus/></Button></td>
      <td><Button size="sm" variant="light" onClick={editGroupPopupOpen}><PencilFill/></Button></td>
      <td><Button size="sm" variant="light" onClick={deleteGroupPopupOpen}><TrashFill/></Button></td>
    </tr>
  )
}

export default GroupTableRow;