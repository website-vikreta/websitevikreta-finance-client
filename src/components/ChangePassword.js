import { TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPassword, updatePassword } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import '../styles/index.css';
import '../styles/itemform.css';

function ChangePassword() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loadingRef = useRef(false);
  const [error, setError] = useState('');

  document.title = 'Change Password'

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

  // Update Current Password
  const updatePasswrd = async (e) => {
    e.preventDefault();
    loadingRef.current = true;
    try {
      let password = await getPassword(user.id, { password: currentPassword });
      if (!password.data.success) {
        setError("Current Password is Wrong!");
        loadingRef.current = false;
        return;
      } else { setError('') }
    } catch (error) {
      console.log('eorrr', error);
    }
    if (!String(newPassword).match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
      setError("Password must contains Minimum eight characters, at least one uppercase letter, one lowercase letter, one number!");
      loadingRef.current = false;
      return;
    } else { setError('') }
    if (newPassword !== confirmPassword) {
      setError('New Password and Confirm Password is not matched!');
      loadingRef.current = false;
      return;
    } else {
      try {
        await updatePassword(user.id, { password: newPassword });
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          loadingRef.current = false;
          navigate('/home');
        }, 2000);

      } catch (error) {
        console.log('error updating password', error)
      }
    }
  }

  return (
    <div className="App container">
      {/* Header */}
      <Navbar user={user} />

      {/* Main Content */}
      <main>
        <div className='loginGrid'>
          <form onSubmit={updatePasswrd}>

            <div>
              {/* Form */}

              <div>
                <h4 className='heading heading-one mb-1'>Change Password</h4>
      
              </div>


              <div className="form_input">

                <TextField
                  label="Current Password"
                  value={currentPassword}
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

              </div>
              <br />
              <div className="form_input">

                <TextField
                  label="New Password"
                  value={newPassword}
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
                  helperText={(!String(newPassword).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$") && newPassword !== '' ? 'Password must contains Minimum eight characters, at least one uppercase letter, one lowercase letter, one number!' : '')}
                />
              </div>
              <br />
              <div className="form_input">

                <TextField
                  label="Confirm Password"
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
            </div>
            <div>
              <FormHelperText error>{error}</FormHelperText>
            </div>
            <br />
            <div className="form_input">
              <button
                className="btn btn-primary login-btn"
                variant="outlined"
                type='submit' disabled={loadingRef.current}>
                {loadingRef.current ? 'Updating...' : 'Update Password'}
                {loadingRef.current && <FontAwesomeIcon icon="spinner" spin />}
              </button>
            </div>


          </form>
        </div>
      </main>

    </div>
  )
}
export default ChangePassword;