import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Search, FunnelFill, FileEarmarkExcelFill } from 'react-bootstrap-icons';

const SearchBar = ({ handleMode }) => {
  return(
    <Form className="d-flex flex-fill p-2 align-items-center">
          <InputGroup  className="m-1 mt-2 mb-3">
            <InputGroup.Text><Search /></InputGroup.Text>
            <Form.Control placeholder="Поиск"
                          aria-label="Поиск" 
                          aria-describedby="button-addon2" />
            <Button variant="outline-secondary">Найти</Button>
          </InputGroup>
          <Button variant="outline-secondary" className="m-1 mt-2 mb-3" onClick={handleMode}><Search /></Button>
          <Button variant="outline-secondary" className="m-1 mt-2 mb-3"><FunnelFill /></Button>
          <Button variant="outline-secondary" className="m-1 mt-2 mb-3"><FileEarmarkExcelFill /></Button>
        </Form>
  )
}

export default SearchBar;