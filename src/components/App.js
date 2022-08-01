import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';
import ProductsCreate from './ProductsCreate';
import SideBar from './SideBar';
import Container from 'react-bootstrap/Container';
import Profile from "./Profile";
import Groups from "./Groups";
import Register from './Register';
import Rules from './Rules';
import Login from './Login';
import RegistrationOkInfoTooltip from './RegistrationOkInfoTooltip';
import CompleteRegistration from './CompleteRegistration';
import DeleteLinkPopup from './DeleteLinkPopup';
import DeleteProductPopup from './DeleteProductPopup';
import DeleteCheckedProductsPopup from './DeleteCheckedProductsPopup';
import { productsList } from '../utils/constants';

const App = () => {  
    
    const [ products, setProducts ] = useState(productsList);
    const [isDeleteLinkPopupOpen, setIsDeleteLinkPopupOpen] = useState(false);
    const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
    const [isDeleteCheckedProductsPopupOpen, setIsDeleteCheckedProductsPopupOpen] = useState(false);
    const [isRegistrationInfoTooltipOpen, setIsRegistrationInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const [ updateProduct, setUpdateProduct ] = useState({});
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteUrlId, setDeleteUrlId ] = useState(null);
    const [checkedProducts, setCheckedProducts] = useState([]);
    const [ indexOfDeleteUrl, setIndexOfDeleteUrl ] = useState(null);
    const [ newUrls, setNewUrls ] = useState([]);


    const navigate = useNavigate();

    const handleIndexOfDeleteProduct = (index) => {
        setIndexOfDeleteUrl(index);
    }

    const handleDeleteCheckedProductsPopupOpen = () => {
        setIsDeleteCheckedProductsPopupOpen(!isDeleteCheckedProductsPopupOpen);
        console.log(checkedProducts)
    }

    const handleDeleteProductId = (id) => {
        setDeleteProductId(id);
        console.log(deleteProductId)
    }

    const handleDeleteUrlId = (id) => {
        setDeleteUrlId(id);
        console.log(id)
    }

    const removeUrlFromState = () => {
        let data = [...updateProduct.productUrls];
        data.splice(indexOfDeleteUrl, 1);
        return data;
    }
    
      

    const addProductIdToArr = (id) => {
        setCheckedProducts([id, ...checkedProducts])
    }

    const removeProductIdFromArr = (id) => {
        setCheckedProducts((state) => state.filter((i) => i !==  id))
    }
    
    const deleteCheckedProducts = (checkedProducts) => {
        setProducts((state) => state.filter((p) => !(checkedProducts.includes(p.id))))
    }

    const deleteOneProduct = (id) => {
        setProducts((state) => state.filter((p) => p.id !== id))
      }

    const handleRegistrationInfoTooltipOpen = () => {
        setIsRegistrationInfoTooltipOpen(!isRegistrationInfoTooltipOpen);
    }
    
    const deleteLinkPopupOpen = () => {
        setIsDeleteLinkPopupOpen(!isDeleteLinkPopupOpen);
    }
    
    const deleteProductPopupOpen = () => {
        setIsDeleteProductPopupOpen(!isDeleteProductPopupOpen);
    }

    const redirectTo = (path) => {
        navigate(path)
    }

    const getUpdateProduct = (productData) => {
        setUpdateProduct(productData);
    }

    const handleRegister = ({ email, password }) => {
        const registerData = {
            email: email,
            password: password
        }
        console.log(registerData);
        handleRegistrationInfoTooltipOpen();
    }

    const handleAuthorization = (email, password) => {
        console.log(`${email}, ${password}`)
    }

    const handleReset = (email) => {
        console.log(email);
    }

    const handleCompleteRegister = (form) => {
        console.log(form)
    }

    const handleUpdateProduct = (form) => {
        const newProducts = products.map(p => {
            if (p.id === updateProduct.id) {
                return {...p, 
                    name: form.name,
                    basePrice: form.basePrice,
                    ownVendorCode: form.ownVendorCode,
                    groupId: form.groupId,
                    brand: form.brand,
                    purchasePrice: form.purchasePrice,
                    categoryName: form.categoryName,
                    productUrls: form.productUrls}
            }
            return p;
        })
        setProducts(newProducts);
        console.log(newProducts)
    }

    const handleUpdateProductUrl = () => {
        const newProducts = products.map(p => {
            if (p.id === updateProduct.id) {
                return {...p, 
                    productUrls: removeUrlFromState()}
            }
            return p;
        })
        setProducts(newProducts);
        console.log(newProducts)
    }

    const handleCreateNewProduct = (form) => {
        setProducts([form, ...products])
    }
    
  const handleDeleteOneProduct = () => {
    deleteOneProduct(deleteProductId);
    deleteProductPopupOpen();
    setDeleteProductId(null);
  }

  const handleDeleteCheckedProducts = () => {
    deleteCheckedProducts(checkedProducts);
    setCheckedProducts([]);
    handleDeleteCheckedProductsPopupOpen();
  }

  const removeUrl = () => {
    ;
    console.log(removeUrlFromState());
    
    console.log(newUrls) 
    handleUpdateProductUrl();
    
    deleteLinkPopupOpen()
  }




    return (
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            {loggedIn && <SideBar/>}
            <Routes>
                <Route path="/start" element={<StartPage redirectTo={redirectTo} />}/>
                <Route path="/register" element={<Register handleRegister={handleRegister} />} />
                <Route path="/login" element={<Login handleAuthorization={handleAuthorization} handleReset={handleReset} />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/products" element={
                    <Products
                        products={products}
                        productDataForUpdate={updateProduct}
                        addProductIdToArr={addProductIdToArr}
                        removeProductIdFromArr={removeProductIdFromArr}
                        deleteCheckedProducts={deleteCheckedProducts}
                        handleDeleteProductId= {handleDeleteProductId}
                        handleDeleteUrlId={handleDeleteUrlId}
                        getUpdateProduct={getUpdateProduct} 
                        deleteLinkPopupOpen={deleteLinkPopupOpen} 
                        deleteProductPopupOpen={deleteProductPopupOpen} 
                        handleDeleteCheckedProductsPopupOpen={handleDeleteCheckedProductsPopupOpen}
                        handleUpdateProduct={handleUpdateProduct}
                        handleIndexOfDeleteProduct={handleIndexOfDeleteProduct}
                    />
                }/>
                <Route path="/products/create" element={
                    <ProductsCreate 
                        initData={updateProduct} 
                        handleUpdateProduct={handleUpdateProduct} 
                        handleCreateNewProduct={handleCreateNewProduct} 
                    />}/>
                <Route path="/groups" element={<Groups /*isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}*/ />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/accept" element={<CompleteRegistration handleCompleteRegister={handleCompleteRegister} />
            } />
            </Routes>
            <RegistrationOkInfoTooltip isOpen={isRegistrationInfoTooltipOpen} onClose={handleRegistrationInfoTooltipOpen} />
            <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />
            <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
            <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
        </Container>


    );
}

export default App;
