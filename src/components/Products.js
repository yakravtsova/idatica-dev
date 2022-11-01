import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';
import CreateLinkPopup from './CreateLinkPopup';
import ReportingProblemPopup from './ReportingProblemPopup';
import AddProductsFromFilePopup from './AddProductsFromFilePopup';
import DeleteLinkPopup from './DeleteLinkPopup';
import DeleteProductPopup from './DeleteProductPopup';
import DeleteCheckedProductsPopup from './DeleteCheckedProductsPopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import * as productsApi from '../utils/productsApi';
import * as urlsApi from '../utils/productUrlsApi';

const Products = ({
  group,
  groups,
  regions,
  redirectTo,
  getUpdateGroup,
  updateProduct,
  getUpdateProduct }) => {
  const [view, setView] = useState(true);
  const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
  const [isAddProductsFromFilePopupOpen, setIsAddProductsFromFilePopupOpen] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ productsState, setProductsState ] = useState([]);
  const [isCreateLinkPopupOpen, setIsCreateLinkPopupOpen] = useState(false);
  const [ deleteProductId, setDeleteProductId ] = useState(null);
  const [isDeleteLinkPopupOpen, setIsDeleteLinkPopupOpen] = useState(false);
  const [isDeleteProductPopupOpen, setIsDeleteProductPopupOpen] = useState(false);
  const [isDeleteCheckedProductsPopupOpen, setIsDeleteCheckedProductsPopupOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [ indexOfProduct, setIndexOfProduct ] = useState(null);
  const [isUpdateLinkPopupOpen, setIsUpdateLinkPopupOpen] = useState(false);

  useEffect(() => {
    getUpdateProduct({});
    if (group.id) {
      setGroupProductsList();
    //  setProductsState(products);
      getUpdateGroup({});
      return;
    }
    setProductsList();
    getUpdateGroup({});
  //  setProductsState(products);
  }
  , [])

  //берём id удаляемого продукта
  const handleDeleteProductId = (id) => {
    setDeleteProductId(id)
  }

  //берём номер удаляемой ссылки
  const handleIndexOfProduct = (index) => {
    setIndexOfProduct(index);
  }

  //загрузить все продукты
  const setProductsList = () => {
    productsApi.getAllProducts()
    .then(data => {
      const items = data.items;
      setProducts(items);
      setProductsState(items);
    })
    .catch(err => console.log(err));
  }


  //загрузить продукты из группы
  const setGroupProductsList = () => {
    productsApi.getProductsByGroup(group.id)
    .then(data => {
      const items = data.items;
      setProducts(items);
      setProductsState(items);
    })
    .catch(err => console.log(err));
  }

  //открыть попап удаления продукта
  const deleteProductPopupOpen = () => {
    setIsDeleteProductPopupOpen(!isDeleteProductPopupOpen);
  }

  //Удалить один продукт из стейта
  const deleteOneProduct = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
    setProductsState(newProducts);
  }

  //Удалить один продукт
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

  //открыть попап удаления нескольких продуктов
  const handleDeleteCheckedProductsPopupOpen = () => {
    setIsDeleteCheckedProductsPopupOpen(!isDeleteCheckedProductsPopupOpen);
    console.log(checkedProducts)
  }

  //добавить id продукта в массив удаляемых продуктов
  const addProductIdToArr = (id) => {
    setCheckedProducts([id, ...checkedProducts])
  }

  //удалить id продукта из массива удаляемых продуктов
  const removeProductIdFromArr = (id) => {
    setCheckedProducts((state) => state.filter((i) => i !==  id))
  }

  //удалить выбранные продукты из стейта (не работает)
  const deleteCheckedProducts = (checkedProducts) => {
    setProducts((state) => state.filter((p) => !(checkedProducts.includes(p.id))));
    setProductsState(products);
  }

  //удалить выбранные продукты (не работает)
  const handleDeleteCheckedProducts = () => {
    deleteCheckedProducts(checkedProducts);
    setCheckedProducts([]);
    handleDeleteCheckedProductsPopupOpen();
  }

  //открыть попап создания ссылки
  const createLinkPopupOpen = () => {
    setIsCreateLinkPopupOpen(!isCreateLinkPopupOpen);
}
  //новый список ссылок после создания новой ссылки
  const newUrlListAfterCreate = (urlData) => {
    let data = [...updateProduct.product_urls, urlData  ];
    return data;
  }

  //создать новую ссылку
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

  //открыть попап редактирования ссылки
  const handleUpdateLinkPopupOpen = () => {
    setIsUpdateLinkPopupOpen(!isUpdateLinkPopupOpen);
  }

  //новый список ссылок после изменения одной
  const newUrlListAfterUpdate = (urlData) => {
    let data = [...updateProduct.product_urls];
    const pos = data.map(d => d.id).indexOf(indexOfProduct);
    data[pos] = urlData;
    console.log(data);
    return data;
  }

  //изменить стейт списка ссылок после редактирования или удаления одной
  const handleUpdateProductUrl = (newUrlList) => {
    const newProducts = products.map(p => {
        if (p.id === updateProduct.id) {
            return {...p,
                product_urls: newUrlList}
        }
        return p;
    })
    setProducts(newProducts);
    setProductsState(newProducts);
    getUpdateProduct({});
    console.log(newProducts)
  }

  //изменить ссылку
  const updateUrl = (urlData) => {
    const url = updateProduct.product_urls.find(item => item.id === indexOfProduct);
    urlsApi.updateProductUrl(url.id, urlData)
    .then(res => {
      handleUpdateProductUrl(newUrlListAfterUpdate(res));
    })
    .catch(err => console.log(err));
    handleUpdateLinkPopupOpen()
  }

  //открыть попап удаления ссылки
  const deleteLinkPopupOpen = () => {
    setIsDeleteLinkPopupOpen(!isDeleteLinkPopupOpen);
  }

  //новый список ссылок после удаления одной
  const newUrlListAfterDelete = () => {
    let data = [...updateProduct.product_urls];
    const pos = data.map(d => d.id).indexOf(indexOfProduct);
    data.splice(pos, 1);
    setIndexOfProduct(null);
    console.log(data);
    return data;
  }

  //удалить ссылку
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

  //фильтрация стейта по строке
  const filterProductsByName = (searchStr) => {
    console.log(searchStr);
    setProductsState(state => state.filter(p => p.name.toLowerCase().includes(searchStr)));
  }

  //фильтрация стейта по группе
  const filterProductsByGroup = (groupId) => {
    setProductsState(state => state.filter(p => (p.group.id.toString() === groupId)));
  }

  //фильтрация стейта по региону
  const filterProductsByRegion = (regionId) => {
    setProductsState(state => state.filter(p => p.product_urls.find(u => u.region?.id.toString() === regionId)));
  }

  //фильтрация стейта по цене
  const filterProductsByPrice = (min_price, max_price) => {
    if (min_price && max_price === '') {
      setProductsState(state => state.filter(p => (p.base_price > min_price)));
      return;
    }
    if (min_price === '' && max_price) {
      setProductsState(state => state.filter(p => (p.base_price < max_price)));
      return;
    } else {
      setProductsState(state => state.filter(p => (p.base_price > min_price && p.base_price < max_price)));
      return;
    }
  }

  //фильтрация стейта
  const filterProductsAllTheWay = ({active, competitor, region_id, group_id, category, min_price, max_price}) => {
    if (region_id !== '') {
      filterProductsByRegion(region_id)
    }
    if (group_id !== '') {
      filterProductsByGroup(group_id)
    }
    if (min_price || max_price) {
      filterProductsByPrice(min_price, max_price)
    }
  }

  //отменить фильтрацию
  const unfilterProducts = () => {
    console.log('dfgh');
    setProductsState(products);
  }

  const byField = (field) => {
    return (a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    }
  }

  const byFieldDown = (field) => {
    return (a, b) => {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    }
  }

  const sortByName = (mode) => {
    if (mode === 1) {
      setProductsState(state => state.slice().sort(byField('id')));
      return;
    }
    if (mode === 2) {
      setProductsState(state => state.slice().sort(byField('name')));
      return;
    }
    if (mode === 0) {
      setProductsState(state => state.slice().sort(byFieldDown('name')));
      return;
    }
  }

  const sortByBasePrice = (mode) => {
    if (mode === 1) {
      setProductsState(state => state.slice().sort(byField('id')));
      return;
    }
    if (mode === 2) {
      setProductsState(state => state.slice().sort(byField('base_price')));
      return;
    }
    if (mode === 0) {
      setProductsState(state => state.slice().sort(byFieldDown('base_price')));
      return;
    }
  }

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

  const handleAddProduct = () => {
    getUpdateProduct({});
    redirectTo('/create-product')
  }



  return(
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
        <h2>Товары</h2>
        <SearchBar handleMode={handleMode} view={view} groups={groups} regions={regions} filterProductsByName={filterProductsByName} filter={filterProductsAllTheWay} unFilter={unfilterProducts} />
      </div>
      <div>
        <Button onClick={handleAddProduct} className="m-1">Добавить новый товар</Button>
        <Button onClick={handleAddProductsFromFilePopupOpen} className="m-1">Добавить товары из файла</Button>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <SortingBar sortByName={sortByName} sortByBasePrice={sortByBasePrice} />
        <Button variant="link" onClick={handleDeleteCheckedProductsPopupOpen} disabled>Удалить выбранные</Button>
      </div>

      {productsState.map((product, i) => (
              <Product
                key={product.id}
                productData={product}
                checkProduct={checkProduct}
                handleDeleteProductId={handleDeleteProductId}
                view={view}
                deleteLinkPopupOpen={deleteLinkPopupOpen}
                deleteProductPopupOpen={deleteProductPopupOpen}
                handleUpdateLinkPopupOpen={handleUpdateLinkPopupOpen}
                handleReportingProblemPopupOpen={handleReportingProblemPopupOpen}
                getUpdateProduct={getUpdateProduct}
                handleIndexOfProduct={handleIndexOfProduct}
                createLinkPopupOpen={createLinkPopupOpen}
                />
            ))}



      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
      <AddProductsFromFilePopup isOpen={isAddProductsFromFilePopupOpen} onClose={handleAddProductsFromFilePopupOpen}/>
      <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
      <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
      <CreateLinkPopup initData={updateProduct} regions={regions} index={indexOfProduct} isOpen={isCreateLinkPopupOpen} onClose={createLinkPopupOpen} createUrl={createUrl} handleIndexOfProduct={handleIndexOfProduct} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct} />
      <UpdateLinkPopup initData={updateProduct} regions={regions} index={indexOfProduct} isOpen={isUpdateLinkPopupOpen} onClose={handleUpdateLinkPopupOpen} handleIndexOfProduct={handleIndexOfProduct} updateUrl={updateUrl} getUpdateProduct={getUpdateProduct}  />
      <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />

    </Container>
  )
}

export default Products;