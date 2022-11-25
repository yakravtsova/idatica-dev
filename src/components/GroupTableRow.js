import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Plus, PencilFill, TrashFill } from "react-bootstrap-icons";
import { useNavigateSearch } from '../hooks/useNavigateSearch';

const GroupTableRow = ({ group, redirectTo, getUpdateGroup, getUpdateProduct, handleChangeActivityGroup, handleIsDefaultGroup, handleEditGroupPopupOpen, handleDeleteGroupPopupOpen }) => {
  const [groupState, setGroupState] = useState(group);
  const [isUpdatingAnabledState, setIsUpdatingAnabledState] = useState(group.isUpdatingAnabled);
  const navigateSearch = useNavigateSearch();

  useEffect(() => {
    setGroupState(group)
  }, [getUpdateGroup, group])

  const handleChangeActivity = () => {
    handleChangeActivityGroup(groupState);
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
    getUpdateProduct({});
    console.log(groupState);
    redirectTo('/create-product');
  }

  const deleteGroupPopupOpen = () => {
    getUpdateGroup(groupState);
    handleDeleteGroupPopupOpen();

  }

  const handleGroupProductsOutput = () => {
  //  getUpdateGroup(groupState);
  //  redirectTo('/products');
    navigateSearch('/products', { group_id: groupState.id })
  }



  return(
    <tr>
      <td><Button variant="link" onClick={handleGroupProductsOutput}>{groupState.name}</Button></td>
      <td>{groupState.num_products}</td>
      <td>
        <Form.Check
          checked={groupState.is_default}
          type="radio"
          onChange={handleIsDefaultChange}
          />
      </td>
      <td>{groupState.updater?.name}</td>
      <td>
        <Form.Check
          checked={groupState.is_active}
          type="switch"
          onChange={handleChangeActivity}
          />
      </td>
      <td><Button className="text-center" size="sm" variant="light" onClick={handleCreateProduct}><Plus/></Button></td>
      <td><Button size="sm" variant="light" onClick={editGroupPopupOpen}><PencilFill/></Button></td>
      <td><Button size="sm" variant="light" onClick={deleteGroupPopupOpen}><TrashFill/></Button></td>
    </tr>
  )
}

export default GroupTableRow;