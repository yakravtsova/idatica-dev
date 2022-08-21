import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';
import ProductsCreate from './ProductsCreate';
import SideBar from './SideBar';
import Container from 'react-bootstrap/Container';
import Profile from "./Profile";
import Clients from "./Clients";
import Groups from "./Groups";
import Register from './Register';
import Rules from './Rules';
import Login from './Login';
import RegistrationOkInfoTooltip from './RegistrationOkInfoTooltip';
import CompleteRegistration from './CompleteRegistration';
import DeleteLinkPopup from './DeleteLinkPopup';
import DeleteProductPopup from './DeleteProductPopup';
import DeleteCheckedProductsPopup from './DeleteCheckedProductsPopup';
import CreateLinkPopup from './CreateLinkPopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import UpdateGroupPopup from './UpdateGroupPopup';
import { productsList, groupsList, clientsList, profileInfo } from '../utils/constants';
import * as auth from '../utils/auth';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import DeleteGroupPopup from './DeleteGroupPopup';

const App = () => {  
    
    const [ products, setProducts ] = useState(productsList);
    const [ groups, setGroups ] = useState(groupsList);
    const [ clients, setClients ] = useState(clientsList);
    const [isDeleteLinkPopupOpen, setIsDeleteLinkPopupOpen] = useState(false);
    const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
    const [isDeleteCheckedProductsPopupOpen, setIsDeleteCheckedProductsPopupOpen] = useState(false);
    const [isRegistrationInfoTooltipOpen, setIsRegistrationInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const [ updateProduct, setUpdateProduct ] = useState({});
    const [ updateGroup, setUpdateGroup ] = useState({});
    const [updateUrlId, setUpdateUrlId] = useState(null);
    const [checkedProducts, setCheckedProducts] = useState([]);
    const [ indexOfProduct, setIndexOfProduct ] = useState(null);
    const [isCreateLinkPopupOpen, setIsCreateLinkPopupOpen] = useState(false);
    const [ deleteProductId, setDeleteProductId ] = useState(null);
    const [isUpdateLinkPopupOpen, setIsUpdateLinkPopupOpen] = useState(false);
    const [isEditGroupPopupOpen, setIsEditGroupPopupOpen] = useState(false);
    const [isDeleteGroupPopupOpen, setIsDeleteGroupPopupOpen] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(true);
    const [profile, setProfile] = useState(profileInfo);
    
  


    const navigate = useNavigate();

    const handleUpdateProfile = (form) => {
        setProfile(form);
        console.log(profile);
    }

    const handleDeleteGroupPopupOpen = () => {
        setIsDeleteGroupPopupOpen(!isDeleteGroupPopupOpen);
    }

    const handleEditGroupPopupOpen = () => {
        setIsEditGroupPopupOpen(!isEditGroupPopupOpen);
    }


    const handleUpdateLinkPopupOpen = () => {
        setIsUpdateLinkPopupOpen(!isUpdateLinkPopupOpen);
      }
    

    const handleDeleteProductId = (id) => {
        setDeleteProductId(id)
    }

    const handleCreateNewUrl = (urlData) => {
        /*setNewUrl(urlData);
        console.log(urlData);*/
        return urlData;
    }

    const createLinkPopupOpen = () => {
        setIsCreateLinkPopupOpen(!isCreateLinkPopupOpen);
      }

    const handleIndexOfProduct = (index) => {
        setIndexOfProduct(index);
    }

    const handleDeleteCheckedProductsPopupOpen = () => {
        setIsDeleteCheckedProductsPopupOpen(!isDeleteCheckedProductsPopupOpen);
        console.log(checkedProducts)
    }

    const handleUpdateUrlId = (id) => {
        setUpdateUrlId(id);
        console.log(updateUrlId)
    }

    const newUrlListAfterDelete = () => {
        let data = [...updateProduct.productUrls];
        data.splice(indexOfProduct, 1);
        setIndexOfProduct(null);
        return data;
    }

    const newUrlListAfterCreate = (urlData) => {
        let data = [...updateProduct.productUrls, handleCreateNewUrl(urlData)  ];
        return data;
    } 
    
    const newUrlListAfterUpdate = (urlData) => {
        let data = [...updateProduct.productUrls];
        data[indexOfProduct]=handleCreateNewUrl(urlData);
        console.log(data);
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

    const getUpdateGroup = (groupData) => {
        setUpdateGroup(groupData);
    }

    const getUpdateProduct = (productData) => {
        setUpdateProduct(productData);
    }

    const handleRegister = ({ email, password }) => {
        const registerData = {
            email: email,
            password: password
        };
        console.log(registerData);
        auth.register(registerData)
        .then(res => {
            console.log(res);
            handleRegistrationInfoTooltipOpen()
        })
        .catch(err => console.log(err))
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
        setUpdateProduct({});
        console.log(newProducts)
    }

    const handleUpdateGroup = (form) => {
        console.log(updateGroup);
        const newGroups = groups.map(g => {
            if (g.id === updateGroup.id) {
                return {...g, 
                    name: form.name,
                    updateFrequency: form.updateFrequency}
            }
            return g;
        })
        setGroups(newGroups);
        setUpdateGroup({});
        console.log(newGroups)
    }

    const handleUpdatingEnabledGroup = (group) => {
        const newGroups = groups.map(g => {
            if (g.id === group.id) {
                return {...g, 
                    isUpdatingEnabled: !group.isUpdatingEnabled}
            }
            return g;
        })
        setGroups(newGroups);
        setUpdateGroup({});
        console.log(newGroups)
    }

    const handleIsDefaultGroup = (group) => {
        const newGroups = groups.map(g => {
            if (g.id === group.id) {
                return {...g, 
                    isDefault: true}
            }
            return {...g, 
                isDefault: false};
        })
        setGroups(newGroups);
        setUpdateGroup({});
        console.log(newGroups)
    }


    const handleUpdateProductUrl = (newUrlList) => {
        const newProducts = products.map(p => {
            if (p.id === updateProduct.id) {
                return {...p, 
                    productUrls: newUrlList}
            }
            return p;
        })
        setProducts(newProducts);
        setUpdateProduct({});
        console.log(newProducts)
    }

    const handleCreateNewProduct = (form) => {
        setProducts([form, ...products])
    }

    const handleCreateNewGroup = (form) => {
        setGroups([form, ...groups]);
        console.log(groups);
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
    console.log(newUrlListAfterDelete());
    handleUpdateProductUrl(newUrlListAfterDelete());
    deleteLinkPopupOpen()
  }

  const createUrl = (urlData) => {
    console.log(newUrlListAfterCreate(urlData));
    handleUpdateProductUrl(newUrlListAfterCreate(urlData));
    createLinkPopupOpen()
  }

  const updateUrl = (urlData) => {
    console.log(newUrlListAfterUpdate(urlData));
    handleUpdateProductUrl(newUrlListAfterUpdate(urlData));
    handleUpdateLinkPopupOpen()
  }

  const handleDeleteGroup = () => {
    const groupId = updateGroup.id;
    setProducts(state => state.filter(p => p.groupId !== groupId));
    setGroups(state => state.filter(g => g.id !== groupId));
    setUpdateGroup({});
    handleDeleteGroupPopupOpen();
  }




    return (
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            {loggedIn && <SideBar isSuperUser={isSuperUser} />}
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
                        handleUpdateUrlId= {handleUpdateUrlId}
                        getUpdateProduct={getUpdateProduct} 
                        deleteLinkPopupOpen={deleteLinkPopupOpen} 
                        deleteProductPopupOpen={deleteProductPopupOpen} 
                        handleDeleteCheckedProductsPopupOpen={handleDeleteCheckedProductsPopupOpen}
                        handleUpdateProduct={handleUpdateProduct}
                        createLinkPopupOpen={createLinkPopupOpen}
                        handleIndexOfProduct={handleIndexOfProduct}
                        handleDeleteProductId={handleDeleteProductId}
                        newUrlListAfterCreate={newUrlListAfterCreate}
                        handleUpdateLinkPopupOpen={handleUpdateLinkPopupOpen}
                    />
                }/>
                <Route path="/products/create" element={
                    <ProductsCreate 
                        initData={updateProduct} 
                        group={updateGroup}
                        handleUpdateProduct={handleUpdateProduct} 
                        handleCreateNewProduct={handleCreateNewProduct} 
                    />}/>
                <Route 
                    path="/groups" 
                    element={
                        <Groups 
                            groups={groups} 
                            handleCreateNewGroup={handleCreateNewGroup} 
                            handleEditGroupPopupOpen={handleEditGroupPopupOpen}
                            handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                            getUpdateGroup={getUpdateGroup}
                            handleUpdatingEnabledGroup={handleUpdatingEnabledGroup}
                            handleIsDefaultGroup={handleIsDefaultGroup} /*isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}*/ />} />
                <Route path="/profile" element={<Profile profile={profile} handleUpdateProfile={handleUpdateProfile} />} />
                <Route path="/clients" element={<Clients clients={clients}/>} />
                <Route path="/accept" element={<CompleteRegistration handleCompleteRegister={handleCompleteRegister} />
            } />
            </Routes>
            <RegistrationOkInfoTooltip isOpen={isRegistrationInfoTooltipOpen} onClose={handleRegistrationInfoTooltipOpen} />
            <CreateLinkPopup initData={updateProduct} index={indexOfProduct} isOpen={isCreateLinkPopupOpen} onClose={createLinkPopupOpen} createUrl={createUrl} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct} />
            <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />
            <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
            <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
            <UpdateLinkPopup initData={updateProduct} index={indexOfProduct} isOpen={isUpdateLinkPopupOpen} onClose={handleUpdateLinkPopupOpen} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct}  />
            <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen} formData={updateGroup} handleUpdateGroup={handleUpdateGroup} />
            <DeleteGroupPopup isOpen={isDeleteGroupPopupOpen} onClose={handleDeleteGroupPopupOpen} okButtonAction={handleDeleteGroup} />
        </Container>


    );
}

export default App;
