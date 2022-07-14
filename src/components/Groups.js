import {useState} from 'react';
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

const Groups = () => {
    const [view, setView] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditLinkPopupOpen, setIsEditLinkPopupOpen] = useState(false);
    const [isReportingProblemPopupOpen, setIsReportingProblemPopupOpen] = useState(false);

    const handleMode = () => {
        setView(!view);
    }

    const handleDeletePopupOpen = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    }

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
                <tr>
                    <td><a href="#">Коррозия металла</a></td>
                    <td>3</td>
                    <td>
                        <Form.Check
                            defaultChecked
                            type="radio"
                            name="defaultGroup[]"
                            id=""
                        />
                    </td>
                    <td>Раз в день</td>
                    <td>
                        <Form.Check
                            defaultChecked
                            type="switch"
                            id=""
                        />
                    </td>
                    <td><Button size="sm" variant="light"><Plus/></Button></td>
                    <td><Button size="sm" variant="light" onClick={handleEditLinkPopupOpen}><PencilFill/></Button></td>
                    <td><Button size="sm" variant="light" onClick={handleDeletePopupOpen}><TrashFill/></Button></td>
                </tr>

                <tr>
                    <td><a href="#">ВИА Песняры</a></td>
                    <td>3</td>
                    <td>
                        <Form.Check
                            defaultChecked
                            type="radio"
                            name="defaultGroup[]"
                            id=""
                        />
                    </td>
                    <td>Раз в неделю</td>
                    <td>
                        <Form.Check
                            defaultChecked
                            type="switch"
                            id=""
                        />
                    </td>
                    <td><Button size="sm" variant="light"><Plus/></Button></td>
                    <td><Button size="sm" variant="light" onClick={handleEditLinkPopupOpen}><PencilFill/></Button></td>
                    <td><Button size="sm" variant="light" onClick={handleDeletePopupOpen}><TrashFill/></Button></td>
                </tr>
                </tbody>
            </Table>

        </Container>
    )
}

export default Groups;