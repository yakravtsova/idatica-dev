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
import Rules from './Rules';
import Login from './Login';
import RegistrationOkInfoTooltip from './RegistrationOkInfoTooltip';
import CompleteRegistration from './CompleteRegistration';

const App = () => {  
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isRegistrationInfoTooltipOpen, setIsRegistrationInfoTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleRegistrationInfoTooltipOpen = () => {
        setIsRegistrationInfoTooltipOpen(!isRegistrationInfoTooltipOpen);
    }
    
    const handleDeletePopupOpen = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    }

    const redirectTo = (path) => {
        navigate(path)
    }

    const handleRegister = ({ email, password }) => {
        const registerData = {
            email: email,
            password: password
        }
        console.log(registerData);
        handleRegistrationInfoTooltipOpen();
    }

    const handleAuthorization = (email, password) => {
        console.log(`${email}, ${password}`)
    }

    const handleReset = (email) => {
        console.log(email);
    }

    const handleCompleteRegister = ({username, phone, company, plan}) => {
        console.log(`${username} ${phone} ${company} ${plan}`)
    }

    const handleProductsCreate = (form) => {
        console.log(form);
    }


    return (
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            {loggedIn && <SideBar/>}
            <Routes>
                <Route path="/start" element={<StartPage redirectTo={redirectTo} />}/>
                <Route path="/register" element={<Register handleRegister={handleRegister} />} />
                <Route path="/login" element={<Login handleAuthorization={handleAuthorization} handleReset={handleReset} />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/products" element={<Products isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen} />}/>
                <Route path="/products/create" element={<ProductsCreate handleProductsCreate={handleProductsCreate} />}/>
                <Route path="/groups" element={<Groups isDeletePopupOpen={isDeletePopupOpen} handleDeletePopupOpen={handleDeletePopupOpen}/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/accept" element={<CompleteRegistration handleCompleteRegister={handleCompleteRegister} />
            } />
            </Routes>
            <RegistrationOkInfoTooltip isOpen={isRegistrationInfoTooltipOpen} onClose={handleRegistrationInfoTooltipOpen} />
        </Container>


    );
}

export default App;
