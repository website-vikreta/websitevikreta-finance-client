import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';


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

/**


import { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../api/index';
import { Table, TableHead, Button, TableCell, TableRow, TableBody, styled, Grid } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from './Popup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import React from 'react'


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
  
  function DeletePopup(props) {
    const {delModal,setDelModal, handlDelete} = props;
    const {openDelDialog, deleteId} = delModal;
    
    const handleClickOpen = () => {
        setDelModal({...delModal, openDelDialog: true});
    };
  
    const handleClose = () => {
        setDelModal({openDelDialog: false, deleteId: null});
    };
  
    const handleDelete =  () => {
        setDelModal({openDelDialog: false, deleteId: true});
    }
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Delete
        </Button>
        <Dialog
          open={openDelDialog}
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
            <Button onClick={handlDelete(deleteId)} sx={{
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

const StyledTable = styled(Table)`
    width: 95%;
    margin: 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #6600cc;
        color: #FFFFFF;
        text-align: center;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px;
        text-align: center;
    }
    &:nth-of-type(even){
        background-color: #f5e6ff;
      }
`;

const Item = (props) => {

    // const items = useSelector((state) => state.items);
    const [items, setItems] = useState([]);
    const { type, dateFilter } = props;
    const [showModal,setShowModal] = useState({openDialog: false, currItem: ''});
    const [delModal,setDelModal] = useState({openDelDialog: false, deleteId: null});
    

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {
        let response = await getItems();
        setItems(response.data);
    }

    const deleteItemData =  (id) => {
       // setDelModal({openDelDialog: true, deleteId: id});
       console.log("delte1");
    }
    const handlDelete = (id) => {
        if(id === delModal.deleteId){
            console.log("Deleted");
        }
        setDelModal({openDelDialog: false, deleteId: null});
    }
    // const handlDelete = async (id) => {
    //     if(id === delModal.deleteId) await deleteItem(id);
    //     setDelModal({openDelDialog: false, deleteId: null});
    //     getAllItems();
    // }
   
    function check(items, type) {
        if (type === '_id' || type === undefined) return items;
       
        return items.paymentType === type ? items : null;
    }
    function checkDuration(item, dateFilter) {
        const now = new Date();
        const s = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const currDate = new Date(item.dateOfPayment);
        const d = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
        if (dateFilter === 1) { 
            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7));
            return d <= s && d >= e ? item : null;
        }else if(dateFilter === 2){
            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 30));
            return d <= s && d >= e ? item : null;
        }else if(dateFilter === 5){
            return (s.getFullYear()-1) === d.getFullYear() ? item : null;
        }else if(dateFilter === 6){
            return d.getFullYear() === 2021 ? item : null;
        }
        return item;
    }

    const formatedate = (d) => {
         return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() };
    const filteredElements = items.filter((e) => check(e, type)).filter((e) => checkDuration(e, dateFilter));


    return (
        <Grid container alignContent={'center'}>
            <Grid item xs={12}>
                <StyledTable>
                    <TableHead>
                        <THead>
                            <TableCell >Title</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Category</TableCell>
                            <TableCell >Payment Type</TableCell>
                            <TableCell >Date of Invoice</TableCell>
                            <TableCell >Date of Payment</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Action</TableCell>
                        </THead>
                    </TableHead>
                    <TableBody>
                        {filteredElements.map((item) => (
                            <TRow key={item._id}>

                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.paymentType}</TableCell>
                                <TableCell>{formatedate(new Date(item.dateOfInvoice))}</TableCell>
                                <TableCell>{formatedate(new Date(item.dateOfPayment))}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: '#0052cc' }} variant="contained" style={{ marginRight: 10 }} onClick={() => setShowModal({openDialog: true, currItem: item}) }><EditIcon /></IconButton> 
                                    <IconButton sx={{ color: 'red' }} variant="contained" onClick={() => deleteItemData(item._id)}><DeleteIcon /></IconButton> 
                                </TableCell>
                            </TRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </Grid>
            <Popup showModal = {showModal} setShowModal = {setShowModal} formType = 'Edit' ></Popup>
            <DeletePopup delModal = {delModal} setDelModal = {setDelModal} handlDelete = {handlDelete}></DeletePopup>
        </Grid>
    );

}

export default Item;


 */