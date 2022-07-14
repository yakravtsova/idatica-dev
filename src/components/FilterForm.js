import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';

const FilterForm = () => {
  return(
    <Form>
      <Form.Select className="mb-2">
        <option>Активные/неактивные</option>
        <option value="1">Активные</option>
        <option value="2">Неактивные</option>
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Конкурент</option>
        <option value="1">lavka.yandex.ru</option>
        <option value="2">vprok.ru</option>
        <option value="2">5ka.ru</option>
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Регион</option>
        <option value="1">Москва</option>
        <option value="2">Санкт-Петербург</option>
        <option value="2">Сызрань</option>
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Группа</option>
        <option value="1">Продукты</option>
        <option value="2">Строительные товары</option>
        <option value="2">Косметика</option>
      </Form.Select>
      <Form.Select className="mb-2">
        <option>Категория</option>
        <option value="1">Продукты</option>
      </Form.Select>
      <div className="d-flex">
        <Form.Group className="p-2">
          <Form.Label>Цена от</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="p-2">
          <Form.Label>до</Form.Label>
          <Form.Control />
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
        <Button className="m-2">Принять</Button>
        <Button variant="outline-primary" className="m-2">Очистить</Button>
      </div>
    </Form>
  )
}

export default FilterForm;