
import { TextField, Button, Grid, Paper } from '@mui/material';

import React from 'react';
import { loginUser } from '../api';
const Login = () => {
    const [userDetails, setUserDetails] = React.useState({ email: '', password: '' });
    const {email, password} = userDetails;


    const handleSubmit = async () => {
        const res = await loginUser(userDetails);
        alert('login',res.data);
        console.log(res.data);
    }


    const onValueChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
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
                            onChange={(e) => onValueChange(e)}
                            name='email'
                            value={email}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'}
                        onChange={(e) => onValueChange(e)}
                        name='password'
                        value={password}
                        
                        ></TextField>
                    </Grid>
                    {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={'Keep me logged in'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Keep me logged in"
            />
          </Grid> */}
                    <Grid item xs={12}>
                        <Button fullWidth onClick={() => handleSubmit()}> Login </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Login;