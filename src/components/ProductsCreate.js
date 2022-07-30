import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";

const ProductsCreate = ({ initData, handleProductsCreate }) => {
    const [ form, setForm ] = useState({
        ['name']: '',
        ['basePrice']: '',
        ['ownVendorCode']: '',
        ['groupId']: '',
        ['productUrls']: [{}]
      });
    
    const navigate = useNavigate();
    const {name, basePrice, groupId} = initData;
    
    const redirectToProducts = () => {
        navigate("/products", {replace: true})
    }

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }
    

    useEffect(() => {
        if (initData.id) {
            const productUrls=initData.productUrls.map (item => {
                return {
                    url: item.url,
                    regionName: item.regionName,
                    vendorCode: item.vendorCode
                }
            });
    
            setForm({
                ...form,
                ['name']: name,
                ['basePrice']: basePrice,
                ['groupId']: groupId,
                ['productUrls']: productUrls
              });

        }
        
    },[]);
    

    const setName = (e) => {
      setField('name', e.target.value);
    }

    const setBasePrice = (e) => {
        setField('basePrice', e.target.value);
    }

    const setOwnVendorCode = (e) => {
        setField('ownVendorCode', e.target.value);
    }

    const setGroupId = (e) => {
        setField('groupId', e.target.value);
    }

    const addFields = () => {
        let newField = { url: '', regionName: '', vendorCode: ''};
        setField('productUrls', [...form.productUrls, newField]);
    }

    const handleFormChange = (i, e) => {
        let data = [...form.productUrls];
        data[i][e.target.name] = e.target.value;
        setField('productUrls', data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProductsCreate(form);
        
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
                    <Form.Control className="m-1" type="text" placeholder="Ваша цена" value={form.basePrice ? form.basePrice : ''} onChange={setBasePrice}></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваш артикул" onChange={setOwnVendorCode}></Form.Control>

                    <Form.Select 
                        className="m-1"  
                        value={form.groupId ? form.groupId : ''}
                        onChange={setGroupId} 
                        /*isInvalid={}*/
                        required>
                            <option value=''>Группа *</option>
                            <option value="1">Коррозия Металла</option>
                            <option value="2">ВИА Песняры</option>
                            <option value="3">Комбинация</option>
                    </Form.Select>

                    <Form.Check defaultChecked className="m-1"></Form.Check>
                </div>

                {form.productUrls.map((item ,i) => {
                    return(
                        <Form.Group key={i} className="d-flex align-items-center">
                            <Form.Control className="m-1" type="url" placeholder="Ссылка на товар" name="url" value={form.productUrls[i].url ? form.productUrls[i].url : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>

                            <Form.Select 
                                className="m-1"
                                name="regionName"
                                value={form.productUrls[i].regionName ? form.productUrls[i].regionName : ''} 
                                onChange={(e) => handleFormChange(i, e)}
                                required>
                                    <option value=''>Регион *</option>
                                    <option value="1">Санкт-Петербург и ЛО</option>
                                    <option value="2">Москва</option>
                                    <option value="3">ХМАО</option>
                            </Form.Select>

                            <Form.Control className="m-1" type="text" placeholder="Артикул" name="vendorCode" value={form.productUrls[i].vendorCode ? form.productUrls[i].vendorCode : ''} onChange={(e) => handleFormChange(i, e)}></Form.Control>
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
                                <Form.Control className="m-1" type="text" placeholder="Бренд"></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Закупочная цена"></Form.Control>
                                <Form.Control className="m-1" type="text" placeholder="Категория"></Form.Control>
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