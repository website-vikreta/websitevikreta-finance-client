
import { TextField, Grid, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';
import { loginUser } from './api';
import Index from './components/Main';
import { useNavigate } from 'react-router-dom';
// Image Imports
import SiteLogo from "./assets/websitevikreta-finance.svg";
const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [user, setUser] = useState("");
   const [error, setError] = useState("");
   var errorMsg = error;
   let navigate = useNavigate();


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

   const handleSubmit = async () => {

      if (email === '' || password === '') {
         errorMsg = "Please Fill Email and Password Properly";
         setError(errorMsg);
         return;
      }
      const userDetails = { email, password };
      try {
         const res = await loginUser(userDetails);
         if (res.data) {
            localStorage.setItem('user-info', JSON.stringify(res.data));
            setUser(res.data);
            setError("");
            navigate('/home');
         } else {
            errorMsg = "Invalid Email or Password";
            setError(errorMsg);
         }
      } catch (err) {
         errorMsg = "Invalid Email or Password";
         console.log(err.message, 'errrr');
         setError(errorMsg);
      }


   }


   return (
      <div className="App container">
         {/* Header */}
         <header className="header">
            {/* Logo */}
            <div className='logoWrapper'>
               <img src={SiteLogo} alt="Logo Icon" />
            </div>
            {/* CTAs */}
            <div className='ctaWrapper'>

            </div>
         </header>

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
                  <button className="btn btn-primary login-btn" onClick={() => handleSubmit()}>Login</button>
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