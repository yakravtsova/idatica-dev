import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';
import DeletePopup from './DeletePopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import ReportingProblemPopup from './ReportingProblemPopup';
import {Link} from "react-router-dom";

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
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
        <h2>Товары</h2>
        <SearchBar handleMode={handleMode} />
      </div>
      <div>
        <Link to="/products/create" className="m-1 btn btn-primary">Добавить новый товар</Link>
        <Button className="m-1">Добавить товары из файла</Button>
      </div>
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
    </Container>
  )
}

export default Products;