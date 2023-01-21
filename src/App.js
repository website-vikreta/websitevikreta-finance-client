import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct';
import Index from './components/Index'
import AllProducts from './components/AllProducts';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {


  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
