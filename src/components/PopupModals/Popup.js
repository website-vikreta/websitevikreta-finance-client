import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import ItemForm from "../Items/ItemForm";
import EditItem from "../Items/EditItem";

import InvestmentForm from "../investments/InvestmentForm";
import EditInvestment from "../investments/EditInvestment";


export default function Popup(props) {

   const { setRender, showModal, setShowModal, formType } = props;
   const { openDialog, currItem } = showModal;

   const handleClose = () => {
      setShowModal({ ...showModal, openDialog: false });
   };

   return (
      <Dialog open={openDialog} onClose={handleClose} maxWidth='md'>
         <DialogTitle>
            <div style={{ display: 'flex' }}>
               <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  
                  {formType} Details
               </Typography>
               <Button
                  color="secondary"
                  onClick={() => setShowModal({ ...showModal, openDialog: false })}>
                  <CloseIcon />
               </Button>
            </div>
         </DialogTitle>
         <DialogContent dividers sx={{ paddingY: 2, paddingX: 0 }}>
            
            { 
               formType === 'Investment'? <InvestmentForm setRender={setRender} showModal={showModal} setShowModal={setShowModal} />  :
               
               formType === "Edit Investment" ? <EditInvestment setRender={setRender} showModal={showModal} setShowModal={setShowModal} />  :
               
               formType === 'Add' ? <ItemForm setRender={setRender} showModal={showModal} setShowModal={setShowModal} /> : 
               
               <EditItem setRender={setRender} cItem={currItem} showModal={showModal} setShowModal={setShowModal} /> 
            }
         </DialogContent>
      </Dialog>
   );
}