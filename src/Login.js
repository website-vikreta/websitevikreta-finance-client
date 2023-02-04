
import { TextField, Button, Grid, Paper, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';
import { loginUser } from './api';
import Index from './components/Main';
import { useNavigate } from 'react-router-dom';
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

        if(email === '' || password === ''){
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
            console.log(err.message,'errrr');
                setError(errorMsg);
        }


    }


    return (
        <div style={{ padding: 30 }}>
            <Paper>
                <Grid
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}>
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
                        <Button fullWidth onClick={() => handleSubmit()}> Login </Button>
                    </Grid>
                    <FormHelperText error>{error}</FormHelperText>

                </Grid>
            </Paper>

        </div>
    );
}

export default Login;