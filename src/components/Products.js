import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';
import DeletePopup from './DeletePopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import ReportingProblemPopup from './ReportingProblemPopup';

const Products = () => {
  const [view, setView] = useState(false);  
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditLinkPopupOpen, setIsEditLinkPopupOpen] = useState(false);
  const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
  
  const handleMode = () => {
    setView(!view);
  }

  const handleDeletePopupOpen = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  }

  const handleEditLinkPopupOpen = () => {
    setIsEditLinkPopupOpen(!isEditLinkPopupOpen);
  }

  const handleReportingProblemPopupOpen = () => {
    setIsReportingProblemPopupOpen(!isReportingProblemPopupOpen);
  }

  return(
    <div className="w-100">
      <Container className="d-flex align-items-center">
        <h1 className="p-4 pt-0 pb-0">Товары</h1>
        <SearchBar handleMode={handleMode} />
      </Container>
      <Container>
        <Button className="m-1">Добавить новый товар</Button>
        <Button className="m-1">Добавить товары из файла</Button>
      </Container>
      <SortingBar />
      <Product view={view}  
                isDeletePopupOpen={isDeletePopupOpen} 
                handleDeletePopupOpen={handleDeletePopupOpen}
                handleEditLinkPopupOpen={handleEditLinkPopupOpen}
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen}  />
      <Product view={view} />
      <Product view={view} />
      
      <DeletePopup isOpen={isDeletePopupOpen} onClose={handleDeletePopupOpen} />
      <UpdateLinkPopup isOpen={isEditLinkPopupOpen} onClose={handleEditLinkPopupOpen} />
      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
    </div>
  )
}

export default Products;