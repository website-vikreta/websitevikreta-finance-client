
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from './Login';
import Index from './components/Main'
import AllItems from './components/Items/AllItems';
import EditItem from './components/Items/EditItem';
import ProtectedRoutes from './components/ProtectedRoutes';

import './styles/index.css';

const App = () => {

  return (

    <BrowserRouter>

      <Routes>
        <Route element = {<ProtectedRoutes/>}>
          <Route path="/home" element={<Index />} />
          <Route path="all" element={<AllItems />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
