import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, FormLabel, TextField } from '@mui/material';
import { forgotPassword, setNewPassword } from '../api';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForgotPassword = () => {

   const { id, token } = useParams();

   const navigate = useNavigate();

   const [itemData, setData] = useState(false);
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState(false);
   const [btnStatus, setBtnStatus] = useState(false);


   

   const setval = (e) => {
      setPassword(e.target.value)
   }

   const sendPassword = async (e) => {
      setBtnStatus(true);
     
      if (password === "") {
         toast.error("password is required!", {
            position: "top-center"
         });
         setBtnStatus(false);
         return;
      } else if (password.length < 8) {
         toast.error("password must be 8 char!", {
            position: "top-center"
         });
         setBtnStatus(false);
         return;
      } else {

         try {

            const res = await setNewPassword(id, token, { password: password });

            if (res.status === 201) {
               setPassword("")
               setTimeout(() => {
                  setBtnStatus(false);
               }, 2000);
               setMessage(true)
            } else {
               toast.error("Token Expired! generate new Link", {
                  position: "top-center"
               })
               setBtnStatus(false);
               return;
            }

         } catch (error) {
            console.log('error', error)
            toast.error("Token Expired! generate new Link", {
               position: "top-center"
            })
            setBtnStatus(false);
         }
      }
   }

   useEffect(() => {
      const userValid = async () => {
         try {
            const res = await forgotPassword(id, token);
            if (res.status !== 201) {
               navigate("*")
            }
         } catch (error) {
            navigate("*")
         }
      }
      userValid()
      setTimeout(() => {
         setData(true)
      }, 3000)
   }, [id, token, navigate])

   return (
      <div className='App container'>
         <Navbar />
         {
            itemData ? (
               <>
                  <div style={{ width: '50%', margin: 'auto' }}>
                     <div>
                        <div>
                           <h2>Enter Your NEW Password</h2>
                        </div>

                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Updated Successfully </p> : ""}
                        <div className="form_input">
                           <FormLabel id="demo-controlled-radio-buttons-group">Enter Your new password</FormLabel>

                           <TextField type="password" value={password} onChange={setval} name="password" id="password" />
                        </div>
                        <div className="form_input" style={{padding: '20px 0px'}}>

                           <Button onClick={sendPassword} disabled={btnStatus || (message && true)}>
                              {btnStatus ? 'Updating...' : 'Update Password'}
                              {btnStatus && <FontAwesomeIcon icon="spinner" spin />}
                           </Button>
                        </div>
                        {message && <p><NavLink to="/">Back to Home</NavLink></p>}
                        
                        <ToastContainer />
                     </div>
                  </div>
               </>
            ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
               Loading... &nbsp;
               <CircularProgress />
            </Box>
         }
      </div>
   )
}

export default ForgotPassword;