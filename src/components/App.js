import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';
import ProductsCreate from './ProductsCreate';
import SideBar from './SideBar';
import Container from 'react-bootstrap/Container';
import Profile from "./Profile";
import Groups from "./Groups";
import Register from './Register';

const App = () => {  
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    const handleDeletePopupOpen = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    }

    const redirectToRegister = () => {
        navigate("/register", {replace: true})
    }


    return (
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            {loggedIn && <SideBar/>}
            <Routes>
                <Route path="/start" element={<StartPage redirectToRegister={redirectToRegister} />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen} />}/>
                <Route path="/products/create" element={<ProductsCreate/>}/>
                <Route path="/groups" element={<Groups isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Container>


    );
}

export default App;
