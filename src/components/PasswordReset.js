import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { sendPasswordLink } from '../api';
import Navbar from './Navbar';

const PasswordReset = () => {

   const [email, setEmail] = useState("");
   const [message, setMessage] = useState(false);
   const [btnStatus, setBtnStatus] = useState(false);

   const setVal = (e) => {
      setEmail(e.target.value)
   }

   // const sendLink = async (e) => {
   //     e.preventDefault();
   //     loadingRef.current = true;
   //     console.log(loadingRef.current)
   //     if (email === "") {
   //         toast.error("Email is required!", {
   //             position: "top-center"
   //         });

   //         loadingRef.current = false;
   //         return;
   //     } else if (!email.includes("@")) {
   //         toast.warning("Please include @ in your email!", {
   //             position: "top-center"
   //         });
   //         loadingRef.current = false;
   //         return;
   //     } else {

   //         const res = await sendPasswordLink({ email });

   //         if (res.data.status === 201) {
   //             setEmail("");
   //             setMessage(true)

   //         } else {
   //             toast.error("Invalid User", {
   //                 position: "top-center"
   //             })

   //         }
   //     }
   //     setTimeout(() => {
   //         loadingRef.current = false;
   //     }, 2000);
   // }
   function sendLink() {

      setBtnStatus(true);
      if (email === "") {
         toast.error("Email is required!", {
            position: "top-center"
         });
         setBtnStatus(false);
         return;
      } else if (!email.includes("@")) {
         toast.warning("Please include @ in your email!", {
            position: "top-center"
         });
         setBtnStatus(false);
         return;
      } else {

         sendEmail(email);

      }

   }
   const sendEmail = async (email) => {
      const res = await sendPasswordLink({ email });

      if (res.data.status === 201) {
         setEmail("");

         setTimeout(() => {
            setBtnStatus(false);
         }, 2000);
         setMessage(true)
      } else {
         toast.error("Invalid User", {
            position: "top-center"
         })

      }
   }
   return (
      <div className='App container'>

         {/* Header */}
         <Navbar />

         {/* Main Content */}
         <main>
            <div className='loginGrid'>
               <div>
                  <h4 className='heading heading-one mb-1'>Forgot Password?</h4>
                  <p className='mb-3 fw-normal'>Enter your email to proceed</p>
               </div>

               {/* <form onSubmit={sendLink}> */}
               {message ? <p style={{ color: "green", fontWeight: "bold" }}>Please check your email to reset password</p> : ""}

               <div className="form_input">
                  <TextField label="Email"
                     onChange={setVal}
                     name='email'
                     id="email"
                     value={email}></TextField>
               </div>
               <div className='form_input'>
                  <button
                     variant="outlined" onClick={sendLink}
                     type='submit' disabled={btnStatus || message}
                     className="btn btn-primary login-btn">
                     {btnStatus ? 'Sending...' : 'Send Email'}
                     {btnStatus && <FontAwesomeIcon icon="spinner" spin />}
                  </button>
               </div>
               <div>
                  <NavLink to="/" className="linkBtn mt-3">
                     Back to Login
                  </NavLink>
               </div>
               {/* </form> */}
               <ToastContainer />
            </div>
         </main>
      </div>
   )
}

export default PasswordReset