import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";
import { TrashFill } from 'react-bootstrap-icons';
import { useFormWithValidation } from '../hooks/useFormWithValidation'

const CreateProducts = ({
  initData,
  group,
  groups,
  regions,
  defaultGroupId,
  handleUpdateProduct,
  handleCreateNewProduct,
  handleCreateCategoryAndProduct,
  handleUpdateCategoryAndProduct,
  categories }) => {

    const [ isProductActive, setIsProductActive ] = useState(true);
    const formControl = useFormWithValidation();
    const urlProps = [{ url: '', region_id: '', custom_region: '', vendor_sku: '', id: ''}];
  /*  const [ form, setForm ] = useState({
        'name': '',
        'base_price': '',
        'own_vendor_code': '',
        'group_id': '',
        'brand': '',
        'purchase_price': '',
        'is_active': isProductActive,
        'category_id': '',
        'product_urls': [{ url: '', region_id: '', custom_region: '', vendor_sku: '', id: ''}]
      });*/
    useEffect(() => {
      /*formControl.setValues({
        'name': '',
        'base_price': '',
        'own_vendor_code': '',
        'group_id': '',
        'brand': '',
        'purchase_price': '',
        'is_active': isProductActive,
        'category_id': '',
        'product_urls': [{ url: '', region_id: '', custom_region: '', vendor_sku: '', id: ''}]
      })
      console.log(formControl.values)*/
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
        formControl.setValues({
            ...formControl.values,
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
    }, [groups])

    const [ category, setCategory ] = useState({
        'name': ''
    });

    const handleCategory = (e) => {
      setCategory({...category, 'name': e.target.value});
    }
/*
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
  }*/

    const handleSubmit = (e) => {
        e.preventDefault();
      /*  if (initData.id) {
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
        }*/
        console.log(formControl.values)
    }


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h2>{initData.id ? "Редактирование товара" : "Новый товар"}</h2>
                <Button variant="btn-outline-primary" className="btn-outline-primary">Добавить из файла</Button>
            </div>

            <Form noValidate onSubmit={handleSubmit}>

                <div className="d-flex align-items-center">
                  <Form.Group className="m-1">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Название *"
                      value={formControl?.values.name || ''}
                      required
                      onChange={formControl.handleChange} />
                  </Form.Group>
                  <Form.Group className="m-1">
                    <Form.Control
                      type="text"
                      name="base_price"
                      placeholder="Ваша цена"
                      value={formControl?.values.base_price || ''}
                      onChange={formControl.handleChange} />
                  </Form.Group>
                  <Form.Group className="m-1">
                    <Form.Control
                      type="text"
                      name="own_vendor_code"
                      placeholder="Ваш артикул"
                      value={formControl?.values.own_vendor_code || ''}
                      onChange={formControl.handleChange} />
                  </Form.Group>
                  <Form.Group className="m-1">
                    <Form.Select
                      name="group_id"
                      value={formControl?.values.group_id || ''}
                      onChange={formControl.handleChange}
                      /*isInvalid={}*/
                      required>
                      <option value=''>Группа *</option>
                      {groups.map((group, i) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Check className="m-1">
                    <Form.Check.Input
                      name="is_active"
                      value={formControl?.values.is_active || true}
                      type="checkbox"
                      onChange={formControl.handleChange}
                      checked={isProductActive}
                    />
                  </Form.Check>
                </div>
                <ul className="p-0">
                {formControl.values.product_urls/*urlProps*/.map((item ,i) => {
                  return(
                    <li key={i} className="d-flex align-items-center">
                      <Form.Group className="m-1">
                        <Form.Control
                          type="url"
                          placeholder="Ссылка на товар"
                          name="url"
                        //  value={formControl?.values?.product_urls[i].url || ''}
                          //onChange={(e) => handleFormChange(i, e)}
                        />
                      </Form.Group>
                      <Form.Select
                        className="m-1"
                        name="region_id"
                      //  value={formControl?.values?.product_urls[i].region_id || ''}
                        //onChange={(e) => setRegion(i, e)}
                        required>
                          {regions.map((region, i) => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                          <option value=''>Другой регион</option>
                      </Form.Select>
                      <Form.Group className="m-1">
                        <Form.Control
                          type="text"
                          placeholder="Другой регион"
                          name="custom_region"
                        //  value={formControl?.product_urls[i]?.custom_region || ''}
                          //onChange={(e) => handleFormChange(i, e)}
                          //disabled={!!(formControl?.values?.product_urls[i].region_id)}
                        />
                      </Form.Group>

                      <Form.Control
                        className="m-1"
                        type="text"
                        placeholder="Артикул"
                        name="vendor_sku"
                      //  value={formControl?.values?.product_urls[i].vendor_sku || ''}
                        //onChange={(e) => handleFormChange(i, e)}
                      />
                      {/*(formControl.values.product_urls.length > 1) && <Button
                        //</li>onClick={() => removeFields(i)}
                        >
                            <TrashFill />
                          </Button>*/}
                    </li>
                  )
                })}
              </ul>
                <Button
                    className="m-1"
                    variant="outline-primary"
                  //  onClick={addFields}
                >
                  Добавить ссылку
                </Button>

                <Accordion className="m-1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Дополнительные поля</Accordion.Header>
                        <Accordion.Body>

                            <div className="d-flex align-items-center">
                                <Form.Control
                                  className="m-1"
                                  name="brand"
                                  type="text"
                                  placeholder="Бренд"
                                  value={formControl?.values?.brand || ''}
                                  onChange={formControl.handleChange} />
                                <Form.Control
                                  className="m-1"
                                  type="text"
                                  name="purchase_price"
                                  placeholder="Закупочная цена"
                                  value={formControl?.values?.purchase_price || ''}
                                  onChange={formControl.handleChange}
                                />
                                <Form.Select
                                  className="m-1"
                                  name="category_id"
                                  value={formControl?.values?.category_id || ''}
                                  onChange={formControl.handleChange}
                                >
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
                                  disabled={!!(formControl?.values?.category_id)}
                                />
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

export default CreateProducts;