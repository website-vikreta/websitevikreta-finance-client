import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { deleteAllData } from '../../api';

// import Icons
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Close } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function DeleteDataPopup({ userId, deleteDataModal, setDeleteDataModal }) {

    const [deleteSucces, setDeleteSuccess] = useState(false);
    const [message, setMessage] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false);

    // Delete All Data
    const handleDelete = async () => {
        setBtnStatus(true);
        try {
            const response = await deleteAllData(userId);
            if (response.status === 201) {
                setDeleteSuccess(true);
                setTimeout(() => {
                    setBtnStatus(false);
                }, 2000);
                setMessage(true)
            } else {
                setDeleteSuccess(false);
                setTimeout(() => {
                    setBtnStatus(false);
                }, 2000);
            }

        } catch (error) {
            setTimeout(() => {
                setBtnStatus(false);
            }, 2000);
            console.log(error);
        }
    }
    return (
        <div>
            <Dialog
                open={deleteDataModal}
                aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Delete Data
                        </Typography>

                        {/* Close Button */}
                        <Button
                            sx={{ padding: 0, minWidth: 0 }}
                            color="secondary"
                            onClick={() => { setDeleteDataModal(false); }}>
                            <Close />
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Dialog Content for Deletion */}
                    <DialogContentText>
                        {deleteSucces ? <>Your Data has been Deleted Successfully. Please Refresh the page. <CheckCircleOutlinedIcon sx={{ color: 'green' }} /></> :
                            <>
                                <center> <strong>Delete Your Sure ?</strong></center>
                                Do you really want to delete All Record? This process cannot be undone.
                            </>
                        }
                    </DialogContentText>
                </DialogContent>
                {!deleteSucces && <DialogActions>
                    <div className="form_input" >
                        <button
                            variant="outlined" onClick={handleDelete}
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
                </DialogActions>}
            </Dialog>
        </div>
    );
}
