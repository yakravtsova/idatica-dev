import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Accordion, Form } from "react-bootstrap";
import { ArrowLeft, TrashFill } from 'react-bootstrap-icons';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const ProductsCreate = ({
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

    const [ form, setForm ] = useState({
      name: '',
      base_price: '',
      own_vendor_code: '',
      group_id: '',
      brand: '',
      purchase_price: '',
      category_id: '',
      is_active: true,
      product_urls: [{ url: '', region_id: '', custom_region: '', vendor_sku: ''}]
    });

    const navigate = useNavigate();

    const [ errors, setErrors ] = useState({
    });

    const [ firstFocused, setFirstFocused ] = useState({
      product_urls: [{ url: false, region_id: false, custom_region: false, vendor_sku: false}]
    });

    const [ isValid, setIsValid ] = useState(false);

    const [ category, setCategory ] = useState({
        name: ''
    });

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }

    useEffect(() => {
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
            const urlErr = Array.from(Array(urls.length), () => {
              return { url: '', region_id: '', custom_region: '', vendor_sku: ''};
            });
            const urlFocused = Array.from(Array(urls.length), () => {
              return { url: false, region_id: false, custom_region: false, vendor_sku: false};
            })
            setForm({
              ...form,
              name: initData.name,
              base_price: initData.base_price,
              own_vendor_code: initData.own_vendor_code,
              group_id: initData.group.id,
              brand: initData.brand,
              purchase_price: initData.purchase_price,
              category_id: initData?.category?.id,
              is_active: initData.is_active,
              product_urls: urls
            });
            setErrors({product_urls: urlErr});
            setFirstFocused({product_urls: urlFocused});
            return;
        }
        else {
          setErrors({product_urls: [{ url: '', region_id: '', custom_region: '', vendor_sku: ''}]});
          if (group.id) {
            setForm({
                ...form,
                group_id: group.id
              });
              return;
        } else if (defaultGroupId) {
            setForm({
                ...form,
                group_id: defaultGroupId.id,
                product_urls: [{ url: '', region_id: regions[0]?.id, custom_region: '', vendor_sku: ''}]
              });
              return;
        }
        else {
          setForm({
            ...form,
            'group_id': '',
          });
        }
        }
    },[groups, regions]);

    useEffect(() => {
      setIsValid(document.querySelector('.product-form').checkValidity() && !hasErrors(errors))
    //  console.log(errors)
    }, [errors])

    const hasErrors = (object) => {
      let has = false;
      for (let key in object) {
        if (typeof object[key] === 'object') {
          const arr = object[key];
          arr.forEach(el => {
            for (let key in el) {
              has = has || el[key]
            }
          })
        }
        else {
          has = has || object[key]
        }
      }
      return Boolean(has);
    }

    const setFocused = (obj) => {
      let object = obj;
      console.log(obj)
      for (let key in object) {
        if (typeof object[key] === 'object') {
          const arr = object[key];
          arr.forEach(el => {
            for (let key in el) {
              el[key] = true
            }
            return el;
          })
        }
        else {
          object = {...object, key: true}
        }
      }
      console.log(object)
      setFirstFocused(object)
    }

    const handleChange = (e) => {
      const target = e.target;
      const name = target.name;
      const value = target.type === 'checkbox' ? target.checked ? true : false : target.value;
      const errState = {...errors, [name]: target.validationMessage };
      setForm({...form, [name]: value});
      console.log({...form, [name]: value});
      setErrors(errState);
    };

    const handleFormChange = (i, e) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      let data = [...form.product_urls];
      data[i][name] = value;
      let errorsData = [...errors.product_urls];
      errorsData[i][name] = target.validationMessage;
      setForm({...form, product_urls: data});
      setErrors({...errors, product_urls: errorsData});
    }

    const handleFormUrlChange = (i, e) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      let data = [...form.product_urls];
      data[i][name] = value;
      let isError = validator.isURL(value);
      let errorsData = [...errors.product_urls];
      errorsData[i][name] = !isError ? 'Вы указали некорректную ссылку' : target.validationMessage;
      setForm({...form, product_urls: data});
      setErrors({...errors, product_urls: errorsData});
    }

  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  const showUrlErrors = (i, e) => {
    const name = e.target.name;
    let focused = [...firstFocused.product_urls];
    focused[i][name] = true;
    setFirstFocused({...firstFocused, product_urls: focused});
  }


  const setCategoryId = (e) => {
    handleChange(e);
    setCategory({...category, name: ''});
    console.log(form.category_id)
  }

  const handleCategory = (e) => {
    setCategory({...category, 'name': e.target.value});
  }

  const addFields = () => {
    setField('product_urls', [...form.product_urls, { url: '', region_id: regions[0]?.id, custom_region: '', vendor_sku: ''}]);
    setErrors({...errors, product_urls: [...errors.product_urls, { url: '', region_id: '', custom_region: '', vendor_sku: ''}]});
    setFirstFocused({...firstFocused, product_urls: [...firstFocused.product_urls, { url: false, region_id: false, custom_region: false, vendor_sku: false}]});
  }

  const removeFields = (index) => {
    let data = [...form.product_urls];
    data.splice(index, 1);
    setField('product_urls', data);
    let errData = [...errors.product_urls];
    errData.splice(index, 1);
    setErrors({...errors, product_urls: errData});
    let focused = [...firstFocused.product_urls];
    focused.splice(index, 1);
    setFirstFocused({...firstFocused, product_urls: focused});
  }

  const setRegion = (i, e) => {
    const target = e.target;
    const value = target.value;
    let data = [...form.product_urls];
    data[i]['region_id'] = value;
    data[i]['custom_region'] = '';
    setField('product_urls', data);
    let errorsData = [...errors.product_urls];
    errorsData[i].custom_region = !value ? 'Введите регион' : '';
    const errState = {...errors, product_urls: errorsData};
    setForm({...form, product_urls: data});
    setErrors(errState);
  }

  const setCustomRegion = (i, e) => {
    const target = e.target;
    const value = target.value;
    let data = [...form.product_urls];
    data[i]['region_id'] = '';
    data[i]['custom_region'] = value;
    setField('product_urls', data);
    let errorsData = [...errors.product_urls];
    errorsData[i].custom_region = !value && !form.region_id ? 'Введите регион' : '';
    const errState = {...errors, product_urls: errorsData};
    setForm({...form, product_urls: data});
    setErrors(errState);
    console.log(errState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
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
    else {
      setFocused(firstFocused);
      console.log(firstFocused.product_urls[0].custom_region && errors.product_urls[0].custom_region)
    }
  }


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h2>{initData.id ? "Редактирование товара" : "Новый товар"}</h2>
                <div>
                  <Button variant="btn-outline-primary" className="btn-outline-primary">Добавить из файла</Button>
                  <Button variant="secondary" className="m-2" onClick={() => navigate(-1)}><ArrowLeft /> Назад</Button>
                </div>
            </div>

            <Form noValidate onSubmit={handleSubmit} className="product-form">

                <div className="d-flex align-items-center">
                  <Form.Group className="m-1 position-relative flex-grow-1">
                    <Form.Label className="m-0">Название товара <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Название *"
                      name="name"
                      value={form?.name || ''}
                      required
                      onChange={handleChange}
                      onBlur={showErrors}
                      maxLength={100}
                      isInvalid={firstFocused.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {firstFocused.name && errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="m-1 position-relative flex-grow-1">
                    <Form.Label className="m-0">Ваша цена</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ваша цена"
                      name="base_price"
                      value={form?.base_price || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="m-1 position-relative flex-grow-1">
                    <Form.Label className="m-0">Ваша цена</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ваш артикул"
                      name="own_vendor_code"
                      value={form?.own_vendor_code || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="m-1 position-relative flex-grow-1">
                    <Form.Label className="m-0">Группа <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={form?.group_id || ''}
                      name="group_id"
                      onChange={handleChange}
                      onBlur={showErrors}
                      isInvalid={firstFocused.group_id && errors.group_id}
                      required>
                        <option value=''>Группа *</option>
                        {groups.map((group, i) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {firstFocused.group_id && errors.group_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                    <Form.Check className="m-1">
                      <Form.Check.Input
                        value={form?.is_active}
                        checked={form?.is_active}
                        type="checkbox"
                        name="is_active"
                        onChange={handleChange}
                      //  defaultChecked
                      />
                    </Form.Check>
                </div>

                {form.product_urls.map((item ,i) => {
                    return(
                        <div key={i} className="d-flex align-items-center">
                          <Form.Group className="m-1 position-relative flex-grow-1">
                            <Form.Label className="m-0">Ссылка на товар <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="url"
                              placeholder="Ссылка на товар *"
                              name="url"
                              value={form.product_urls[i].url || ''}
                              onChange={(e) => handleFormUrlChange(i, e)}
                              onBlur={(e) => showUrlErrors(i, e)}
                              isInvalid={firstFocused?.product_urls[i]?.url && errors.product_urls[i].url}
                              required
                            />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {firstFocused?.product_urls[i]?.url && errors.product_urls[i].url}
                          </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="m-1 position-relative flex-grow-1">
                            <Form.Label className="m-0">Регион</Form.Label>
                            <Form.Select
                              name="region_id"
                              value={form.product_urls[i].region_id || ''}
                              onChange={(e) => setRegion(i, e)}>
                                {regions.map((region, i) => (
                                  <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                                <option value=''>Другой регион</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="m-1 position-relative flex-grow-1">
                            <Form.Label className="m-0">Другой регион {!(form.product_urls[i].region_id) && <span className="text-danger">*</span>}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={!(form.product_urls[i].region_id) ? 'Другой регион *' : 'Другой регион'}
                              name="custom_region"
                              value={form.product_urls[i].custom_region || ''}
                              onChange={(e) => setCustomRegion(i, e)}
                              onBlur={(e) => showUrlErrors(i, e)}
                              isInvalid={firstFocused?.product_urls[i]?.custom_region && errors.product_urls[i].custom_region}
                              disabled={!!(form.product_urls[i].region_id)}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {firstFocused?.product_urls[i]?.custom_region && errors.product_urls[i].custom_region}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="m-1 position-relative flex-grow-1">
                            <Form.Label className="m-0">Артикул</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Артикул"
                              name="vendor_sku"
                              value={form.product_urls[i].vendor_sku || ''}
                              onChange={(e) => handleFormChange(i, e)}
                            />
                          </Form.Group>
                            {(form.product_urls.length > 1) && <Button onClick={() => removeFields(i)}><TrashFill /></Button>}
                        </div>
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
                        <Form.Group className="m-1 flex-grow-1">
                          <Form.Label className="m-0">Бренд</Form.Label>
                          <Form.Control
                            className="m-1"
                            name="brand"
                            type="text"
                            placeholder="Бренд"
                            value={form.brand ? form.brand : ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="m-1 flex-grow-1">
                          <Form.Label className="m-0">Закупочная цена</Form.Label>
                          <Form.Control
                            className="m-1"
                            name="purchase_price"
                            type="text"
                            placeholder="Закупочная цена"
                            value={form.purchase_price ? form.purchase_price : ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="m-1 flex-grow-1">
                          <Form.Label className="m-0">Категория</Form.Label>
                          <Form.Select
                            className="m-1"
                            name="category_id"
                            value={form.category_id ? form.category_id : ''}
                            onChange={setCategoryId}
                          >
                            {categories.map((category, i) => (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                            <option value=''>Другая категория</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="m-1 flex-grow-1">
                          <Form.Label className="m-0">Категория</Form.Label>
                          <Form.Control
                            className="m-1"
                            type="text"
                            placeholder="Другая категория"
                            name="category"
                            value={category.name ? category.name : ''}
                            onChange={handleCategory}
                            disabled={!!(form.category_id)}
                          />
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="d-flex justify-content-center m-2 mb-3">
                  <Button variant="primary" type="submit" disabled={!isValid}>Сохранить</Button>
                </div>
            </Form>
        </Container>
    )
}

export default ProductsCreate;