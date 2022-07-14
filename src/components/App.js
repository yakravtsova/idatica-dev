import {Routes, Route} from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';
import ProductsCreate from './ProductsCreate';
import SideBar from './SideBar';
import Container from 'react-bootstrap/Container';
import Profile from "./Profile";
import Groups from "./Groups";

const App = () => {
    return (
        <Container fluid className="bg-light d-flex justify-content-start align-items-start">
            <SideBar/>
            <Routes>
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/create" element={<ProductsCreate/>}/>
                <Route path="/groups" element={<Groups/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Container>


    );
}

export default App;
