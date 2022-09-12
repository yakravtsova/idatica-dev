import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import DeletePopup from './DeletePopup';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import GroupTableRow from './GroupTable Row';
//import { GroupsContext } from '../contexts/GroupsContext';


const Groups = ({ groups, updaters, redirectTo, handleCreateNewGroup, handleEditGroupPopupOpen, handleDeleteGroupPopupOpen, getUpdateGroup, handleUpdatingEnabledGroup, handleIsDefaultGroup, isDeletePopupOpen, handleDeletePopupOpen }) => {
    const navigate = useNavigate();
//    const groups = useContext(GroupsContext);
    const [ form, setForm ] = useState({
        name: '',
        updater_id: '',
        is_default: true,
    });

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


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">

                <h2>Группы товаров</h2>
                <Form className="d-flex flex-fill p-2 align-items-center">
                    <InputGroup className="m-1 mt-2 mb-3">
                        <Form.Control placeholder="Поиск"
                                      aria-label="Поиск"
                                      aria-describedby="button-addon2"/>
                        <Button variant="outline-secondary">Найти</Button>
                    </InputGroup>
                </Form>
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="col-md-6">

                    <div className="d-flex align-items-center">
                        <Form.Control className="m-1" type="text" placeholder="Название *" value={form.name} onChange={setGroupName}></Form.Control>

                        <Form.Select className="m-1" onChange={setUpdater} value={form.updater_id}>
                            <option defaultValue="selected">Частота проверки *</option>
                            {/*<option value="2">Раз в день</option>
                            <option value="3">Раз в неделю</option>
                            <option value="4">Раз в две недели</option>
                            <option value="5">Раз в три недели</option>
    <option value="6">Раз в месяц</option>*/}
                            {updaters.map((u, i) => (
                                <option key={u.id} value={u.id}>{u.updater_type}</option>
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
                    {groups.map((group, i) => (
                        <GroupTableRow 
                            key={group.id}
                            group={group} 
                            redirectTo={redirectTo} 
                            handleEditGroupPopupOpen={handleEditGroupPopupOpen} 
                            handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                            getUpdateGroup={getUpdateGroup}
                            handleUpdatingEnabledGroup={handleUpdatingEnabledGroup}
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