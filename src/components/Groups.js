import { useState } from 'react';
import { Container, Button, Form, Table, OverlayTrigger, Popover, FormGroup } from 'react-bootstrap';
import DeletePopup from './DeletePopup';
import GroupTableRow from './GroupTableRow';
import SearchForm from './SearchForm';
import { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { InfoCircle } from 'react-bootstrap-icons';


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
                  getUpdateProduct
                }) => {
  const formControl = useFormWithValidation();
  const [ groupsState, setGroupsState ] = useState([]);

  useEffect(() => {
    setGroupsState(groups)
  }, [groups, handleCreateNewGroup])

  const { name, updater_id } = formControl.errors;
  const [ errors, setErrors ] = useState({});
  const [ firstFocused, setFirstFocused ] = useState({});

  const showErrors = (e) => {
    const name = e.target.name;
    setErrors(formControl.errors);
    setFirstFocused({...firstFocused, [name]: true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {...formControl.values, is_default: true};
    handleCreateNewGroup(form);
    formControl.resetForm();
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
      <Form onSubmit={handleSubmit} noValidate>
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <FormGroup className="m-1 position-relative">
              <Form.Control
                name="name"
                type="text"
                placeholder="Название *"
                value={formControl.values?.name || ''}
                onBlur={showErrors}
                onChange={formControl.handleChange}
                isInvalid={firstFocused.name ? name : errors.name}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.name ? name : errors.name}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className="m-1 position-relative">
              <Form.Select
                name="updater_id"
                onBlur={showErrors}
                onChange={formControl.handleChange}
                value={formControl.values?.updater_id || ''}
                isInvalid={firstFocused.updater_id ? updater_id : errors.updater_id}
                required
              >
                <option value=''>Частота проверки *</option>
                {updaters.map((u, i) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>
                {firstFocused.updater_id ? updater_id : errors.updater_id}
              </Form.Control.Feedback>
            </FormGroup>
            <Button variant="primary" className="m-1" type="submit" disabled={!formControl.isValid}>Создать</Button>
            <OverlayTrigger
              placement="right"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Body>
                    Вы сможете настроить собственное расписание в личном кабинете
                  </Popover.Body>
                </Popover>
              }
            >
              <Button
                  variant="light"
                ><InfoCircle />
              </Button>
            </OverlayTrigger>
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