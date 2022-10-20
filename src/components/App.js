import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
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
import TariffInfoPopup from './TariffInfoPopup';
import { productsList, clientsList, profileInfo } from '../utils/constants';
import * as groupsApi from '../utils/groupsApi';
import * as productsApi from '../utils/productsApi';
import * as urlsApi from '../utils/productUrlsApi';
import * as updatersApi from '../utils/updatersApi';
import * as regionsApi from '../utils/regionsApi';
import * as userApi from '../utils/userInfoApi';
import * as tariffApi from '../utils/tariffApi';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import DeleteGroupPopup from './DeleteGroupPopup';
import ProtectedRoute from './ProtectedRoute';
//import { GroupsContext } from '../contexts/GroupsContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { recoveryPassword } from '../utils/auth';


const App = () => {

    const [ currentUser, setCurrentUser ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ groups, setGroups ] = useState([]);
    const [ defaultGroupId, setDefaultGroupId] = useState(null);
    const [ updaters, setUpdaters ] = useState([]);
    const [ clients, setClients ] = useState(clientsList);
    const [ regions, setRegions ] = useState([]);
    const [ tariffs, setTariffs ] = useState([]);
    const [ isTariffActive, setIsTariffActive ] = useState(false);
    const [isDeleteLinkPopupOpen, setIsDeleteLinkPopupOpen] = useState(false);
    const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
    const [isDeleteCheckedProductsPopupOpen, setIsDeleteCheckedProductsPopupOpen] = useState(false);

    const [ isTariffInfoPopupOpen, setIsTariffInfoPopupOpen ] = useState(false);
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
    const {loggedIn, isRegisterFirstStepOk, isRegistrationInfoTooltipOpen, handleRegistrationInfoTooltipOpen} = useAuth();

    const location = useLocation();


    const navigate = useNavigate();

  /*  const handleLoginOut = () => {
        setLoggedIn(false);
    }*/

    const isSidebarShown = () => {

        console.log(location.pathname);
      }

    useEffect(() => {
      handleGetTariffs();
    }, [])

    useEffect(() => {
      if (loggedIn) {
        updatersApi.getUpdaters()
        .then(data => {
          setUpdaters(data);
          setIsTariffActive(true);
          handleGetProfile();
          handleGetGroups();
          setRegionsList();
        })
        .catch(err => {
          console.log(err);

        });
      //  handleGetProfile();
      //  handleGetUpdaters();
      //  handleGetGroups();
      //  setRegionsList();
      //  getDefaultGroupId();
      }
    }, [loggedIn])

    const handleGetGroups = () => {
      groupsApi.getGroups()
        .then(data => {
          setGroups(data);
          getDefaultGroupId(data);
        })
        .catch(err => console.log(err));
    }

    const getDefaultGroupId = (groups) => {
      setDefaultGroupId(groups.find(g => g.is_default));

    }

    const handleGetUpdaters = () => {
      updatersApi.getUpdaters()
        .then(data => {
          setUpdaters(data);
        })
        .catch(err => console.log(err));
    }

    const handleGetProfile = (userData) => {
      userApi.getUserInfo(userData)
          .then(data => {
            if (data) {
              setCurrentUser(data)
            }
          })
          .catch(err => console.log(err))
    }

    const handleUpdateProfile = (userData) => {
        userApi.updateUserInfo(userData)
          .then(data => {
            if (data) {
              setCurrentUser({
                ...currentUser,
                data
              })
            }
          })
          .catch(err => console.log(err))
    }

    const handleGetTariffs = () => {
      tariffApi.getTariffs()
        .then(data => {
          if (data) {
            setTariffs(data)
          }
        })
        .catch(err => console.log(err))
    }

    const handleTariffInfoPopupOpen = () => {
      setIsTariffInfoPopupOpen(!isTariffInfoPopupOpen);
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
        let data = [...updateProduct.product_urls];
        const pos = data.map(d => d.id).indexOf(indexOfProduct);
        data.splice(pos, 1);
        setIndexOfProduct(null);
        console.log(data);
        return data;
    }

    const newUrlListAfterCreate = (urlData) => {
        let data = [...updateProduct.product_urls, urlData  ];
        return data;
    }

    const newUrlListAfterUpdate = (urlData) => {
        let data = [...updateProduct.product_urls];
        const pos = data.map(d => d.id).indexOf(indexOfProduct);
        data[pos] = urlData;
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



    const handleReset = (email) => {
      recoveryPassword(email)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    }

    const handleUpdateProduct = (form) => {
      productsApi.updateProduct(updateProduct.id, form)
      .then(res => {
        const newProducts = products.map(p => {
          if (p.id === updateProduct.id) {
              return {...p,
                  name: form.name,
                  base_price: form.base_price,
                  own_vendor_code: form.own_vendor_code,
                  //group_id: form.group_id,
                  brand: form.brand,
                  purchase_price: form.purchase_price,
                  //categoryName: form.categoryName,
                  //productUrls: form.productUrls
                }
          }
          return p;
      })
      setProducts(newProducts);
      setUpdateProduct({});
      redirectTo('/products');
      console.log(newProducts)
      })

    }

    const handleUpdateGroup = (form) => {
        console.log(updateGroup);
        groupsApi.updateGroup(updateGroup.id, form)
        .then(data => {
            const newGroups = groups.map(g => {
                if (g.id === data.id) {
                    return {...g,
                        name: data.name,
                        updater: data.updater
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

    const changeActivityGroup = (group) => {
      const newGroups = groups.map(g => {
        if (g.id === group.id) {
            return {...g,
                is_active: !group.is_active}
        }
        return g;
      })
      setGroups(newGroups);
      console.log(newGroups)
    }

    const handleChangeActivityGroup = (group) => {
      if (group.is_active) {
        groupsApi.deactivateGroup(group.id)
          .then(res => changeActivityGroup(group))
          .catch(err => console.log(err))
        }
      else {
        groupsApi.activateGroup(group.id)
          .then(res => changeActivityGroup(group))
          .catch(err => console.log(err))
        }
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
            console.log(newGroups)
        })
        .catch(err => console.log(err))
    }


    const handleUpdateProductUrl = (newUrlList) => {
        const newProducts = products.map(p => {
            if (p.id === updateProduct.id) {
                return {...p,
                    product_urls: newUrlList}
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
           /* const newData = {...data, product_urls: []};
            setProducts([newData, ...products]);*/
            redirectTo('/products');
        })
        .catch(err => console.log(err));
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
    productsApi.deleteProduct(deleteProductId)
      .then(res => {
        deleteOneProduct(deleteProductId);
        deleteProductPopupOpen();
        setDeleteProductId(null);
        console.log(res);
      })
      .catch(err => console.log(err))

  }

  const handleDeleteCheckedProducts = () => {
    deleteCheckedProducts(checkedProducts);
    setCheckedProducts([]);
    handleDeleteCheckedProductsPopupOpen();
  }

  const removeUrl = () => {
    const url = updateProduct.product_urls.find(item => item.id === indexOfProduct);
    urlsApi.deleteProductUrl(url.id)
    .then(res => {
      if (res.success) {
        handleUpdateProductUrl(newUrlListAfterDelete());
        deleteLinkPopupOpen()
      }
    })
    .catch(err => console.log(err));
  }

  const createUrl = (formData) => {
    const urlData = {...formData, product_id: updateProduct.id};
    console.log(urlData);
    urlsApi.createProductUrl(urlData)
    .then(res => {
      handleUpdateProductUrl(newUrlListAfterCreate(res));
      createLinkPopupOpen()
    })
    .catch(err => console.log(err))
  }

  const updateUrl = (urlData) => {
    const url = updateProduct.product_urls.find(item => item.id === indexOfProduct);
    urlsApi.updateProductUrl(url.id, urlData)
    .then(res => {
      handleUpdateProductUrl(newUrlListAfterUpdate(res));
    })
    .catch(err => console.log(err));
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
    productsApi.getProductsByGroup(updateGroup.id)
    .then(data => setProducts(data.items))
    .catch(err => console.log(err));
  }

  const setProductsList = () => {
    productsApi.getAllProducts()
    .then(data => setProducts(data.items))
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
            {loggedIn && <SideBar active={isTariffActive} />}
            <Routes>
                <Route path="/products" element={
                    <ProtectedRoute>
                        <Products
                            products={products}
                            setGroupProductsList={setGroupProductsList}
                            setProductsList={setProductsList}
                            group={updateGroup}
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
                    <ProtectedRoute>
                        <ProductsCreate
                            initData={updateProduct}
                            group={updateGroup}
                            defaultGroupId={defaultGroupId}
                            groups={groups}
                            regions={regions}
                            handleUpdateProduct={handleUpdateProduct}
                            handleCreateNewProduct={handleCreateNewProduct}
                            getDefaultGroupId={getDefaultGroupId}
                            getUpdateGroup={getUpdateGroup}
                            getUpdateProduct={getUpdateProduct}
                        />
                    </ProtectedRoute>
                }/>
                <Route
                    path="/groups"
                    element={
                        <ProtectedRoute>
                            <Groups
                                groups={groups}
                                updaters={updaters}
                                redirectTo={redirectTo}
                                handleCreateNewGroup={handleCreateNewGroup}
                                handleEditGroupPopupOpen={handleEditGroupPopupOpen}
                                handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                                getUpdateGroup={getUpdateGroup}
                                handleChangeActivityGroup={handleChangeActivityGroup}
                                handleIsDefaultGroup={handleIsDefaultGroup}
                                getUpdateProduct={getUpdateProduct} /*isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}*/
                            />
                        </ProtectedRoute>
                        } />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile handleUpdateProfile={handleUpdateProfile} handleGetProfile={handleGetProfile} onTariffInfoPopupOpen={handleTariffInfoPopupOpen} />
                        </ProtectedRoute>} />
                <Route
                    path="/clients"
                    element={
                        <ProtectedRoute>
                            <Clients clients={clients}/>
                        </ProtectedRoute>} />
                <Route path="/start" element={<StartPage redirectTo={redirectTo} />}/>
                <Route path="/register" element={<Register /*handleRegister={handleRegister}*/ />} />
                <Route path="/confirm-email" element={<ConfirmEmail /*handleConfirmEmail={handleConfirmEmail}*/ />} />
                <Route path="/finish-registration" element={<CompleteRegistration tariffs={tariffs} /*handleCompleteRegister={handleCompleteRegister}*/ />} />
                <Route path="/login" element={<Login /*handleAuthorization={handleAuthorization}*/ handleReset={handleReset} />} />
                <Route path="/rules" element={<Rules />} />

            </Routes>
            <RegistrationInfoTooltip
                isOpen={isRegistrationInfoTooltipOpen}
                onClose={handleRegistrationInfoTooltipOpen}
                isOk={isRegisterFirstStepOk} />
            <CreateLinkPopup initData={updateProduct} regions={regions} index={indexOfProduct} isOpen={isCreateLinkPopupOpen} onClose={createLinkPopupOpen} createUrl={createUrl} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct} />
            <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />
            <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
            <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
            <UpdateLinkPopup initData={updateProduct} regions={regions} index={indexOfProduct} isOpen={isUpdateLinkPopupOpen} onClose={handleUpdateLinkPopupOpen} handleIndexOfProduct={handleIndexOfProduct} handleCreateNewUrl={handleCreateNewUrl} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct}  />
            <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen} formData={updateGroup} handleUpdateGroup={handleUpdateGroup} updaters={updaters} />
            <DeleteGroupPopup isOpen={isDeleteGroupPopupOpen} onClose={handleDeleteGroupPopupOpen} okButtonAction={handleDeleteGroup} />
            <TariffInfoPopup isOpen={isTariffInfoPopupOpen} onClose={handleTariffInfoPopupOpen} />
        </Container>
      </CurrentUserContext.Provider>
    //    </GroupsContext.Provider>



    );
}

export default App;
