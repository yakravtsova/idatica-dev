import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigateSearch } from '../hooks/useNavigateSearch';
import { Container, Button, Pagination } from 'react-bootstrap';
import SearchBar from './SearchBar';
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
  categories,
  regions,
  stores,
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
  const [searchParams] = useSearchParams();
  const [numOfPages, setNumOfPages] = useState();
  const [params, setParams] = useState({});
  const navigateSearch = useNavigateSearch();

  useEffect(() => {
    getUpdateProduct({});
    const paramsObj = Object.fromEntries([...searchParams]);
    setParams(paramsObj);
  //  console.log(Object.fromEntries([...searchParams]));
  /*  if (group.id) {
      setGroupProductsList();
    //  setProductsState(products);
      getUpdateGroup({});
      return;
    }*/
    setProductsList(paramsObj);
    getUpdateGroup({});
  //  setProductsState(products);
  }
  , [searchParams]);

  //берём id удаляемого продукта
  const handleDeleteProductId = (id) => {
    setDeleteProductId(id)
  }

  //берём номер удаляемой ссылки
  const handleIndexOfProduct = (index) => {
    setIndexOfProduct(index);
  }

  //загрузить все продукты
  const setProductsList = (params) => {
    productsApi.getAllProducts(params)
    .then(data => {
      const {items, size, total} = data;
      console.log(total);
    //  const items = data.items;
      setNumOfPages(Math.ceil(total/size));
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
    setCheckedProducts([id, ...checkedProducts]);
    console.log(checkedProducts)
  }

  //удалить id продукта из массива удаляемых продуктов
  const removeProductIdFromArr = (id) => {
    setCheckedProducts((state) => state.filter((i) => i !==  id))
    console.log(checkedProducts)
  }

  //удалить выбранные продукты из стейта (не работает)
  const deleteCheckedProducts = (checkedProducts) => {
    const newProducts = products.filter((p) => !(checkedProducts.includes(p.id)));
    setProducts(newProducts);
    setProductsState(newProducts);
  }

  //удалить выбранные продукты (не работает)
  const handleDeleteCheckedProducts = () => {
    productsApi.deleteProducts(checkedProducts)
      .then(res => {
        deleteCheckedProducts(checkedProducts);
        setCheckedProducts([]);
        handleDeleteCheckedProductsPopupOpen();
      })
      .catch(err => console.log(err))
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

  const setSearchParams = (newParams) => {
  //  const paramsObj = {...params, newParams};
    const paramsObj = Object.assign(params, newParams);
    for (let key in paramsObj) {
      if (!paramsObj[key]) {
        delete params[key]
      }
    }
    console.log(paramsObj);
    setParams(paramsObj);
    navigateSearch('/products', paramsObj);
  }

  const removeSearchParams = (arrOfParams) => {
    let paramsObj = params;
    for (let i = 0; i < arrOfParams.length; i++) {
      delete paramsObj[arrOfParams[i]]
    }
    setParams(paramsObj);
    navigateSearch('/products', paramsObj);
  }

  const goToPage = (num) => {
    setSearchParams({page: num})
  }

  const paginationList = () => {
    let pages = [];
    for (let i = 0; i < numOfPages; i++) {
      pages.push(<Pagination.Item key={i} onClick={() => goToPage(i + 1)}>{i + 1}</Pagination.Item>)
    }
    return pages;
  }

  return(
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
        <h2>Товары</h2>
        <SearchBar
          handleMode={handleMode}
          view={view}
          groups={groups}
          regions={regions}
          categories={categories}
          stores={stores}
          setSearchParams={setSearchParams}
          params={params}
          filterProductsByName={filterProductsByName} />
      </div>
      <div>
        <Button onClick={handleAddProduct} className="m-1">Добавить новый товар</Button>
        <Button onClick={handleAddProductsFromFilePopupOpen} className="m-1">Добавить товары из файла</Button>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <SortingBar view={view} setSearchParams={setSearchParams} removeSearchParams={removeSearchParams} />
        <Button variant="link" onClick={handleDeleteCheckedProductsPopupOpen}>Удалить выбранные</Button>
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

      <Pagination>
        <Pagination.First />
          {paginationList()}
        <Pagination.Last />
      </Pagination>

      <ReportingProblemPopup isOpen={isReportingProblemPopupOpen} onClose={handleReportingProblemPopupOpen} />
      <AddProductsFromFilePopup isOpen={isAddProductsFromFilePopupOpen} onClose={handleAddProductsFromFilePopupOpen}/>
      <DeleteProductPopup isOpen={isDeleteProductPopupOpen} onClose={deleteProductPopupOpen} okButtonAction={handleDeleteOneProduct} />
      <DeleteCheckedProductsPopup isOpen={isDeleteCheckedProductsPopupOpen} onClose={handleDeleteCheckedProductsPopupOpen} okButtonAction={handleDeleteCheckedProducts} />
      <CreateLinkPopup regions={regions} isOpen={isCreateLinkPopupOpen} onClose={createLinkPopupOpen} createUrl={createUrl} />
      <UpdateLinkPopup
        initData={updateProduct}
        regions={regions}
        index={indexOfProduct}
        isOpen={isUpdateLinkPopupOpen}
        onClose={handleUpdateLinkPopupOpen}
        handleIndexOfProduct={handleIndexOfProduct}
        getUpdateProduct={getUpdateProduct}
      updateUrl={updateUrl} />
      <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />

    </Container>
  )
}

export default Products;