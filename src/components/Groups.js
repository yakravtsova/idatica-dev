import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DeletePopup from './DeletePopup';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import GroupTableRow from './GroupTableRow';
import SearchForm from './SearchForm';
import { useEffect } from 'react';


const Groups = ({
  groups,
  updaters,
  getGroups,
  redirectTo,
  handleCreateNewGroup,
  handleEditGroupPopupOpen,
  handleDeleteGroupPopupOpen,
  getUpdateGroup,
  handleChangeActivityGroup,
  handleIsDefaultGroup,
  isDeletePopupOpen,
  handleDeletePopupOpen,
  getUpdateProduct }) => {

    const [ form, setForm ] = useState({
        name: '',
        updater_id: '',
        is_default: true,
    });

    const [ groupsState, setGroupsState ] = useState([]);

    useEffect(() => {
      console.log(new Date().toJSON());
      setGroupsState(groups)
    }, [groups])

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }

    const setGroupName = (e) => {
        setField('name', e.target.value);
    }

    const setUpdater = (e) => {
        setField('updater_id', e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateNewGroup(form);
        setForm({
            name: '',
            updater_id: '',
            is_default: true,
        });
    }

    //фильтрация стейта по строке
  const filterGroupsByName = (searchStr) => {
  //  getGroups(state => state.filter(g => g.name.toLowerCase().includes(searchStr)));
    setGroupsState(state => state.filter(g => g.name.toLowerCase().includes(searchStr)));
  }


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">

                <h2>Группы товаров</h2>
                <SearchForm filterAction={filterGroupsByName} />
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="col-md-6">

                    <div className="d-flex align-items-center">
                        <Form.Control className="m-1" type="text" placeholder="Название *" value={form.name} onChange={setGroupName}></Form.Control>

                        <Form.Select className="m-1" onChange={setUpdater} value={form.updater_id}>
                            <option defaultValue="selected">Частота проверки *</option>
                            {updaters.map((u, i) => (
                              <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </Form.Select>

                        <Button variant="primary" type="submit">Создать</Button>
                    </div>
                </div>
            </Form>


            <div>&nbsp;</div>



            <Table responsive bordered size="sm" className="small mt-3">
                <thead>
                <tr className="align-middle">
                    <th>Название группы</th>
                    <th>Количество товаров</th>
                    <th>По умолчанию</th>
                    <th>Частота проверки</th>
                    <th>Активно</th>
                    <th>Добавить товары</th>
                    <th>Редактировать</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                    {groupsState.map((group, i) => (
                        <GroupTableRow
                            key={group.id}
                            group={group}
                            redirectTo={redirectTo}
                            handleEditGroupPopupOpen={handleEditGroupPopupOpen}
                            handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                            getUpdateGroup={getUpdateGroup}
                            getUpdateProduct={getUpdateProduct}
                            handleChangeActivityGroup={handleChangeActivityGroup}
                            handleIsDefaultGroup={handleIsDefaultGroup} />
                    ))}
                </tbody>
            </Table>
            <DeletePopup
                isOpen={isDeletePopupOpen}
                onClose={handleDeletePopupOpen}
                okButtonText="Удалить"
                cancelButtonText="Не удалять"
                bodyText="Группа удаляется со всеми товарами без возможности восстановления. Вы хотите удалить группу?"
            />

        </Container>
    )
}

export default Groups;