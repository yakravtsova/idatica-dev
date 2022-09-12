import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";
import { TrashFill } from 'react-bootstrap-icons';
//import { GroupsContext } from '../contexts/GroupsContext';

const ProductsCreate = ({ initData, group, groups, defaultGroupId, handleUpdateProduct, handleCreateNewProduct }) => {
//    const groups = useContext(GroupsContext);
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        'name': '',
        'base_price': '',
        'own_vendor_code': '',
        'group_id': '',
        'brand': '',
        'purchase_price': '',
        'categoryName': '',
        'product_urls': [{}]
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
        
        if (initData.id) {
    
            setForm({
                ...form,
                'name': initData.name,
                'base_price': initData.base_price,
                'group_id': initData.group_id,
                'brand': initData.brand,
                'purchase_price': initData.purchase_price,
                'categoryName': initData.categoryName,
                'product_urls': initData.product_urls
              });
              return;
        }
        if (group.id) {
            setForm({
                ...form,
                'group_id': group.id
              });
              return;
        } else {
            setForm({
                ...form,
                'group_id': defaultGroupId,
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

    const setCategoryName = (e) => {
        setField('categoryName', e.target.value);
    }

    const addFields = () => {
        let newField = { url: '', region_id: '', vendor_sku: ''};
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initData.id) {
            handleUpdateProduct(form)
        }
        else {
            handleCreateNewProduct(form)
        }
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
                    <Form.Control className="m-1" type="text" placeholder="Ваш артикул" onChange={setOwnVendorCode}></Form.Control>

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

                    <Form.Check defaultChecked className="m-1"></Form.Check>
                </div>

                {form.product_urls.map((item ,i) => {
                    return(
                        <Form.Group key={i} className="d-flex align-items-center">
                            <Form.Control className="m-1" type="url" placeholder="Ссылка на товар" name="url" value={form.product_urls[i].url ? form.product_urls[i].url : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>

                            <Form.Select 
                                className="m-1"
                                name="region_id"
                                value={form.product_urls[i].region_id ? form.product_urls[i].region_id : ''} 
                                onChange={(e) => handleFormChange(i, e)}
                                required>
                                    <option value=''>Регион *</option>
                                    <option value="1">Санкт-Петербург и ЛО</option>
                                    <option value="2">Москва</option>
                                    <option value="3">ХМАО</option>
                            </Form.Select>

                            <Form.Control className="m-1" type="text" placeholder="Артикул" name="vendor_sku" value={form.product_urls[i].vendor_sku ? form.product_urls[i].vendor_sku : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>
                            <Button onClick={() => removeFields(i)}><TrashFill /></Button>
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
                                <Form.Control className="m-1" type="text" placeholder="Бренд" onChange={setBrand}></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Закупочная цена" onChange={setPurchasePrice}></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Категория" onChange={setCategoryName}></Form.Control>
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