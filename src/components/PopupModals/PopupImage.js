import { Box, Button, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

export default function PopupImage(props){
   
    const {showImgModal,setShowImgModal} = props;
    const {openImgDialog, id, paymentType, image, loading} = showImgModal;
  
    function downloadBase64File( base64Data) {
        //const linkSource = `data:${contentType};base64,${base64Data}`;
        const linkSource = base64Data;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = 'Payment_'+id+'_'+paymentType;
        downloadLink.click();
   }
   const handleClose = () => {
        setShowImgModal({...showImgModal, openImgDialog: false});
    };

    // Function to detect file type based on the base64 string

	const detectFileType = (base64String) => {
		if (base64String.startsWith("data:image/jpeg;base64,")) {
			return "image";
		} else if (base64String.startsWith("data:image/png;base64,")) {
			return "image";
		} else if (base64String.startsWith("data:image/gif;base64,")) {
			return "image";
		} else if (base64String.startsWith("data:application/pdf;base64,")) {
			return "pdf";
		} else {
			return "unknown"; // Handle other file types if needed
		}
	};
    // Function to display the payment proof in the modal
    const displayPaymentProof = () => {
        if (!showImgModal.image) return null;

        const fileType = detectFileType(showImgModal.image);

        if (fileType === "pdf") {
          return <iframe width="500" height="500" src={showImgModal.image}></iframe>;
        } else if (fileType === "image") {
          return <img src={showImgModal.image} alt='View after sometime or Download to view' style={{ width: '100%', flex: 1 }}/>;
        } else {
          return <div>Unknown file type</div>;
        }
    };
    return(
        <Dialog open= {openImgDialog} onClose={handleClose} maxWidth='md'>
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, paddingLeft: 22}}>
                        Payment Proof
                    </Typography>

                    <Button
                        color="secondary"
                        onClick={()=>setShowImgModal({...showImgModal, openImgDialog: false})}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx= {{paddingY:5}}>
             {
                loading ? <><Container><Box>Loading...<CircularProgress/></Box></Container></> :
                <>
                {image ?
                <Container >
                    {displayPaymentProof()}

                <Box><Button className="btn btn-primary mt-3" onClick={() => downloadBase64File(image)}>Download<DownloadIcon/></Button></Box>
                

                </Container> :
                <Typography>Please upload Payment Proof</Typography>
                }
                </>
             }
            </DialogContent>
        </Dialog>
    );
}