import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';
import UpdateLinkPopup from './UpdateLinkPopup';
import ReportingProblemPopup from './ReportingProblemPopup';
import {Link} from "react-router-dom";
import AddProductsFromFilePopup from './AddProductsFromFilePopup';

const Products = ({ products, productDataForUpdate, addProductIdToArr, removeProductIdFromArr, handleDeleteCheckedProductsPopupOpen, handleDeleteUrlId, handleDeleteProductId, getUpdateProduct, deleteLinkPopupOpen, deleteProductPopupOpen, handleUpdateProduct, handleIndexOfProduct, createLinkPopupOpen, newUrlListAfterCreate, handleUpdateLinkPopupOpen }) => {
  const [view, setView] = useState(true);
  const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
  const [isAddProductsFromFilePopupOpen, setIsAddProductsFromFilePopupOpen] = useState(false);
  
  const handleMode = () => {
    setView(!view);
  }

  const checkProduct = (isChecked, id) => {
    if (!isChecked) {
      addProductIdToArr(id);
    }
    else {
      removeProductIdFromArr(id);
    }
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
        <Button variant="link" onClick={handleDeleteCheckedProductsPopupOpen}>Удалить выбранные</Button>
      </div>
      
      {products.map((product, i) => (
              <Product 
                key={product.id} 
                productData={product} 
                productDataForUpdate={productDataForUpdate}
                checkProduct={checkProduct}
                handleDeleteProductId={handleDeleteProductId}
                handleDeleteUrlId={handleDeleteUrlId}
                view={view} 
                deleteLinkPopupOpen={deleteLinkPopupOpen} 
                deleteProductPopupOpen={deleteProductPopupOpen}
                handleUpdateLinkPopupOpen={handleUpdateLinkPopupOpen}  
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen} 
                getUpdateProduct={getUpdateProduct}
                handleUpdateProduct={handleUpdateProduct}
                handleIndexOfProduct={handleIndexOfProduct}
                createLinkPopupOpen={createLinkPopupOpen}
                />
            ))}


      
      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
      <AddProductsFromFilePopup isOpen={isAddProductsFromFilePopupOpen} onClose={handleAddProductsFromFilePopupOpen}/>
    </Container>
  )
}

export default Products;