import { Button, FormLabel, TextField } from '@mui/material';
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPassword, updatePassword } from '../api';
function ChangePassword() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };



  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  let navigate = useNavigate();
  const updatePasswrd = async (e) => {
    e.preventDefault();
    try {
      let password = await getPassword(user.id,{ password:currentPassword});
      if (!password.data.success) {
        setError("Current Password is Wrong!");
        return;
      } else { setError('') }
    } catch (error) {
      console.log('eorrr', error);
    }
    if (!String(newPassword).match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
      setError("Password must contains Minimum eight characters, at least one letter, one number!");
      return;
    } else { setError('') }
    if (newPassword !== confirmPassword) {
      setError('New Password and Confirm Password is not matched!');
      return;
    } else {
      try {
      await updatePassword(user.id, {password:newPassword});
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/home');
      } catch (error) {
        console.log('error updating password', error)
      }
    }
  }
  return (
    <div className='change_password' style={{ width: '50%', margin: 'auto', justifyContent: 'center' }}>

      <form onSubmit={updatePasswrd}>

        <div>

          <FormLabel id="demo-controlled-radio-buttons-group">Current Password</FormLabel>
          <TextField value={currentPassword}
            onChange={handleCurrentPasswordChange}
            type={showCurrentPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowCurrentPassword}>
                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormLabel id="demo-controlled-radio-buttons-group">New Password</FormLabel>
          <TextField value={newPassword}
            onChange={handleNewPasswordChange}
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowNewPassword}>
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={(newPassword !== '' && !String(newPassword).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))}
            helperText={(!String(newPassword).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$") && newPassword !== '' ? 'Password must contains Minimum eight characters, at least one letter, one number and one special character' : ' ')}
          />
          <FormLabel id="demo-controlled-radio-buttons-group">Confirm Password</FormLabel>
          <TextField
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <FormHelperText error>{error}</FormHelperText>
        </div>
        <div>
          <Button

            variant="outlined"
            type='submit'
          >Update Password</Button>
        </div>


      </form>
    </div>


  )
}
export default ChangePassword;