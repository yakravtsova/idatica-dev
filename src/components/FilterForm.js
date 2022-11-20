import { useForm } from '../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigateSearch } from '../hooks/useNavigateSearch';

const FilterForm = ({ groups, regions, categories, setSearchParams, params }) => {
  const formControl = useForm(params);
  const navigateSearch = useNavigateSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = formControl.values;
    setSearchParams({...params, page: 1});
  }

  const handleUnfilter = () => {
    navigateSearch('/products', {});
    formControl.resetForm();
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Select className="mb-2" name="is_active" onChange={formControl.handleChange} value={formControl?.values?.is_active || ''} >
        <option value=''>Активные/неактивные</option>
        <option value="1">Активные</option>
        <option value="2">Неактивные</option>
      </Form.Select>
      <Form.Select className="mb-2" name="store_id" onChange={formControl.handleChange} value={formControl?.values?.store_id || ''} >
        <option>Конкурент</option>
        <option value="1">lavka.yandex.ru</option>
        <option value="2">vprok.ru</option>
        <option value="2">5ka.ru</option>
      </Form.Select>
      <Form.Select className="mb-2" name="region_id"  onChange={formControl.handleChange} value={formControl?.values?.region_id || ''} >
        <option value=''>Регион</option>
        {regions.map((region, i) => (
          <option key={region.id} value={region.id}>{region.name}</option>
        ))}
      </Form.Select>
      <Form.Select className="mb-2" name="group_id" onChange={formControl.handleChange} value={formControl?.values?.group_id || ''}>
        <option value=''>Группа</option>
        {groups.map((group, i) => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </Form.Select>
      <Form.Select className="mb-2" name="category_id" onChange={formControl.handleChange}  value={formControl?.values?.category_id || ''} >
        <option value=''>Категория</option>
        {categories.map((category, i) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </Form.Select>
      <div className="d-flex">
        <Form.Group className="p-2">
          <Form.Label>Цена от</Form.Label>
          <Form.Control name="price_starts" onChange={formControl.handleChange} value={formControl?.values?.price_starts || ''} />
        </Form.Group>
        <Form.Group className="p-2">
          <Form.Label>до</Form.Label>
          <Form.Control name="price_ends" onChange={formControl.handleChange} value={formControl?.values?.price_ends || ''} />
        </Form.Group>
      </div>
      <Form.Check
        type="checkbox"
        label="Нет в наличии"
        id="out_of_stock_only"
        name="out_of_stock_only"
      />
      <Form.Check
        type="checkbox"
        label="Нет своей цены"
        id="no_my_price_only"
        name="no_my_price_only"
      />
      <Form.Check
        type="checkbox"
        label="У конкурента дешевле"
        id="cheaper_only"
        name="cheaper_only"
      />
      <Form.Check
        type="checkbox"
        label="Ошибка парсинга"
        id="has_collect_error_only"
        name="has_collect_error_only"
      />
      <div className="d-flex justify-content-center">
        <Button className="m-2" type="submit">Принять</Button>
        <Button variant="outline-primary" className="m-2" onClick={handleUnfilter}>Очистить</Button>
      </div>
    </Form>
  )
}

export default FilterForm;