import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Accordion, Form} from "react-bootstrap";

const ProductsCreate = ({ handleProductsCreate }) => {
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ urlForm, setUrlForm ] = useState({});
    const [ nameError, setUsernameError ] = useState('');
    const [ groupError, setPhoneError ] = useState('');
    const [ urlError, setCompanyError ] = useState('');
    const [ tariffIdError, setTariffIdError ] = useState('');
    const [ inputUrlFields, setInputUrlFields ] = useState([{}]);
    
    const navigate = useNavigate();

    const redirectToProducts = () => {
        navigate("/products", {replace: true})
    }

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }

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
        setInputUrlFields([...inputUrlFields, newField]);
    }

    const handleFormChange = (i, e) => {
        let data = [...inputUrlFields];
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
                <h2>Новый товар</h2>
                <Button variant="btn-outline-primary" className="btn-outline-primary">Добавить из файла</Button>
            </div>

            <Form noValidate onSubmit={handleSubmit}>

                <div className="d-flex align-items-center">
                    <Form.Control className="m-1" type="text" placeholder="Название *" required onChange={setName}></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваша цена" onChange={setBasePrice}></Form.Control>
                    <Form.Control className="m-1" type="text" placeholder="Ваш артикул" onChange={setOwnVendorCode}></Form.Control>

                    <Form.Select 
                        className="m-1" 
                        value={form.groupId} 
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

                {inputUrlFields.map((item ,i) => {
                    return(
                        <Form.Group key={i} className="d-flex align-items-center">
                            <Form.Control className="m-1" type="url" placeholder="Ссылка на товар" name="url" value={inputUrlFields.url} onChange={(e) => handleFormChange(i, e)}></Form.Control>

                            <Form.Select 
                                className="m-1"
                                name="regionName"
                                value={inputUrlFields.regionName} 
                                /* isInvalid={}*/
                                onChange={(e) => handleFormChange(i, e)}
                                required>
                                    <option value=''>Регион *</option>
                                    <option value="1">Санкт-Петербург и ЛО</option>
                                    <option value="2">Москва</option>
                                    <option value="3">ХМАО</option>
                            </Form.Select>

                            <Form.Control className="m-1" type="text" placeholder="Артикул" name="vendorCode" value={inputUrlFields.vendorCode} onChange={(e) => handleFormChange(i, e)}></Form.Control>
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