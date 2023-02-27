import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, FormLabel, TextField } from '@mui/material';
import { forgotPassword, setNewPassword } from '../api';

const ForgotPassword = () => {

    const { id, token } = useParams();

    const navigate = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendPassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 8) {
            toast.error("password must be 8 char!", {
                position: "top-center"
            });
        } else {
           
            try {

                const res = await setNewPassword(id, token, { password: password });
               
                if (res.status === 201) {
                    setPassword("")
                    setMessage(true)
                } else {
                    toast.error("Token Expired! generate new Link", {
                        position: "top-center"
                    })
                }
                
            } catch (error) {
                console.log('error', error)
                toast.error("Token Expired! generate new Link", {
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        const userValid = async () => {
          
            const res = await forgotPassword(id, token);
            
            if (res.status !== 201) {
                navigate("*")
            }
        }
        userValid()
        setTimeout(() => {
            setData(true)
        }, 3000)
    }, [id, token, navigate])

    return (
        <>
            {
                data2 ? (
                    <>
                        <div style={{ width: '50%', margin: 'auto' }}>
                            <div>
                                <div >
                                    <h2>Enter Your NEW Password</h2>
                                </div>

                                <form>
                                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Updated Successfully </p> : ""}
                                    <div className="form_input">
                                        <FormLabel id="demo-controlled-radio-buttons-group">Enter Your new password</FormLabel>

                                        <TextField type="password" value={password} onChange={setval} name="password" id="password" />
                                    </div>

                                    <Button onClick={sendPassword}>Send</Button>
                                </form>
                                <p><NavLink to="/">Home</NavLink></p>
                                <ToastContainer />
                            </div>
                        </div>
                    </>
                ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default ForgotPassword;