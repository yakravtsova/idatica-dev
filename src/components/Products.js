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
import { productsList } from '../utils/constants';

const Products = ({ getUpdateProduct, isDeletePopupOpen, handleDeletePopupOpen }) => {
  const [view, setView] = useState(true);
  const [isEditLinkPopupOpen, setIsEditLinkPopupOpen] = useState(false);
  const [isCreateLinkPopupOpen, setIsCreateLinkPopupOpen] = useState(false);
  const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
  const [isAddProductsFromFilePopupOpen, setIsAddProductsFromFilePopupOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [ products, setProducts ] = useState(productsList);
  
  const handleMode = () => {
    setView(!view);
  }

  const checkProduct = (isChecked, id) => {
    if (!isChecked) {
      setCheckedProducts([id, ...checkedProducts]);
    }
    else {
      setCheckedProducts((state) => state.filter((el) => el !==  id))
    }
    
    console.log(checkedProducts)
  }

  const deleteCheckedProducts = () => {
    setProducts((state) => state.filter((p) => !(checkedProducts.includes(p.id))))
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
        <SearchBar handleMode={handleMode} view={view} />
      </div>
      <div>
        <Link to="/products/create" className="m-1 btn btn-primary">Добавить новый товар</Link>
        <Button onClick={handleAddProductsFromFilePopupOpen} className="m-1">Добавить товары из файла</Button>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <SortingBar />
        <Button variant="link" onClick={deleteCheckedProducts}>Удалить выбранные</Button>
      </div>
      
      {products.map((product, i) => (
              <Product 
                key={product.id} 
                productData={product} 
                checkProduct={checkProduct}
                view={view} 
                handleDeletePopupOpen={handleDeletePopupOpen} 
                handleEditLinkPopupOpen={handleEditLinkPopupOpen} 
                handleCreateLinkPopupOpen={handleCreateLinkPopupOpen} 
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen} 
                getUpdateProduct={getUpdateProduct}
                />
            ))}
      
      
      <DeletePopup isOpen={isDeletePopupOpen} onClose={handleDeletePopupOpen} title="Удалить?" okButtonText="Да" cancelButtonText="Нет" />
      <UpdateLinkPopup isOpen={isEditLinkPopupOpen} onClose={handleEditLinkPopupOpen} />
      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
      <CreateLinkPopup isOpen={isCreateLinkPopupOpen} onClose={handleCreateLinkPopupOpen} />
      <AddProductsFromFilePopup isOpen={isAddProductsFromFilePopupOpen} onClose={handleAddProductsFromFilePopupOpen}/>
    </Container>
  )
}

export default Products;