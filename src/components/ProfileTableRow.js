import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const ProfileTableRow = ({ group, updaters, handleUpdateGroupUpdater }) => {
  const [ groupState, setGroupState ] = useState(group);
  const [ form, setForm ] = useState({});

  const setField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    setGroupState(group);
    setForm({
      updater_id: group.updater.id
    })
  }, [group])

  const handleChangeUpdater = (e) => {
    setField(e);
    if (e.target.value !== group.updater.id) {
      const form = {
        name: group.name,
        updater_id: e.target.value
      }
      handleUpdateGroupUpdater(group, form)
    }
  }

  return(
    <tr>
      <td>{groupState.name}</td>
      <td>
      <Form.Select className="mb-2" name="updater_id" value={form?.updater_id || ''} onChange={handleChangeUpdater} >
        {updaters.map((updater, i) => (
          <option key={updater.id} value={updater.id}>{updater.name}</option>
        ))}
      </Form.Select>
      </td>
    </tr>
  );
}

export default ProfileTableRow;