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
  groups,
  categories,
  regions,
  stores,
  redirectTo,
  getUpdateGroup,
  updateProduct,
  getUpdateProduct
}) => {
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
    setProductsList(paramsObj);
    getUpdateGroup({});
  }
  , [searchParams]);

  //?????????? id ???????????????????? ????????????????
  const handleDeleteProductId = (id) => {
    setDeleteProductId(id)
  }

  //?????????? ?????????? ?????????????????? ????????????
  const handleIndexOfProduct = (index) => {
    setIndexOfProduct(index);
  }

  //?????????????????? ?????? ????????????????
  const setProductsList = (params) => {
    productsApi.getAllProducts(params)
    .then(data => {
      const {items, size, total} = data;
      setNumOfPages(Math.ceil(total/size));
      setProducts(items);
      setProductsState(items);
    })
    .catch(err => console.log(err));
  }

  //?????????????? ?????????? ???????????????? ????????????????
  const deleteProductPopupOpen = () => {
    setIsDeleteProductPopupOpen(!isDeleteProductPopupOpen);
  }

  //?????????????? ???????? ?????????????? ???? ????????????
  const deleteOneProduct = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
    setProductsState(newProducts);
  }

  //?????????????? ???????? ??????????????
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

  //?????????????? ?????????? ???????????????? ???????????????????? ??????????????????
  const handleDeleteCheckedProductsPopupOpen = () => {
    setIsDeleteCheckedProductsPopupOpen(!isDeleteCheckedProductsPopupOpen);
    console.log(checkedProducts)
  }

  //???????????????? id ???????????????? ?? ???????????? ?????????????????? ??????????????????
  const addProductIdToArr = (id) => {
    setCheckedProducts([id, ...checkedProducts]);
    console.log(checkedProducts)
  }

  //?????????????? id ???????????????? ???? ?????????????? ?????????????????? ??????????????????
  const removeProductIdFromArr = (id) => {
    setCheckedProducts((state) => state.filter((i) => i !==  id))
    console.log(checkedProducts)
  }

  //?????????????? ?????????????????? ???????????????? ???? ????????????
  const deleteCheckedProducts = (checkedProducts) => {
    const newProducts = products.filter((p) => !(checkedProducts.includes(p.id)));
    setProducts(newProducts);
    setProductsState(newProducts);
  }

  //?????????????? ?????????????????? ????????????????
  const handleDeleteCheckedProducts = () => {
    productsApi.deleteProducts(checkedProducts)
      .then(res => {
        deleteCheckedProducts(checkedProducts);
        setCheckedProducts([]);
        handleDeleteCheckedProductsPopupOpen();
      })
      .catch(err => console.log(err))
  }

  //?????????????? ?????????? ???????????????? ????????????
  const createLinkPopupOpen = () => {
    setIsCreateLinkPopupOpen(!isCreateLinkPopupOpen);
}
  //?????????? ???????????? ???????????? ?????????? ???????????????? ?????????? ????????????
  const newUrlListAfterCreate = (urlData) => {
    let data = [...updateProduct.product_urls, urlData  ];
    return data;
  }

  //?????????????? ?????????? ????????????
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

  //?????????????? ?????????? ???????????????????????????? ????????????
  const handleUpdateLinkPopupOpen = () => {
    setIsUpdateLinkPopupOpen(!isUpdateLinkPopupOpen);
  }

  //?????????? ???????????? ???????????? ?????????? ?????????????????? ??????????
  const newUrlListAfterUpdate = (urlData) => {
    let data = [...updateProduct.product_urls];
    const pos = data.map(d => d.id).indexOf(indexOfProduct);
    data[pos] = urlData;
    console.log(data);
    return data;
  }

  //???????????????? ?????????? ???????????? ???????????? ?????????? ???????????????????????????? ?????? ???????????????? ??????????
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

  //???????????????? ????????????
  const updateUrl = (urlData) => {
    const url = updateProduct.product_urls.find(item => item.id === indexOfProduct);
    urlsApi.updateProductUrl(url.id, urlData)
    .then(res => {
      handleUpdateProductUrl(newUrlListAfterUpdate(res));
    })
    .catch(err => console.log(err));
    handleUpdateLinkPopupOpen()
  }

  //?????????????? ?????????? ???????????????? ????????????
  const deleteLinkPopupOpen = () => {
    setIsDeleteLinkPopupOpen(!isDeleteLinkPopupOpen);
  }

  //?????????? ???????????? ???????????? ?????????? ???????????????? ??????????
  const newUrlListAfterDelete = () => {
    let data = [...updateProduct.product_urls];
    const pos = data.map(d => d.id).indexOf(indexOfProduct);
    data.splice(pos, 1);
    setIndexOfProduct(null);
    console.log(data);
    return data;
  }

  //?????????????? ????????????
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

  //???????????????????? ???????????? ???? ????????????
  const filterProductsByName = (searchStr) => {
    console.log(searchStr);
    setProductsState(state => state.filter(p => p.name.toLowerCase().includes(searchStr)));
  }

  //?????????????????? ????????????: ????????????????/????????????????????????????
  const handleMode = () => {
    setView(!view);
  }

  //???????????????? ?????????????? ?? ???????????? ?????????????????? ??????????????????
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

  //???????????????????? get-??????????????????
  const setSearchParams = (newParams) => {
    const paramsObj = Object.assign(params, newParams);
    for (let key in paramsObj) {
      if (!paramsObj[key]) {
        delete params[key]
      }
    }
    setParams(paramsObj);
    navigateSearch('/products', paramsObj);
  }

  //???????????????? get-??????????????????
  const removeSearchParams = (arrOfParams) => {
    let paramsObj = params;
    for (let i = 0; i < arrOfParams.length; i++) {
      delete paramsObj[arrOfParams[i]]
    }
    setParams(paramsObj);
    navigateSearch('/products', paramsObj);
  }

  //?????????????? ???? ????????????????
  const goToPage = (num) => {
    setSearchParams({page: num})
  }

  //???????????? ???????????? ???? ?????? ???????????????? ?? ????????????????. ???????? ???? 100500, ?????????? ???????????? ???? 100500 ????????????.
  //?????????????? ?????? ?????????????????? ???? ???????????? user friendly
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
        <h2>????????????</h2>
        <SearchBar
          handleMode={handleMode}
          view={view}
          groups={groups}
          regions={regions}
          categories={categories}
          stores={stores}
          setSearchParams={setSearchParams}
          params={params}
        />
      </div>
      <div>
        <Button onClick={handleAddProduct} className="m-1">???????????????? ?????????? ??????????</Button>
        <Button onClick={handleAddProductsFromFilePopupOpen} className="m-1">???????????????? ???????????? ???? ??????????</Button>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <SortingBar view={view} setSearchParams={setSearchParams} removeSearchParams={removeSearchParams} />
        <Button variant="link" onClick={handleDeleteCheckedProductsPopupOpen}>?????????????? ??????????????????</Button>
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
        <Pagination.First onClick={() => goToPage(1)} />
          {paginationList()}
        <Pagination.Last onClick={() => goToPage(numOfPages)} />
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
        updateUrl={updateUrl}
      />
      <DeleteLinkPopup isOpen={isDeleteLinkPopupOpen} onClose={deleteLinkPopupOpen} okButtonAction={removeUrl} />

    </Container>
  )
}

export default Products;