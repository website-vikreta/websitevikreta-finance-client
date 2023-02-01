
import EditItem from './components/EditItem';
import Index from './components/Index'
import AllItems from './components/AllItems';
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
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Index />} />
        <Route path="all" element={<AllItems />} />
        <Route path="/edit/:id" element={<EditItem />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
