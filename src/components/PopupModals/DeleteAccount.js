import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, FormLabel, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Warning } from "@mui/icons-material";
import { useState } from "react";
import { deleteAccountPermanant } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function DeleteAccount({ user, deleteAccountModal, setDeleteAccountModal, handleLogout }) {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false);


    const setValue = (e) => {
        setPassword(e.target.value)
    }
    //Delete Account Parmanantly
    const deleteAccount = async () => {
        setBtnStatus(true);

        const emailPassword = { email: user.email, password: password };
        try {

            const response = await deleteAccountPermanant(user.id, emailPassword);

            //Successfull Deletion, Delete Cookies and logout
            if (response.status === 401) {
                console.log(response.data);
                setError("Password is Wrong");
                setTimeout(() => {
                    setBtnStatus(false);
                }, 2000);
                return;
            }

            //Wrong Password
            if (response.status === 201) {
                setError('');
                setTimeout(() => {
                    setBtnStatus(false);
                }, 2000);
                setMessage(true)
                handleLogout();
            }
        } catch (error) {
            setTimeout(() => {
                setBtnStatus(false);
            }, 2000);
            console.log(error);
        }

    }
    return (
        <Dialog open={deleteAccountModal} maxWidth='md'>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Delete Account
                    </Typography>

                    {/* Close Button */}
                    <Button
                        sx={{ padding: 0, minWidth: 0 }}
                        color="secondary"
                        onClick={() => { setDeleteAccountModal(false); setPassword('') }}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            {/* Dialog Content for Deletion */}
            <DialogContent dividers style={{ paddingY: 2, paddingX: 0 }}>
                <center> <Warning sx={{ color: 'red' }} /><strong>Delete Your Account ?</strong></center>
                <div>
                    <div>
                        You are requesting to delete an account. This process cannot be undone also will delete your all records.
                    </div>
                    <div className="form_input" sx={{ padding: '20px 0px' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Enter your password to confirm delete your account.</FormLabel>

                        <TextField type="password" value={password} onChange={setValue} name="password" id="password" size="small" />
                    </div>
                    <FormHelperText error>{error} </FormHelperText>
                </div>
            </DialogContent>
            <DialogActions>

                <div className="form_input" style={{ padding: '10px 0px', color: 'red' }}>
                    <button
                        variant="outlined" onClick={deleteAccount}
                        type='submit' disabled={btnStatus || message}
                        className="btn " style={{
                            color: 'white', backgroundColor: '#e60000', ':hover': {
                                bgcolor: '#e60000',
                                color: 'white'
                            }
                        }}>

                        {btnStatus ? 'Delete Account...' : 'Delete Account'}
                        {btnStatus && <FontAwesomeIcon icon="spinner" spin />}
                    </button>
                </div>

            </DialogActions>
        </Dialog>
    );
}