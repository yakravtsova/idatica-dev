import { Routes, Route } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Products from './Products';

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/start" element={<StartPage />} />
    </Routes>
  );
}

export default App;
