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
import CreateLinkPopup from './CreateLinkPopup';
import AddProductsFromFilePopup from './AddProductsFromFilePopup';

const Products = ({ isDeletePopupOpen, handleDeletePopupOpen }) => {
  const [view, setView] = useState(false);
  const [isEditLinkPopupOpen, setIsEditLinkPopupOpen] = useState(false);
  const [isCreateLinkPopupOpen, setIsCreateLinkPopupOpen] = useState(false);
  const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
  const [isAddProductsFromFilePopupOpen, setIsAddProductsFromFilePopupOpen] = useState(false);
  
  const handleMode = () => {
    setView(!view);
  }


  const handleEditLinkPopupOpen = () => {
    setIsEditLinkPopupOpen(!isEditLinkPopupOpen);
  }

  const handleCreateLinkPopupOpen = () => {
    setIsCreateLinkPopupOpen(!isCreateLinkPopupOpen);
  }

  const handleReportingProblemPopupOpen = () => {
    setIsReportingProblemPopupOpen(!isReportingProblemPopupOpen);
  }

  const handleAddProductsFromFilePopupOpen = () => {
    setIsAddProductsFromFilePopupOpen(!isAddProductsFromFilePopupOpen);
  }

  return(
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
        <h2>Товары</h2>
        <SearchBar handleMode={handleMode} />
      </div>
      <div>
        <Link to="/products/create" className="m-1 btn btn-primary">Добавить новый товар</Link>
        <Button onClick={handleAddProductsFromFilePopupOpen} className="m-1">Добавить товары из файла</Button>
      </div>
      <SortingBar />
      <Product view={view}  
                isDeletePopupOpen={isDeletePopupOpen} 
                handleDeletePopupOpen={handleDeletePopupOpen}
                handleEditLinkPopupOpen={handleEditLinkPopupOpen}
                handleCreateLinkPopupOpen={handleCreateLinkPopupOpen}
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen}  />
      <Product view={view} />
      <Product view={view} />
      
      <DeletePopup isOpen={isDeletePopupOpen} onClose={handleDeletePopupOpen} title="Удалить?" okButtonText="Да" cancelButtonText="Нет" />
      <UpdateLinkPopup isOpen={isEditLinkPopupOpen} onClose={handleEditLinkPopupOpen} />
      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
      <CreateLinkPopup isOpen={isCreateLinkPopupOpen} onClose={handleCreateLinkPopupOpen} />
      <AddProductsFromFilePopup isOpen={isAddProductsFromFilePopupOpen} onClose={handleAddProductsFromFilePopupOpen}/>
    </Container>
  )
}

export default Products;