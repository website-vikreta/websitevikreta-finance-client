import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import ProductForm from "./ProductForm";
import CloseIcon from '@mui/icons-material/Close';
export default function Popup(props){
    const {showModal,setShowModal} = props;
    return(
        <Dialog open= {showModal} maxWidth='md'>
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Add Product Details
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{setShowModal(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx= {{paddingY:5}}>
                <ProductForm/>
            </DialogContent>
        </Dialog>
    );
}