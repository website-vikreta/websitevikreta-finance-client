import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormHelperText, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { setUserPasswordByAdmin } from '../../api';
import Navbar from '../Navbar';

const PasswordSet = () => {

    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleKeyChange = (event) => {
        setKey(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function setUPassword() {
        setBtnStatus(true);
        if (!String(email).match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")) {
            setError("Email must be valid and contains @ character")
            setBtnStatus(false);
            return;
        }else { setError('') }

        if (key === '') {
            setError("Secret Key should not be empty")
            setBtnStatus(false);
            return;
        }else { setError('') }
        if (username === "") {
            setError("Username is required")
            setBtnStatus(false);
            return;
        } else { setError('') }
        if (!String(password).match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
            setError("Password must contains Minimum eight characters, at least one uppercase letter, one lowercase letter, one number!");      
            setBtnStatus(false);
            return;
        }  else {
            setError('')
            setUserPassword(email, username, key, password);

        }

    }
    const setUserPassword = async (useremail, userusername, userkey, userpassword) => {
        const userDetails = { email: useremail, username:userusername, key: userkey, password: userpassword }
        try {
            const res = await setUserPasswordByAdmin(userDetails);
            console.log(res);
            if (res.data.status === 201) {
                setEmail("")
                setUsername("")
                setKey("")
                setPassword("")
                setTimeout(() => {
                    setBtnStatus(false);
                }, 2000);
                toast.success("User updated successfully!", {
                    position: "top-center"
                });
            } else {
                toast.error("Invalid User", {
                    position: "top-center"
                })
                setBtnStatus(false);
    
            }
        } catch (error) {
            setBtnStatus(false);
            console.log(error)
        }
    }
    
    const toggleKey = () => setShowKey(!showKey);
    const togglePassword = () => setShowPassword(!showPassword);
    return (
        <div className="App container">
            <Navbar />
            <Navbar />
            <div className='change_password' style={{ width: '50%', margin: 'auto', justifyContent: 'center' }}>

                    <FormLabel id="demo-controlled-radio-buttons-group">Email</FormLabel>
                    <TextField value={email}
                        type='text'
                        onChange={handleEmailChange}
                        error={(email !== '' && !String(email).match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"))}
                        helperText={(!String(email).match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$") && email !== '' ? 'Email must be valid and contains @ character' : '')}
                        
                    />
                    <FormLabel id="demo-controlled-radio-buttons-group">Username</FormLabel>
                    <TextField value={username}
                        type='text'
                        onChange={handleUsernameChange}
                        
                    />
                    <FormLabel id="demo-controlled-radio-buttons-group">Secret Key</FormLabel>
                    <TextField value={key}
                        type={showKey ? 'text' : 'password'}
                        onChange={handleKeyChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleKey}>
                                        {showKey ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormLabel id="demo-controlled-radio-buttons-group">Password</FormLabel>
                    <TextField
                        value={password}
                        onChange={handlePasswordChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={(password !== '' && !String(password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))}
                        helperText={(!String(password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$") && password !== '' ? 'Password must contains Minimum eight characters, at least one uppercase letter, one lowercase letter, one number!' : '')}
                      />
                
                <div>
            <FormHelperText error>{error}</FormHelperText>
          </div>

                <div>
                    <div className='form_input' style={{ padding: '20px 0px' }}>
                        <Button
                            variant="outlined" onClick={setUPassword}
                            type='submit' disabled={btnStatus}>
                            {btnStatus ? 'Set Password...' : 'Set Password'}
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

export default PasswordSet