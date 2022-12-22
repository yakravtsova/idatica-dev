import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
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
import * as storesApi from '../utils/storesApi';
import DeleteGroupPopup from './DeleteGroupPopup';
import ProtectedRoute from './ProtectedRoute';
import ForbiddenRoute from './ForbiddenRoute';
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
  const [ stores, setStores ] = useState([]);
  const [ tariffs, setTariffs ] = useState([]);
  const [ isTariffActive, setIsTariffActive ] = useState(false);
  const [ updateProduct, setUpdateProduct ] = useState({});
  const [ isTariffInfoPopupOpen, setIsTariffInfoPopupOpen ] = useState(false);
  const [ updateGroup, setUpdateGroup ] = useState({});
  const [isEditGroupPopupOpen, setIsEditGroupPopupOpen] = useState(false);
  const [isDeleteGroupPopupOpen, setIsDeleteGroupPopupOpen] = useState(false);
  const {loggedIn, logout, isRegisterFirstStepOk, isRegistrationInfoTooltipOpen, handleRegistrationInfoTooltipOpen, errTitle, errMessage} = useAuth();
  const [ isSuperuser, setIsSuperuser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetTariffs();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      userApi.getUserInfo()
        .then(data => {
          if (data) {
            setCurrentUser(data);
            setIsTariffActive((new Date().toJSON() < data.tariff_ends_at));
            setIsSuperuser(data.is_superuser);
            if (data.is_superuser) {
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
                handleGetStores();
              })
            }
          }})
        .catch(err => {
          console.log(err);
          logout();
        })
    };
  }
  , [loggedIn, isSuperuser])

  const getGroups = (groupsList) => {
    setGroups(groupsList)
  }

  const getUpdaters = (updatersList) => {
    setUpdaters(updatersList)
  }

  //получить список групп пользователя
  const handleGetGroups = () => {
    groupsApi.getGroups()
      .then(data => {
        setGroups(data);
        getDefaultGroupId(data);
      })
      .catch(err => console.log(err));
  }

  //получить список конкурентов
  const handleGetStores = () => {
    storesApi.getStores()
      .then(res => {
        setStores(res);
      })
      .catch(err => console.log(err))
  }

  //получить список категорий
  const handleGetCategories = () => {
    categoriesApi.getCategories()
      .then(res => {
        setCategories(res);
      })
      .catch(err => console.log(err))
  }

  //находит группу по умолчанию
  const getDefaultGroupId = (groups) => {
    setDefaultGroupId(groups.find(g => g.is_default));
  }

  //получить данные пользователя
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

  //обновить данные пользователя
  const handleUpdateProfile = (userData) => {
    userApi.updateUserInfo(userData)
      .then(data => {
        if (data) {
          setCurrentUser(data);
        }
      })
      .catch(err => console.log(err))
  }

  //получить список доступных тарифов
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

  //открыть-закрыть окно удаления группы
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
      redirectTo('/products');
    })
    .catch(err => console.log(err));
  }

  //редактировать продукт
  const handleUpdateProduct = (form) => {
    productsApi.updateProduct(updateProduct.id, form)
    .then(res => {
      setUpdateProduct({});
      navigate(-1);
    })
  }

  //создать категорию и продукт
  const handleCreateCategoryAndProduct = (category, form) => {
    categoriesApi.createCategory(category)
      .then(res => {
        const newForm = {...form, category_id: res.id};
        setCategories([...categories, category]);
        handleCreateNewProduct(newForm);
      })
      .catch(err => console.log(err))
  }

  //создать категорию и редактировать продукт
  const handleUpdateCategoryAndProduct = (category, form) => {
    categoriesApi.createCategory(category)
      .then(res => {
        const newForm = {...form, category_id: res.id};
        setCategories([...categories, category]);
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
            return {...u, num_groups: u.num_groups - 1}
          }
          if (u.id === data.updater.id) {
            return {...u, num_groups: u.num_groups + 1}
          }
          return u;
        })
        setUpdaters(newUpdaters);
      })
      .catch(err => console.log(err));
  }

  const changeActivityGroup = (group) => {
    const newGroups = groups.map(g => {
      if (g.id === group.id) {
        return {...g, is_active: !group.is_active}
      }
      return g;
    })
    setGroups(newGroups);
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
            return {...g, is_default: true}
          }
          return {...g, is_default: false};
        })
        setGroups(newGroups);
      })
      .catch(err => console.log(err))
  }

  const handleCreateNewGroup = (form) => {
    groupsApi.createGroup(form)
      .then(data => {
        const newGroups = groups.map(g => {
          return {...g, is_default: false};
        });
        setGroups([data, ...newGroups]);
      })
      .catch(err => console.log(err));
  }

  const handleDeleteGroup = () => {
    const groupId = updateGroup.id;
    groupsApi.deleteGroup(groupId)
      .then(res => {
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
                stores={stores}
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
          } />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                {(isTariffActive) ?
                  <Groups
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
                  /> :
                  <ExpiredTariff />
                }
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
                  handleUpdateGroupUpdater={handleUpdateGroupUpdater}
                  updaters={updaters}
                  getUpdaters={getUpdaters}
                />
              </ProtectedRoute>
            } />
          <Route
            path="/clients"
            element={
            <ProtectedRoute>
              <Clients clients={clients} />
            </ProtectedRoute>} />
          <Route
            path="/"
            element={
              <ForbiddenRoute>
                <StartPage redirectTo={redirectTo} />
              </ForbiddenRoute>}/>
          <Route
            path="/register"
            element={
              <ForbiddenRoute>
                <Register />
              </ForbiddenRoute>
            }
          />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/finish-registration" element={<CompleteRegistration tariffs={tariffs} />} />
          <Route
            path="/login"
            element={
              <ForbiddenRoute>
                <Login handleReset={handleReset} />
              </ForbiddenRoute>
            }
          />
          <Route path="/rules" element={<Rules />} />
        </Routes>
        <RegistrationInfoTooltip
          isOpen={isRegistrationInfoTooltipOpen}
          onClose={handleRegistrationInfoTooltipOpen}
          isOk={isRegisterFirstStepOk}
          errTitle={errTitle}
          errMessage={errMessage}
        />
        <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen} formData={updateGroup} handleUpdateGroup={handleUpdateGroup} updaters={updaters} />
        <DeleteGroupPopup isOpen={isDeleteGroupPopupOpen} onClose={handleDeleteGroupPopupOpen} okButtonAction={handleDeleteGroup} />
        <TariffInfoPopup isOpen={isTariffInfoPopupOpen} onClose={handleTariffInfoPopupOpen} />
      </Container>
    </CurrentUserContext.Provider>
  );
}

export default App;
