import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormLabel, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
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
            <Navbar />

            <div style={{ width: '50%', margin: 'auto' }}>

                <div>
                    <div>
                        <h2>Enter Your Email</h2>
                    </div>
                    {/* <form onSubmit={sendLink}> */}
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Please check your email to reset password</p> : ""}

                    <div className="form_input">
                        <FormLabel id="demo-controlled-radio-buttons-group">Email</FormLabel>
                        <TextField type="email" value={email} onChange={setVal} name="email" id="email" />
                    </div>
                    <div className='form_input' style={{padding: '20px 0px'}}>
                    <Button
                        variant="outlined" onClick={sendLink}
                        type='submit' disabled={btnStatus || message}>
                        {btnStatus ? 'Sending...' : 'Send Email'}
                        {btnStatus && <FontAwesomeIcon icon="spinner" spin />}
                    </Button>
                    </div>
                    {/* </form> */}
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default PasswordReset