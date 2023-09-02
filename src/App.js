import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './styles/index.css';
import './styles/itemform.css';
import Login from './Login';
import Main from './components/Main'
import EditItem from './components/Items/EditItem';
import ChangePassword from './components/ChangePassword';
import ProtectedRoutes from './components/ProtectedRoutes';
import PasswordSet from './components/admin/PasswordSet';

import PasswordReset from './components/PasswordReset';
import Error from './Error';
import ForgotPassword from './components/ForgotPassword';

import InvestmentMain from './components/investmentMain';
import { Suspense } from 'react';

const App = () => {

  return (

    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>          
            <Route element = {<ProtectedRoutes/>}>
              <Route path="/home" element={<Main />} />
              <Route path="/edit/:id" element={<EditItem />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/investment" element={<InvestmentMain />} />
            </Route>
          <Route path="/" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset/>}/>
          <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<PasswordSet />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
