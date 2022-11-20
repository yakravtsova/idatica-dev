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
import UpdateGroupPopup from './UpdateGroupPopup';
import TariffInfoPopup from './TariffInfoPopup';
import ExpiredTariff from './ExpiredTariff';
import * as productsApi from '../utils/productsApi';
import * as groupsApi from '../utils/groupsApi';
import * as updatersApi from '../utils/updatersApi';
import * as regionsApi from '../utils/regionsApi';
import * as userApi from '../utils/userInfoApi';
import * as tariffApi from '../utils/tariffApi';
import * as clientsApi from '../utils/clientsApi';
import * as categoriesApi from '../utils/categoriesApi';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import DeleteGroupPopup from './DeleteGroupPopup';
import ProtectedRoute from './ProtectedRoute';
//import { GroupsContext } from '../contexts/GroupsContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { recoveryPassword } from '../utils/auth';


const App = () => {

    const [ currentUser, setCurrentUser ] = useState({});
    const [ groups, setGroups ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ defaultGroupId, setDefaultGroupId] = useState(null);
    const [ updaters, setUpdaters ] = useState([]);
    const [ regions, setRegions ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ tariffs, setTariffs ] = useState([]);
    const [ isTariffActive, setIsTariffActive ] = useState(false);
    const [ updateProduct, setUpdateProduct ] = useState({});
    const [ isTariffInfoPopupOpen, setIsTariffInfoPopupOpen ] = useState(false);
    const [ updateGroup, setUpdateGroup ] = useState({});
    const [isEditGroupPopupOpen, setIsEditGroupPopupOpen] = useState(false);
    const [isDeleteGroupPopupOpen, setIsDeleteGroupPopupOpen] = useState(false);
    const {loggedIn, isRegisterFirstStepOk, isRegistrationInfoTooltipOpen, handleRegistrationInfoTooltipOpen} = useAuth();
    const [ isSuperuser, setIsSuperuser] = useState(false);

    const location = useLocation();


    const navigate = useNavigate();

  /*  const handleLoginOut = () => {
        setLoggedIn(false);
    }*/


    useEffect(() => {
      handleGetTariffs();
    }, [])

    useEffect(() => {
      if (loggedIn) {
        handleGetProfile();
        if (isSuperuser) {
          clientsApi.getClients()
          .then(data => {
            setClients(data.items);
            console.log(data.items);
          })
          .catch(err => console.log(err));
          }
        else {
          updatersApi.getUpdaters()
          .then(data => {
            setUpdaters(data);
            handleGetGroups();
            handleGetCategories();
            setRegionsList();
          })
          .catch(err => {console.log(err)})
        }


        };


      //  handleGetProfile();
      //  handleGetUpdaters();
      //  handleGetGroups();
      //  setRegionsList();
      //  getDefaultGroupId();
      }
    , [loggedIn, isSuperuser])

    const getGroups = (groupsList) => {
      setGroups(groupsList)
    }

    const getUpdaters = (updatersList) => {
      setUpdaters(updatersList)
    }

    const handleGetGroups = () => {
      groupsApi.getGroups()
        .then(data => {
          setGroups(data);
          getDefaultGroupId(data);
        })
        .catch(err => console.log(err));
    }

    const handleGetCategories = () => {
      categoriesApi.getCategories()
        .then(res => {
          setCategories(res);
        })
        .catch(err => console.log(err))
    }

    const getDefaultGroupId = (groups) => {
      setDefaultGroupId(groups.find(g => g.is_default));

    }

    const handleGetProfile = () => {
      userApi.getUserInfo()
          .then(data => {
            if (data) {
              setCurrentUser(data);
              setIsTariffActive((new Date().toJSON() < data.tariff_expiration_date));
              setIsSuperuser(data.is_superuser);
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

    //берём продукт для редактирования
  const getUpdateProduct = (productData) => {
    setUpdateProduct(productData);
  }

//создать продукт
const handleCreateNewProduct = (form) => {
  productsApi.createProduct(form)
  .then(data => {
     /* const newData = {...data, product_urls: []};
      setProducts([newData, ...products]);*/
      redirectTo('/products');
  })
  .catch(err => console.log(err));
}

//редактировать продукт
const handleUpdateProduct = (form) => {
  productsApi.updateProduct(updateProduct.id, form)
  .then(res => {
  setUpdateProduct({});
  redirectTo('/products');
  })
}

//создать категорию и продукт
const handleCreateCategoryAndProduct = (category, form) => {
  categoriesApi.createCategory(category)
    .then(res => {
      const newForm = {...form, category_id: res.id};
      handleCreateNewProduct(newForm);
    })
    .catch(err => console.log(err))
}

//создать категорию и редактировать продукт
const handleUpdateCategoryAndProduct = (category, form) => {
  categoriesApi.createCategory(category)
    .then(res => {
      const newForm = {...form, category_id: res.id};
      handleUpdateProduct(newForm);
    })
    .catch(err => console.log(err))
}

    const redirectTo = (path, bool = false) => {
        navigate(path, {replace: bool})
    }

    const getUpdateGroup = (groupData) => {
        setUpdateGroup(groupData);
    }




    const handleReset = (email) => {
      recoveryPassword(email)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
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

    const handleUpdateGroupUpdater = (group, form) => {
      const oldUpdaterId = group.updater.id;
      groupsApi.updateGroup(group.id, form)
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
          const newUpdaters = updaters.map(u => {
            if (u.id === oldUpdaterId) {
              return {
                ...u, num_groups: u.num_groups - 1
              }
            }
            if (u.id === data.updater.id) {
              return {
                ...u, num_groups: u.num_groups + 1
              }
            }
            return u;
          })
          setUpdaters(newUpdaters);
            console.log(newUpdaters)
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











  const handleDeleteGroup = () => {
    const groupId = updateGroup.id;
    groupsApi.deleteGroup(groupId)
    .then(res => {
      //  setProducts(state => state.filter(p => p.groupId !== groupId));
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
                            group={updateGroup}
                            groups={groups}
                            regions={regions}
                            categories={categories}
                            redirectTo={redirectTo}
                            getUpdateGroup={getUpdateGroup}
                            updateProduct={updateProduct}
                            getUpdateProduct={getUpdateProduct}
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
                            handleCreateCategoryAndProduct={handleCreateCategoryAndProduct}
                            handleUpdateCategoryAndProduct={handleUpdateCategoryAndProduct}
                            categories={categories}
                        />
                    </ProtectedRoute>
                }/>
                <Route
                    path="/groups"
                    element={
                        <ProtectedRoute>
                            {(isTariffActive) ? <Groups
                                groups={groups}
                                updaters={updaters}
                                redirectTo={redirectTo}
                                getGroups={getGroups}
                                handleCreateNewGroup={handleCreateNewGroup}
                                handleEditGroupPopupOpen={handleEditGroupPopupOpen}
                                handleDeleteGroupPopupOpen={handleDeleteGroupPopupOpen}
                                getUpdateGroup={getUpdateGroup}
                                handleChangeActivityGroup={handleChangeActivityGroup}
                                handleIsDefaultGroup={handleIsDefaultGroup}
                                getUpdateProduct={getUpdateProduct} /*isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}*/
                            /> : <ExpiredTariff />}
                        </ProtectedRoute>
                        } />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile
                              handleUpdateProfile={handleUpdateProfile}
                              handleGetProfile={handleGetProfile}
                              onTariffInfoPopupOpen={handleTariffInfoPopupOpen}
                              groups={groups}
                              getUpdateGroup={getUpdateGroup}
                              handleUpdateGroupUpdater={handleUpdateGroupUpdater}
                              updaters={updaters}
                              getUpdaters={getUpdaters} />
                        </ProtectedRoute>} />
                <Route
                    path="/clients"
                    element={
                        <ProtectedRoute>
                            <Clients clients={clients} />
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
            <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen} formData={updateGroup} handleUpdateGroup={handleUpdateGroup} updaters={updaters} />
            <DeleteGroupPopup isOpen={isDeleteGroupPopupOpen} onClose={handleDeleteGroupPopupOpen} okButtonAction={handleDeleteGroup} />
            <TariffInfoPopup isOpen={isTariffInfoPopupOpen} onClose={handleTariffInfoPopupOpen} />
        </Container>
      </CurrentUserContext.Provider>
    //    </GroupsContext.Provider>



    );
}

export default App;
