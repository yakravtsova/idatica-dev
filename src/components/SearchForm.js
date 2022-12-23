import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const SearchForm = ({ setSearchParams }) => {
  const [ searchString, setSearchString ] = useState('');

  //задать строку для поиска по названию товара
  const handleSearchStringChange = (e) => {
    setSearchString(e.target.value)
  }

  //фильтрация по строке
  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {q: searchString};
    setSearchParams({...params, page: 1});
  }

  return(
      <Form className="d-flex flex-fill p-2 align-items-center" onSubmit={handleSubmit}>
        <InputGroup  className="m-1 mt-2 mb-3">
          <Form.Control placeholder="Поиск"
                        aria-label="Поиск"
                        aria-describedby="button-addon2"
                        onChange={handleSearchStringChange} />
          <Button variant="outline-secondary" type="submit">Найти</Button>
        </InputGroup>
      </Form>);
      }

export default SearchForm;