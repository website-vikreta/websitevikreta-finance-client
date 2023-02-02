
import EditItem from './components/EditItem';
import Index from './components/Index'
import AllItems from './components/AllItems';
import './index.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
//  import ProtectedRoutes from "./components/ProtectedRoutes";

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
