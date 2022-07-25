import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Product from './Product';
import SortingBar from './SortingBar';
import DeletePopup from './DeletePopup';
import UpdateLinkPopup from './UpdateLinkPopup';
import ReportingProblemPopup from './ReportingProblemPopup';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {Accordion} from "react-bootstrap";
import {
    CaretDownFill,
    CaretUpFill,
    ExclamationTriangleFill,
    PencilFill, Plus,
    PlusCircleFill,
    TrashFill
} from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import UpdateGroupPopup from './UpdateGroupPopup';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { groups } from '../utils/constants';
import GroupTableRow from './GroupTable Row';


const Groups = ({ isDeletePopupOpen, handleDeletePopupOpen }) => {
    const navigate = useNavigate();
    const [isEditLinkPopupOpen, setIsEditLinkPopupOpen] = useState(false);
    const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);
    const [isEditGroupPopupOpen, setIsEditGroupPopupOpen] = useState(false);

    const redirectToProductsCreate = () => {
        navigate("/products/create", {replace: true})
    }

    const handleEditGroupPopupOpen = () => {
        setIsEditGroupPopupOpen(!isEditGroupPopupOpen);
    }

    const addProductButton = () => {
        return (
            <Button size="sm" variant="light" onClick={redirectToProductsCreate}><Plus/></Button>
          );
    }

    const updateProductButton = () => {
        return (
            <Button size="sm" variant="light" onClick={handleEditGroupPopupOpen}><PencilFill/></Button>
          );
    }

    const deleteProductButton = () => {
        return (
            <Button size="sm" variant="light" onClick={handleDeletePopupOpen}><TrashFill/></Button>
          );
    }

    const isUpdatingAvailable = () => {
        return(
            <Form.Check
                            type="switch"
                            id=""
                        />
        )
    }

    const isDefault = () => {
        return(
            <Form.Check
                            defaultChecked
                            type="radio"
                            name="defaultGroup[]"
                            id=""
                        />
        )
    }

    const columns=[
        {dataField: 'id',
        text:'N',
        hidden: true},
        {dataField: 'name',
        text:'Название группы'},
        {dataField: 'count',
        text:'Количество товаров'},
        {dataField: 'isDefault',
        text:'По умолчанию',
        formatter: isDefault},
        {dataField: 'updateFrequency',
        text:'Частота проверки'},
        {dataField: 'isUpdatingEnabled',
        text:'Активно',
        formatter: isUpdatingAvailable},
        {dataField: 'addProducts',
        text:'Добавить товары',
        formatter: addProductButton},
        {dataField: 'update',
        text:'Редактировать',
        formatter: updateProductButton},
        {dataField: 'delete',
        text:'Удалить',
        formatter: deleteProductButton},
    ]

    

   

    const handleEditLinkPopupOpen = () => {
        setIsEditLinkPopupOpen(!isEditLinkPopupOpen);
    }

    const handleReportingProblemPopupOpen = () => {
        setIsReportingProblemPopupOpen(!isReportingProblemPopupOpen);
    }


    return (
        <Container fluid className="bg-white">
            <div className="d-flex align-items-center justify-content-between">

                <h2>Группы товаров</h2>
                <Form className="d-flex flex-fill p-2 align-items-center">
                    <InputGroup className="m-1 mt-2 mb-3">
                        <Form.Control placeholder="Поиск"
                                      aria-label="Поиск"
                                      aria-describedby="button-addon2"/>
                        <Button variant="outline-secondary">Найти</Button>
                    </InputGroup>
                </Form>
            </div>

            <Form>
                <div className="col-md-6">

                    <div className="d-flex align-items-center">
                        <Form.Control className="m-1" type="text" placeholder="Название *"></Form.Control>

                        <Form.Select className="m-1">
                            <option defaultValue="selected">Частота проверки *</option>
                            <option value="1">Раз в день</option>
                            <option value="2">Раз в неделю</option>
                            <option value="3">Раз в две недели</option>
                            <option value="4">Раз в три недели</option>
                            <option value="5">Раз в месяц</option>
                        </Form.Select>

                        <Button variant="primary" type="submit">Создать</Button>
                    </div>
                </div>
            </Form>


            <div>&nbsp;</div>

            

            <Table responsive bordered size="sm" className="small mt-3">
                <thead>
                <tr className="align-middle">
                    <th>Название группы</th>
                    <th>Количество товаров</th>
                    <th>По умолчанию</th>
                    <th>Частота проверки</th>
                    <th>Активно</th>
                    <th>Добавить товары</th>
                    <th>Редактировать</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                    {groups.map((group, i) => (
                        <GroupTableRow 
                            key={group.id}
                            group={group} 
                            redirectToProductsCreate={redirectToProductsCreate} 
                            handleEditGroupPopupOpen={handleEditGroupPopupOpen} 
                            handleDeletePopupOpen={handleDeletePopupOpen} />
                    ))}
                </tbody>
            </Table>
            <DeletePopup 
                isOpen={isDeletePopupOpen} 
                onClose={handleDeletePopupOpen} 
                okButtonText="Удалить" 
                cancelButtonText="Не удалять" 
                bodyText="Группа удаляется со всеми товарами без возможности восстановления. Вы хотите удалить группу?" 
            />
            <UpdateGroupPopup isOpen={isEditGroupPopupOpen} onClose={handleEditGroupPopupOpen}  />

        </Container>
    )
}

export default Groups;