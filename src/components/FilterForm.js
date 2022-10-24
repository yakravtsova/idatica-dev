import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FilterForm = ({ groups, regions, filter, unFilter }) => {
  const [ filterForm, setFilterForm ] = useState({
    active: '',
    competitor: '',
    region_id: '',
    group_id: '',
    category: '',
    min_price: '',
    max_price: ''
  });

  const setField = (field, value) => {
    setFilterForm({
      ...filterForm,
      [field]: value
    });
  }


  const setRegionId = (e) => {
    setField('region_id', e.target.value);
  }

  const setGroupId = (e) => {
    setField('group_id', e.target.value);
  }

  const setMinPrice = (e) => {
    setField('min_price', e.target.value);
  }

  const setMaxPrice = (e) => {
    setField('max_price', e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    filter(filterForm);
  }

  const handleUnfilter = () => {
    setFilterForm({
      active: '',
      competitor: '',
      region_id: '',
      group_id: '',
      category: '',
      min_price: '',
      max_price: ''
    });
    unFilter();
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Select className="mb-2">
        <option value=''>Активные/неактивные</option>
        <option value="1">Активные</option>
        <option value="2">Неактивные</option>
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Конкурент</option>
        <option value="1">lavka.yandex.ru</option>
        <option value="2">vprok.ru</option>
        <option value="2">5ka.ru</option>
      </Form.Select>
      <Form.Select className="mb-2" onChange={setRegionId} value={filterForm.region_id ? filterForm.region_id : ''} >
        <option value=''>Регион</option>
        {regions.map((region, i) => (
          <option key={region.id} value={region.id}>{region.name}</option>
        ))}
      </Form.Select>
      <Form.Select className="mb-2" onChange={setGroupId} value={filterForm.group_id ? filterForm.group_id : ''}>
        <option value=''>Группа</option>
        {groups.map((group, i) => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Категория</option>
        <option value="1">Продукты</option>
      </Form.Select>
      <div className="d-flex">
        <Form.Group className="p-2">
          <Form.Label>Цена от</Form.Label>
          <Form.Control name="min_price" onChange={setMinPrice} />
        </Form.Group>
        <Form.Group className="p-2">
          <Form.Label>до</Form.Label>
          <Form.Control name="max_price" onChange={setMaxPrice} />
        </Form.Group>
      </div>
      <Form.Check
        type="checkbox"
        label="Нет в наличии"
        id="not-available"
      />
      <Form.Check
        type="checkbox"
        label="Нет своей цены"
        id="no-price"
      />
      <Form.Check
        type="checkbox"
        label="У конкурента дешевле"
        id="cheaper"
      />
      <Form.Check
        type="checkbox"
        label="Ошибка парсинга"
        id="parsing-error"
      />
      <div className="d-flex justify-content-center">
        <Button className="m-2" type="submit">Принять</Button>
        <Button variant="outline-primary" className="m-2" onClick={handleUnfilter}>Очистить</Button>
      </div>
    </Form>
  )
}

export default FilterForm;