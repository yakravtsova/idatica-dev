import { Routes, Route } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';
import SideBar from './SideBar';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <Container fluid className="bg-light d-flex justify-content-start align-items-start">
      <SideBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </Container>
    

  );
}

export default App;
