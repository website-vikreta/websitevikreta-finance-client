import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import ProductForm from "./ProductForm";
import CloseIcon from '@mui/icons-material/Close';
import EditProduct from "./EditProduct";
export default function Popup(props){
    const {showModal,setShowModal, formType} = props;
    const {openDialog, currProduct} = showModal;
    
    return(
        <Dialog open= {openDialog} maxWidth='md'>
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {formType} Product Details
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>setShowModal({...showModal, openDialog: false})}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx= {{paddingY:5}}>
              {formType === 'Add'? <ProductForm showModal= {showModal} setShowModal = {setShowModal} /> : <EditProduct cProduct = {currProduct} showModal = {showModal} setShowModal = {setShowModal}/>}
            </DialogContent>
        </Dialog>
    );
}