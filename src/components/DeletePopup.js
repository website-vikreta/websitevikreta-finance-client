import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {deleteProduct } from '../api/index';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DeletePopup(props) {
  const {open, setOpen} = props;
  const {openDialog, deleteId} = open;
  
  const handleClickOpen = () => {
    setOpen({...open, openDialog: true});
  };

  const handleClose = () => {
    setOpen({...open, openDialog: false});
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    console.log('deleted');
    setOpen({...open, openDialog: false});
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <h3 style={{fontWeight: '900'}}>Are you Sure? </h3>
            <div> Do you really want to delete this record? This process cannot be undone.</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete(deleteId)} sx={{
                    color: 'white', backgroundColor: '#e60000', borderColor: 'white', ':hover': {
                        bgcolor: '#e60000',
                        color: 'white',
                    }
                }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}