import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import ItemForm from "../Items/ItemForm";
import EditItem from "../Items/EditItem";

export default function Popup(props) {

   const { setRender, showModal, setShowModal, formType } = props;
   const { openDialog, currItem } = showModal;
   return (
      <Dialog open={openDialog} maxWidth='md'>
         <DialogTitle>
            <div style={{ display: 'flex' }}>
               <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  {formType} Item Details
               </Typography>
               <Button
                  sx={{ padding: 0, minWidth: 0 }}
                  color="secondary"
                  onClick={() => setShowModal({ ...showModal, openDialog: false })}>
                  <CloseIcon />
               </Button>
            </div>
         </DialogTitle>
         <DialogContent dividers sx={{ paddingY: 2, paddingX: 0 }}>
            {formType === 'Add' ? <ItemForm setRender={setRender} showModal={showModal} setShowModal={setShowModal} /> : <EditItem setRender={setRender} cItem={currItem} showModal={showModal} setShowModal={setShowModal} />}
         </DialogContent>
      </Dialog>
   );
}