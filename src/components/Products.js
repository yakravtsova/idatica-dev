import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';

const Products = () => {
  const [view, setView] = useState(false);
  
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleMode = () => {
    setView(!view);
  }


  const handleDeletePopupOpen = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  }

  return(
    <Container>
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
                handleDeletePopupOpen={handleDeletePopupOpen}  />
      <Product view={view} />
      <Product view={view} />
    </Container>
  )
}

export default Products;