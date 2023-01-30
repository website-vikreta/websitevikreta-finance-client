
import EditProduct from './components/EditProduct';
import Index from './components/Index'
import AllProducts from './components/AllProducts';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
const App = () => {

  // const USEER_ROLES = {
  //   ADMIN : 'admin',
  //   DEVELOPER : 'developer',
  //   PUBLIC_USER : 'public_user',
  
  // }

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
