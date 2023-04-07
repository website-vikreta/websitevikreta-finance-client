
import { TextField, Grid, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';
import { loginUser } from './api';
import Index from './components/Main';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/itemform.css';

const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [user, setUser] = useState("");
   const [error, setError] = useState("");
   const [btnStatus, setBtnStatus] = useState(false);

   var errorMsg = error;
   const navigate = useNavigate();

   useEffect(() => {

      const loggedInUser = localStorage.getItem("user-info");

      if (loggedInUser) {
         const foundUser = JSON.parse(loggedInUser);
         setUser(foundUser);
         navigate('/home');
      }
   }, [navigate]);

   if (user) {
      return <Index />;
   }

   // Login Submit
   const handleSubmit = async () => {
      setBtnStatus(true);
      if (email === '' || password === '') {
         errorMsg = "Please Fill Email and Password Properly";
         setError(errorMsg);
         setBtnStatus(false);
         return;
      }
      const userDetails = { email, password };
      try {
         const res = await loginUser(userDetails);
         if (res.data) {
            localStorage.setItem('user-info', JSON.stringify(res.data));
            setUser(res.data);
            setBtnStatus(false);
            setError("");
            navigate('/home');
         } else {
            errorMsg = "Invalid Email or Password";
            setError(errorMsg);
         }
      } catch (err) {
         errorMsg = "Invalid Email or Password";
         setError(errorMsg);
         setBtnStatus(false);
      }


   }


   return (
      <div className="App container">
         {/* Header */}
         <Navbar user={user} />

         {/* Main Content */}
         <main>
            <Grid className='loginGrid'>
               <h4 className='heading heading-one mb-3'>User Login</h4>
               <Grid item xs={12}>
                  <TextField label="Email"
                     onChange={({ target }) => setEmail(target.value)}
                     name='email'
                     value={email}></TextField>
               </Grid>
               <Grid item xs={12}>
                  <TextField label="Password" type={'password'}
                     onChange={({ target }) => setPassword(target.value)}
                     name='password'
                     value={password}
                  ></TextField>
               </Grid>
               <Grid item xs={12}>
                  <NavLink to="/password-reset" className="linkBtn">
                     Forgot Password?
                  </NavLink>

               </Grid>
               <Grid item xs={12}>
                  <button className="btn btn-primary login-btn" onClick={handleSubmit} >
                     Login
                     {btnStatus && <FontAwesomeIcon icon="spinner" spin />}</button>
               </Grid>
               <FormHelperText error>{error}</FormHelperText>
            </Grid>
         </main>

         {/* Footer */}
         <footer className='footer'></footer>
      </div>


   );
}

export default Login;