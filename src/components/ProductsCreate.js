import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";
import { TrashFill } from 'react-bootstrap-icons';
//import { GroupsContext } from '../contexts/GroupsContext';

const ProductsCreate = ({ initData, group, groups, regions, defaultGroupId, handleUpdateProduct, handleCreateNewProduct, handleCreateCategoryAndProduct, handleUpdateCategoryAndProduct, categories }) => {
//    const groups = useContext(GroupsContext);
    const navigate = useNavigate();
    const [ isProductActive, setIsProductActive ] = useState(true);
    const [ form, setForm ] = useState({
        'name': '',
        'base_price': '',
        'own_vendor_code': '',
        'group_id': '',
        'brand': '',
        'purchase_price': '',
        'is_active': isProductActive,
        'category_id': '',
        'product_urls': [{ url: '', region_id: '', custom_region: '', vendor_sku: '', id: ''}]
      });

    const [ category, setCategory ] = useState({
        'name': ''
    });

    const redirectToProducts = () => {
        navigate('/products', {replace: true})
    }

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }


    useEffect(() => {
        console.log(groups);
      //  setRegionsList();

        if (initData.id) {
            console.log(initData);
            const urls = initData.product_urls.map(u => {
              const container = {};
              container['url'] = u.url;
              container['region_id'] = u.region?.id;
              container['custom_region'] = u.custom_region;
              container['vendor_sku'] = u.vendor_sku;
              container['id'] = u.id;
              return container;
            });
            setForm({
                ...form,
                'name': initData.name,
                'base_price': initData.base_price,
                'own_vendor_code': initData.own_vendor_code,
                'group_id': initData.group.id,
                'brand': initData.brand,
                'purchase_price': initData.purchase_price,
                'category_id': initData?.category?.id,
                'is_active': initData.is_active,
                'product_urls': urls
              });
              return;
        }
        if (group.id) {
            setForm({
                ...form,
                'group_id': group.id
              });
              return;
        } else if (defaultGroupId) {
            setForm({
                ...form,
                'group_id': defaultGroupId.id,
              });
              return;
        }
        else {
          setForm({
            ...form,
            'group_id': '',
          });
        }
    },[groups]);

    const setName = (e) => {
      setField('name', e.target.value);
    }

    const setBasePrice = (e) => {
        setField('base_price', e.target.value);
    }

    const setOwnVendorCode = (e) => {
        setField('own_vendor_code', e.target.value);
    }

    const setGroupId = (e) => {
        setField('group_id', e.target.value);
    }

    const setBrand = (e) => {
        setField('brand', e.target.value);
    }

    const setPurchasePrice = (e) => {
        setField('purchase_price', e.target.value);
    }

    const setCategoryId = (e) => {
      setField('category_id', e.target.value);
      setCategory({...category, name: ''});
      console.log(form.category_id)
    }

    const handleCategory = (e) => {
      setCategory({...category, 'name': e.target.value});
    }

    const setIsActive = (e) => {
      setField('is_active', e.target.checked);
      setIsProductActive(!isProductActive);
  }

    const addFields = () => {
        let newField = { url: '', region_id: '', custom_region: '', vendor_sku: ''};
        setField('product_urls', [...form.product_urls, newField]);
    }

    const removeFields = (index) => {
        let data = [...form.product_urls];
        data.splice(index, 1);
        setField('product_urls', data);
    }

    const handleFormChange = (i, e) => {
        let data = [...form.product_urls];
        data[i][e.target.name] = e.target.value;
        setField('product_urls', data);
    }

    const setRegion = (i, e) => {
      let data = [...form.product_urls];
      data[i]['region_id'] = e.target.value;
      data[i]['custom_region'] = '';
      setField('product_urls', data);
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initData.id) {
          if (category.name) {
            handleUpdateCategoryAndProduct(category, form);
          }
          else {
            handleUpdateProduct(form)
          }
        }
        else {
            if (category.name) {
              handleCreateCategoryAndProduct(category, form);
            }
            else {
              handleCreateNewProduct(form)
            }

          //  handleCreateNewProduct(form)
        }
        console.log(form)
    }


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h2>{initData.id ? "Редактирование товара" : "Новый товар"}</h2>
                <Button variant="btn-outline-primary" className="btn-outline-primary">Добавить из файла</Button>
            </div>

            <Form noValidate onSubmit={handleSubmit}>

                <div className="d-flex align-items-center">
                    <Form.Control className="m-1" type="text" placeholder="Название *" value={form.name ? form.name : ''} required onChange={setName}></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваша цена" value={form.base_price ? form.base_price : ''} onChange={setBasePrice}></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваш артикул" value={form.own_vendor_code ? form.own_vendor_code : ''} onChange={setOwnVendorCode}></Form.Control>

                    <Form.Select
                        className="m-1"
                        value={form.group_id ? form.group_id : ''}
                        onChange={setGroupId}
                        /*isInvalid={}*/
                        required>
                            <option value=''>Группа *</option>
                            {groups.map((group, i) => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                    </Form.Select>

                    <Form.Check className="m-1">
                      <Form.Check.Input
                        value={form.is_active ? form.is_active : true}
                        type="checkbox"
                        onChange={setIsActive}
                        checked={isProductActive}
                      />
                    </Form.Check>
                </div>

                {form.product_urls.map((item ,i) => {
                    return(
                        <Form.Group key={i} className="d-flex align-items-center">
                            <Form.Control className="m-1" type="url" placeholder="Ссылка на товар" name="url" value={form.product_urls[i].url ? form.product_urls[i].url : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>

                            <Form.Select
                                className="m-1"
                                name="region_id"
                                value={form.product_urls[i].region_id ? form.product_urls[i].region_id : ''}
                                onChange={(e) => setRegion(i, e)}
                                required>
                                    {regions.map((region, i) => (
                                        <option key={region.id} value={region.id}>{region.name}</option>
                                    ))}
                                    <option value=''>Другой регион</option>
                            </Form.Select>
                            <Form.Control
                              className="m-1"
                              type="text"
                              placeholder="Другой регион"
                              name="custom_region"
                              value={form.product_urls[i].custom_region ? form.product_urls[i].custom_region : ''}
                              onChange={(e) => handleFormChange(i, e)}
                              disabled={!!(form.product_urls[i].region_id)}>
                              </Form.Control>
                            <Form.Control className="m-1" type="text" placeholder="Артикул" name="vendor_sku" value={form.product_urls[i].vendor_sku ? form.product_urls[i].vendor_sku : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>
                            {(form.product_urls.length > 1) && <Button onClick={() => removeFields(i)}><TrashFill /></Button>}
                        </Form.Group>
                    )
                })}

                <Button
                    className="m-1"
                    variant="outline-primary"
                    onClick={addFields}>
                        Добавить ссылку
                </Button>

                <Accordion className="m-1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Дополнительные поля</Accordion.Header>
                        <Accordion.Body>

                            <div className="d-flex align-items-center">
                                <Form.Control className="m-1" type="text" placeholder="Бренд" value={form.brand ? form.brand : ''} onChange={setBrand}></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Закупочная цена" value={form.purchase_price ? form.purchase_price : ''} onChange={setPurchasePrice}></Form.Control>
                                <Form.Select
                                className="m-1"
                                name="category_id"
                                value={form.category_id ? form.category_id : ''}
                                onChange={setCategoryId}
                                required>
                                    {categories.map((category, i) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                    <option value=''>Другая категория</option>
                                </Form.Select>
                                <Form.Control
                                  className="m-1"
                                  type="text"
                                  placeholder="Другая категория"
                                  name="category"
                                  value={category.name ? category.name : ''}
                                  onChange={handleCategory}
                                  disabled={!!(form.category_id)}>
                                </Form.Control>
                                </div>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


                <div className="d-flex justify-content-center m-2 mb-3">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Сохранить</Button>
                </div>

            </Form>

        </Container>
    )
}

export default ProductsCreate;