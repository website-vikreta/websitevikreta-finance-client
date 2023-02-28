import { Button, FormLabel, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { sendPasswordLink } from '../api';

const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Please include @ in your email!", {
                position: "top-center"
            });
        } else {
           
           const res = await sendPasswordLink({email});
            
            if (res.data.status === 201) {
                setEmail("");
                setMessage(true)
            } else {
                toast.error("Invalid User",{
                    position: "top-center"
                })
            }
        }
    }

    return (
        <>
            <div style={{width: '50%' ,margin:'auto'}}>
                
                <div>
                    <div>
                        <h2>Enter Your Email</h2>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Please check your email to reset password</p> : ""}
                    <form>
                        <div className="form_input">
                        <FormLabel id="demo-controlled-radio-buttons-group">Email</FormLabel>
                            <TextField type="email" value={email} onChange={setVal} name="email" id="email" />
                        </div>
                        <Button  onClick={sendLink}>Send</Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default PasswordReset