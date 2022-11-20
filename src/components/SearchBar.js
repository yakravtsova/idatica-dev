import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Search, FunnelFill, FileEarmarkExcelFill } from 'react-bootstrap-icons';
import FilterForm from './FilterForm';
import SearchForm from './SearchForm';
import DownloadDataForm from './DownloadDataForm';

const SearchBar = ({ handleMode, view, groups, regions, categories, filterProductsByName, setSearchParams, params }) => {

  return(
    <>
      <SearchForm filterAction={filterProductsByName} />
      <Button variant={view ? "outline-secondary" : "secondary"} className="m-1 mt-2 mb-3" onClick={handleMode}><Search /></Button>
      <OverlayTrigger rootClose
                      trigger="click"
                      placement="auto"
                      overlay={<Popover>
                        <Popover.Body>
                          <FilterForm groups={groups} regions={regions} categories={categories} setSearchParams={setSearchParams} params={params} />
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