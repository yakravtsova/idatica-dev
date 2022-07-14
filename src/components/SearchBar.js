import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Search, FunnelFill, FileEarmarkExcelFill } from 'react-bootstrap-icons';
import FilterForm from './FilterForm';
import DownloadDataForm from './DownloadDataForm';

const SearchBar = ({ handleMode }) => {
  return(
    <>
      <Form className="d-flex flex-fill p-2 align-items-center">
        <InputGroup  className="m-1 mt-2 mb-3">
          <InputGroup.Text><Search /></InputGroup.Text>
          <Form.Control placeholder="Поиск"
                        aria-label="Поиск" 
                        aria-describedby="button-addon2" />
          <Button variant="outline-secondary">Найти</Button>
        </InputGroup>
      </Form>
      <Button variant="outline-secondary" className="m-1 mt-2 mb-3" onClick={handleMode}><Search /></Button>
      <OverlayTrigger rootClose 
                      trigger="click" 
                      placement="auto"
                      overlay={<Popover>
                        <Popover.Body>
                          <FilterForm />
                        </Popover.Body>
                      </Popover>}>
        <Button variant="outline-secondary" className="m-1 mt-2 mb-3"><FunnelFill /></Button>
      </OverlayTrigger>
      <OverlayTrigger rootClose 
                      trigger="click" 
                      placement="auto"
                      overlay={<Popover>
                        <Popover.Body>
                          <DownloadDataForm />
                        </Popover.Body>
                      </Popover>}>
        <Button variant="outline-secondary" className="m-1 mt-2 mb-3"><FileEarmarkExcelFill /></Button>
      </OverlayTrigger>
    </>
  )
}

export default SearchBar;