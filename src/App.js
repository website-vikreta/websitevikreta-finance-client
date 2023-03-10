
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from './Login';
import Main from './components/Main'
import EditItem from './components/Items/EditItem';
import ChangePassword from './components/ChangePassword';
import ProtectedRoutes from './components/ProtectedRoutes';

import './styles/index.css';
import PasswordReset from './components/PasswordReset';
import Error from './Error';
import ForgotPassword from './components/ForgotPassword';

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route element = {<ProtectedRoutes/>}>
          <Route path="/home" element={<Main />} />
         
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/passwordReset" element={<PasswordReset/>}/>
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
