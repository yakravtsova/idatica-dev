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
    is_active: true,  //это поле больше смысла не несёт. За него теперь поле status. Но оно не булево, а текстовое.
    product_urls: [{ url: '', region_id: regions[0]?.id, custom_region: '', vendor_sku: ''}]
  });

  const navigate = useNavigate();

  const [ errors, setErrors ] = useState({});

  const [ firstFocused, setFirstFocused ] = useState({
    product_urls: [{ url: false, region_id: false, custom_region: false, vendor_sku: false}]
  });

  const [ isValid, setIsValid ] = useState(false);
  const [ category, setCategory ] = useState({ name: '' });

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  useEffect(() => {
    //если есть initData, значит, это редактирование товара. Данными нужно заполнить форму
    if (initData.id) {
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
      });
      setForm({
        ...form,
        name: initData.name,
        base_price: initData.base_price,
        own_vendor_code: initData.own_vendor_code,
        group_id: initData.group.id,
        brand: initData.brand,
        purchase_price: initData.purchase_price,
        category_id: initData?.category?.id,
        is_active: initData.is_active,  //это поле больше смысла не несёт. За него теперь поле status. Но оно не булево, а текстовое.
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
  }, [errors])

  //функция возвращает true, если в аргументе есть непустые поля. Предусмотрен вариант, если значением поля является массив объектов
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

  //обработчик onChange на статичных полях формы
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked ? true : false : target.value;
    const errState = {...errors, [name]: target.validationMessage };
    setForm({...form, [name]: value});
    setErrors(errState);
  };

  //обработчик onChange на динамических полях формы
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

  //обработчик onChange инпута url. Валидирует его на корректность
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

  //при первом onBlur в объекте firstFocused задаёт полю с именем инпута значение true, чтобы сообщение об ошибке появлялось только после смещения фокуса. Для статичных полей
  const showErrors = (e) => {
    const name = e.target.name;
    setFirstFocused({...firstFocused, [name]: true});
  }

  //то же самое для динамических полей
  const showUrlErrors = (i, e) => {
    const name = e.target.name;
    let focused = [...firstFocused.product_urls];
    focused[i][name] = true;
    setFirstFocused({...firstFocused, product_urls: focused});
  }

  //обработчик onChange для категории из списка. Если выбирается категория из списка, полю name задаётся пустая строка
  const setCategoryId = (e) => {
    handleChange(e);
    setCategory({...category, name: ''});
  }

  //обработчик onChange для новой категории, которой нет в списке
  const handleCategory = (e) => {
    setCategory({...category, 'name': e.target.value});
  }

  //добавить поля "ссылка", "регион", "другой регион", "артикул"
  const addFields = () => {
    setField('product_urls', [...form.product_urls, { url: '', region_id: regions[0]?.id, custom_region: '', vendor_sku: ''}]);
    setErrors({...errors, product_urls: [...errors.product_urls, { url: '', region_id: '', custom_region: '', vendor_sku: ''}]});
    setFirstFocused({...firstFocused, product_urls: [...firstFocused.product_urls, { url: false, region_id: false, custom_region: false, vendor_sku: false}]});
  }

  //удалить поля "ссылка", "регион", "другой регион", "артикул"
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

  //обработчик onChange для списка уже созданных регионов. Если выбирается регион из списка, полю "custom_region" задаётся пустая строка
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

  //обработчик onChange для другого региона.
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
  }

  //обработчик onSubmit. Если введено значение для другой категории, сначала происходит её создание. После успешного создания категории создаётся/редактируется товар
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

      <Form noValidate onSubmit={handleSubmit} className="product-form d-flex flex-column align-items-center w-100">
        <div className="d-flex align-items-center w-100">
          <Form.Group className="m-1 position-relative flex-grow-1 w-25">
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
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.name && errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="m-1 position-relative flex-grow-1 w-25">
            <Form.Label className="m-0">Ваша цена</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ваша цена"
              name="base_price"
              value={form?.base_price || ''}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="m-1 position-relative flex-grow-1 w-25">
            <Form.Label className="m-0">Ваш артикул</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ваш артикул"
              name="own_vendor_code"
              value={form?.own_vendor_code || ''}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="m-1 position-relative flex-grow-1 w-25">
            <Form.Label className="m-0">Группа <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={form?.group_id || ''}
              name="group_id"
              onChange={handleChange}
              onBlur={showErrors}
              isInvalid={firstFocused.group_id && errors.group_id}
              required
            >
              <option value=''>Группа *</option>
              {groups.map((group, i) => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" tooltip>
              {firstFocused.group_id && errors.group_id}
            </Form.Control.Feedback>
          </Form.Group>
          {/*<Form.Check className="m-1">
            <Form.Check.Input
              value={form?.is_active}
              checked={form?.is_active}
              type="checkbox"
              name="is_active" //это поле больше смысла не несёт. За него теперь поле status. Но оно не булево, а текстовое.
              onChange={handleChange}
            />
              </Form.Check>*/}
        </div>
        {form.product_urls.map((item ,i) => {
          return(
            <div key={i} className="d-flex align-items-end w-100">
              <Form.Group className="m-1 position-relative flex-grow-1 w-25">
                <Form.Label className="m-0">Ссылка на товар <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Ссылка на товар *"
                  name="url"
                  value={form.product_urls[i].url || ''}
                  onChange={(e) => handleFormUrlChange(i, e)}
                  onBlur={(e) => showUrlErrors(i, e)}
                  isInvalid={firstFocused?.product_urls[i]?.url && errors.product_urls[i].url}
                  autoComplete="off"
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {firstFocused?.product_urls[i]?.url && errors.product_urls[i].url}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1 position-relative flex-grow-1 w-25">
                <Form.Label className="m-0">Регион</Form.Label>
                <Form.Select
                  name="region_id"
                  value={form.product_urls[i].region_id || ''}
                  onChange={(e) => setRegion(i, e)}
                >
                  {regions.map((region, i) => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                  <option value=''>Другой регион</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="m-1 position-relative flex-grow-1 w-25">
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
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {firstFocused?.product_urls[i]?.custom_region && errors.product_urls[i].custom_region}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1 position-relative flex-grow-1 w-25">
                <Form.Label className="m-0">Артикул</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Артикул"
                  name="vendor_sku"
                  value={form.product_urls[i].vendor_sku || ''}
                  onChange={(e) => handleFormChange(i, e)}
                  autoComplete="off"
                />
              </Form.Group>
              {(form.product_urls.length > 1) && <Button className="m-1" onClick={() => removeFields(i)}><TrashFill /></Button>}
            </div>
          )
        })}
        <Button
          className="m-1 align-self-start"
          variant="outline-primary"
          onClick={addFields}
        >
          Добавить ссылку
        </Button>
        <Accordion className="m-1 w-100">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Дополнительные поля</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex align-items-center">
                <Form.Group className="m-1 flex-grow-1 w-25">
                  <Form.Label className="m-0">Бренд</Form.Label>
                  <Form.Control
                    name="brand"
                    type="text"
                    placeholder="Бренд"
                    value={form.brand ? form.brand : ''}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="m-1 flex-grow-1 w-25">
                  <Form.Label className="m-0">Закупочная цена</Form.Label>
                  <Form.Control
                    name="purchase_price"
                    type="text"
                    placeholder="Закупочная цена"
                    value={form.purchase_price ? form.purchase_price : ''}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="m-1 flex-grow-1 w-25">
                  <Form.Label className="m-0">Категория</Form.Label>
                  <Form.Select
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
                <Form.Group className="m-1 flex-grow-1 w-25">
                  <Form.Label className="m-0">Другая категория</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Другая категория"
                      name="category"
                      value={category.name ? category.name : ''}
                      onChange={handleCategory}
                      disabled={!!(form.category_id)}
                      autoComplete="off"
                    />
                </Form.Group>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <p className="align-self-start m-1" style={{fontSize: "12px"}}><span className="text-danger">*</span> &mdash; поле обязательно для заполнения</p>
        <Button className="m-2" variant="primary" type="submit" disabled={!isValid}>Сохранить</Button>
      </Form>
    </Container>
  )
}

export default ProductsCreate;