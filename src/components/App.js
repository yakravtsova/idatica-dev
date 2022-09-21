import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import RegistrationInfoTooltip from './RegistrationInfoTooltip';
import ConfirmEmail from './ConfirmEmail';
import CompleteRegistration from './CompleteRegistration';
import DeleteLinkPopup from './DeleteLinkPopup';
import DeleteProductPopup from './DeleteProductPopup';
import DeleteCheckedProductsPopup from './DeleteCheckedProductsPopup';
import CreateLinkPopup from './CreateLinkPopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import UpdateGroupPopup from './UpdateGroupPopup';
import { productsList, clientsList, profileInfo } from '../utils/constants';
import * as auth from '../utils/auth';
import * as groupsApi from '../utils/groupsApi';
import * as productsApi from '../utils/productsApi';
import * as updatersApi from '../utils/updatersApi';
import * as regionsApi from '../utils/regionsApi';
import * as userInfoApi from '../utils/userInfoApi';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import DeleteGroupPopup from './DeleteGroupPopup';
import ProtectedRoute from './ProtectedRoute';
//import { GroupsContext } from '../contexts/GroupsContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const App = () => {

    const [ currentUser, setCurrentUser ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ groups, setGroups ] = useState([]);
    const [ defaultGroupId, setDefaultGroupId] = useState(null);
    const [ updaters, setUpdaters ] = useState([]);
    const [ clients, setClients ] = useState(clientsList);
    const [ regions, setRegions ] = useState([]);
    const [isDeleteLinkPopupOpen, setIsDeleteLinkPopupOpen] = useState(false);
    const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
    const [isDeleteCheckedProductsPopupOpen, setIsDeleteCheckedProductsPopupOpen] = useState(false);
    const [isRegistrationInfoTooltipOpen, setIsRegistrationInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(/*() => {
        const token = localStorage.getItem('token');
        return token !== null;
    }*/ false);
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
    const [isRegisterFirstStepOk, setIsRegisterFirstStepOk] = useState(false);

    const location = useLocation();


    const navigate = useNavigate();

    const handleLoginOut = () => {
        setLoggedIn(false);
    }

    const isSidebarShown = () => {

        console.log(location.pathname);
      }


    const tokenCheck = () => {
        const token = localStorage.getItem('token');
        isSidebarShown();
        if (token) {
          userInfoApi.getUserInfo()
            .then(data => {
              if (data.name) {
                setCurrentUser(data);
                setLoggedIn(true);
              }
            })
          /*  groupsApi.getGroups()
            .then(data => {
                setGroups(data);
            })
            .catch(err => console.log(err));
            updatersApi.getUpdaters()
            .then(data => {
                setUpdaters(data);
            })
            .catch(err => console.log(err));*/
        }
        console.log(token);
        console.log(loggedIn);
        console.log(groups);
        console.log(updaters);
      }

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (groups.length) {
            const defaultGroup = groups.find(g => g.is_default);
            setDefaultGroupId(defaultGroup.id);
        }
        console.log(defaultGroupId);
    }, [groups]);

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

    const redirectTo = (path, bool = false) => {
        navigate(path, {replace: bool})
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
            if (res) {
                setIsRegisterFirstStepOk(true);
                handleRegistrationInfoTooltipOpen();
            } else {
                setIsRegisterFirstStepOk(false);
                handleRegistrationInfoTooltipOpen();
            }
            console.log(res)
        })
        .catch(err => {
            setIsRegisterFirstStepOk(false);
            handleRegistrationInfoTooltipOpen();
            console.log(err)
        })
    }

    const handleConfirmEmail = (data) => {
      console.log(data);
      auth.confirmEmail(data)
      .then(res => {
        if (res.is_email_confirmed) {
          redirectTo('/finish-registration');
        }
      })
      .catch(err => {
        setIsRegisterFirstStepOk(false);
        handleRegistrationInfoTooltipOpen();
        console.log(err)
      })
    }

    const handleCompleteRegister = ({ email, name, phone, companyName, tariffId }) => {
        const registerData = {
            email: email,
            name: name,
            phone: phone,
            company_name: companyName,
            tariffId: tariffId,
        };
        console.log(registerData);
        auth.completeRegister(registerData)
        .then(data => {
            if (data.id) {
                setLoggedIn(true);
                redirectTo('/groups', true);
              }
              else {
                setIsRegisterFirstStepOk(false);
                handleRegistrationInfoTooltipOpen();
              }
            })
        .catch(err => {
            setIsRegisterFirstStepOk(false);
            handleRegistrationInfoTooltipOpen();
            console.log(err);
        })
    }

    const handleAuthorization = ({ email, password }) => {
        auth.authorize(email, password)
            .then(data => {
                if (data.access_token) {
                    setLoggedIn(true);
                    navigate('/groups', {replace: true});
                  }
                  else {
                    console.log('Авторизация не удалась');
                  }
                })
            .catch(err => {
                setIsRegisterFirstStepOk(false);
                handleRegistrationInfoTooltipOpen();
                console.log(err);
            });
    }

    const handleReset = (email) => {
        console.log(email);
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
        redirectTo('/products');
        console.log(newProducts)
    }

    const handleUpdateGroup = (form) => {
        console.log(updateGroup);
        groupsApi.updateGroup(updateGroup.id, form)
        .then(data => {
            const newGroups = groups.map(g => {
                if (g.id === data.id) {
                    return {...g,
                        name: data.name,
                    //    updateFrequency: form.updateFrequency
                }
                }
                return g;
            });
            setGroups(newGroups);
            setUpdateGroup({});
            console.log(newGroups)
        })
        .catch(err => console.log(err));
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
        groupsApi.setDefaultGroup(group.id)
        .then(res => {
            const newGroups = groups.map(g => {
                if (g.id === group.id) {
                    return {...g,
                        is_default: true}
                }
                return {...g,
                    is_default: false};
            })
            setGroups(newGroups);
            setUpdateGroup({});
            console.log(newGroups)
        })
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
        productsApi.createProduct(form)
        .then(data => {
            setProducts([data, ...products]);
            redirectTo('/products');
        });
    }

    const handleCreateNewGroup = (form) => {
        console.log(form);
        groupsApi.createGroup(form)
        .then(data => {
            const newGroups = groups.map(g => {
                return {...g,
                    is_default: false};
            })
            setGroups([data, ...newGroups]);
            console.log(groups);
        })
        .catch(err => console.log(err));
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
    groupsApi.deleteGroup(groupId)
    .then(res => {
        setProducts(state => state.filter(p => p.groupId !== groupId));
        if (updateGroup.is_default) {
            const tempGroups = groups;
            tempGroups[0].is_default = true;
            setGroups(tempGroups);
        }
        setGroups(state => state.filter(g => g.id !== groupId));
        setUpdateGroup({});
        handleDeleteGroupPopupOpen();
    })
    .catch(err => console.log(err));
  }

  const setGroupProductsList = () => {
    productsApi.getProducts(updateGroup.id)
    .then(data => setProducts(data))
    .catch(err => console.log(err));
  }

  const setRegionsList = () => {
    regionsApi.getRegions()
    .then(data => setRegions(data))
    .catch(err => console.log(err));
  }




    return (

    //    <GroupsContext.Provider value={groups}>
      <CurrentUserContext.Provider value={currentUser}>
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            {loggedIn && <SideBar isSuperUser={isSuperUser} handleLoginOut={handleLoginOut} />}
            <Routes>
                <Route path="/products" element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Products
                            products={products}
                            setGroupProductsList={setGroupProductsList}
                            groups={groups}
                            redirectTo={redirectTo}
                            productDataForUpdate={updateProduct}
                            addProductIdToArr={addProductIdToArr}
                            removeProductIdFromArr={removeProductIdFromArr}
                            deleteCheckedProducts={deleteCheckedProducts}
                            handleUpdateUrlId= {handleUpdateUrlId}
                            getUpdateProduct={getUpdateProduct}
                            getUpdateGroup={getUpdateGroup}
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
                    </ProtectedRoute>
                }/>
                <Route path="/create-product" element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <ProductsCreate
                            initData={updateProduct}
                            group={updateGroup}
                            defaultGroupId={defaultGroupId}
                            groups={groups}
                            regions={regions}
                            handleUpdateProduct={handleUpdateProduct}
                            handleCreateNewProduct={handleCreateNewProduct}
                            setRegionsList={setRegionsList}
                        />
                    </ProtectedRoute>
                }/>
                <Route
                    path="/groups"
                    element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Groups
                                groups={groups}
                                updaters={updaters}
                                redirectTo={redirectTo}
                                handleCreateNewGroup={handleCreateNewGroup}
                                handleEditGroupPopupOpen={handleEditGroupPopupOpen}
                                handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                                getUpdateGroup={getUpdateGroup}
                                handleUpdatingEnabledGroup={handleUpdatingEnabledGroup}
                                handleIsDefaultGroup={handleIsDefaultGroup} /*isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}*/
                            />
                        </ProtectedRoute>
                        } />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Profile handleUpdateProfile={handleUpdateProfile} />
                        </ProtectedRoute>} />
                <Route
                    path="/clients"
                    element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Clients clients={clients}/>
                        </ProtectedRoute>} />
                <Route path="/" element={<StartPage redirectTo={redirectTo} />}/>
                <Route path="/register" element={<Register handleRegister={handleRegister} />} />
                <Route path="/confirm-email" element={<ConfirmEmail handleConfirmEmail={handleConfirmEmail} />} />
                <Route path="/finish-registration" element={<CompleteRegistration handleCompleteRegister={handleCompleteRegister} />} />
                <Route path="/login" element={<Login handleAuthorization={handleAuthorization} handleReset={handleReset} />} />
                <Route path="/rules" element={<Rules />} />

            </Routes>
            <RegistrationInfoTooltip
                isOpen={isRegistrationInfoTooltipOpen}
                onClose={handleRegistrationInfoTooltipOpen}
                isOk={isRegisterFirstStepOk}
                redirect={() => {
                redirectTo('/accept');
                handleRegistrationInfoTooltipOpen()}} />
            <CreateLinkPopup initData={updateProduct} index={indexOfProduct} isOpen={isCreateLinkPopupOpen} onClose={createLinkPopupOpen} createUrl={createUrl} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct} />
            <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />
            <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
            <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
            <UpdateLinkPopup initData={updateProduct} index={indexOfProduct} isOpen={isUpdateLinkPopupOpen} onClose={handleUpdateLinkPopupOpen} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct}  />
            <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen} formData={updateGroup} handleUpdateGroup={handleUpdateGroup} />
            <DeleteGroupPopup isOpen={isDeleteGroupPopupOpen} onClose={handleDeleteGroupPopupOpen} okButtonAction={handleDeleteGroup} />
        </Container>
      </CurrentUserContext.Provider>
    //    </GroupsContext.Provider>



    );
}

export default App;
