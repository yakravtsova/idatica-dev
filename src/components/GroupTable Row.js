import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Plus, PencilFill, TrashFill } from "react-bootstrap-icons";

const GroupTableRow = ({ group, redirectToProductsCreate, getUpdateGroup, handleUpdatingEnabledGroup, handleIsDefaultGroup, handleEditGroupPopupOpen, handleDeleteGroupPopupOpen }) => {
  const [groupState, setGroupState] = useState(group);
  const [isUpdatingAnabledState, setIsUpdatingAnabledState] = useState(group.isUpdatingAnabled);

  useEffect(() => {
    setGroupState(group)
  }, [getUpdateGroup])
  
  const updateFrequency={
    1: "Раз в день",
    2: "Раз в неделю",
    3: "Раз в две недели",
    4: "Раз в три недели",
    5: "Раз в месяц"
  }

  const handleUpdateFrequencyChange = () => {
    handleUpdatingEnabledGroup(groupState);
    setGroupState({
      ...groupState,
      isUpdatingEnabled: !groupState.isUpdatingEnabled
    });
  }

  const handleIsDefaultChange = () => {
    handleIsDefaultGroup(groupState);
    setGroupState({
      ...groupState,
      isDefault: true
    });
  }

  const editGroupPopupOpen = () => {
    getUpdateGroup(groupState);
    handleEditGroupPopupOpen();
  }

  const handleCreateProduct = () => {
    getUpdateGroup(groupState);
    console.log(groupState);
    redirectToProductsCreate();
  }

  const deleteGroupPopupOpen = () => {
    getUpdateGroup(groupState);
    handleDeleteGroupPopupOpen();
    
  }



  return(
    <tr>
      <td><a href="#">{groupState.name}</a></td>
      <td>{groupState.count}</td>
      <td>
        <Form.Check
          checked={groupState.isDefault}
          type="radio"
          onChange={handleIsDefaultChange}
          />
      </td>
      <td>{updateFrequency[groupState.updateFrequency]}</td>
      <td>
        <Form.Check
          checked={groupState.isUpdatingEnabled}
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