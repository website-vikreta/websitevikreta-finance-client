import  React from 'react';
import Draggable from 'react-draggable';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from '@mui/material';


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
  console.log('deletepopup')
  const {delModal,setDelModal, confirm} = props;
 
  const handleClose = () => {
    setDelModal({openDelDialog: false, deleteId: null});
  };

  const handleDelete = () => {
    setDelModal({openDelDialog: false, deleteId: null});
    confirm();
  }

  return (
    <div>
      <Dialog
        open={delModal.openDelDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <span style={{fontWeight: '900'}}>Are you Sure? </span>
            Do you really want to delete this record? This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} sx={{
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
