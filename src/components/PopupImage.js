import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

export default function PopupImage(props){
    const {showImgModal,setShowImgModal} = props;
    const {openImgDialog, id, paymentType, image} = showImgModal;
  
    function downloadBase64File( base64Data) {
        //const linkSource = `data:${contentType};base64,${base64Data}`;
        const linkSource = base64Data;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = 'Payment_'+id+'_'+paymentType;
        downloadLink.click();
   }
    return(
        <Dialog open= {openImgDialog} maxWidth='md' width='500'>
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Imgafe
                    </Typography>


                    <Button
                        color="secondary"
                        onClick={()=>setShowImgModal({...showImgModal, openImgDialog: false})}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx= {{paddingY:5}}>
              <Container >
              <img src={`${image}`} alt='View after sometime or Download to view' style={{ width: '100%', height: 300 }}/>
              <Box><Button onClick={() => downloadBase64File(image)}>Download<DownloadIcon/></Button></Box>
              
              </Container>
            </DialogContent>
        </Dialog>
    );
}