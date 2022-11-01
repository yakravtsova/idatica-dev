import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { PencilFill } from 'react-bootstrap-icons';

const ProfileTableRow = ({ group, getUpdateGroup, onChangeButtonClick }) => {
  const [ groupState, setGroupState ] = useState(group);
  useEffect(() => {
    setGroupState(group)
  }, [getUpdateGroup])

  return(
    <tr>
      <td><Button variant="link">{groupState.name}</Button></td>
      <td>{groupState.updater.name}</td>
      <td>{groupState.updater.updater_type}</td>
      <td>{groupState.updater.update_time}</td>
      <td><Button size="sm" variant="light" onClick={onChangeButtonClick}><PencilFill/></Button></td>
    </tr>
  );
}

export default ProfileTableRow;