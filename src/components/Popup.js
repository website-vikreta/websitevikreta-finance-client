import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import ItemForm from "./ItemForm";
import CloseIcon from '@mui/icons-material/Close';
import EditItem from "./EditItem";
export default function Popup(props){
    const {showModal,setShowModal, formType} = props;
    const {openDialog, currItem} = showModal;
    
    return(
        <Dialog open= {openDialog} maxWidth='md'>
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {formType} Item Details
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>setShowModal({...showModal, openDialog: false})}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx= {{paddingY:5}}>
              {formType === 'Add'? <ItemForm showModal= {showModal} setShowModal = {setShowModal} /> : <EditItem cItem = {currItem} showModal = {showModal} setShowModal = {setShowModal}/>}
            </DialogContent>
        </Dialog>
    );
}