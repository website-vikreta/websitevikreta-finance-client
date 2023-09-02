// PopupImage.js
import React from 'react';
import { Box, Button, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';



export default function PopupImage(props) {
    const { showDocsModal, setShowDocsModal } = props;
    const { openImgDialog, id, documents, loading } = showDocsModal;

    const handleClose = () => {
        setShowDocsModal({ ...showDocsModal, openImgDialog: false });
    };

    const detectFileType = (base64String) => {
        if (base64String.startsWith('data:image/jpeg;base64,')) {
            return 'image';
        } else if (base64String.startsWith('data:image/png;base64,')) {
            return 'image';
        } else if (base64String.startsWith('data:image/gif;base64,')) {
            return 'image';
        } else if (base64String.startsWith('data:application/pdf;base64,')) {
            return 'pdf';
        } else {
            return 'unknown'; // Handle other file types if needed
        }
    };


    function downloadInvestmentDocuments(documentsArray) {
        const zip = new JSZip();

        
        // Loop through the documents array
        documentsArray.forEach((documentData, index) => {
            
            var fileType = detectFileType(documentData);

            const base64Data = documentData.split(',')[1]; // Replace with the actual base64 data            

            const fileName = `Investment_${index + 1}.${fileType === 'pdf' ? fileType : 'jpg'}`;
            // Add the file to the zip
            zip.file(fileName, base64Data, { base64: true });
        });

        // Generate the zip content
        zip.generateAsync({ type: 'blob' }).then((content) => {
            // Save the zip as a file
            saveAs(content, `Investment_Documents_${id}.zip`);
        });
    }
    return (
        <Dialog open={openImgDialog} onClose={handleClose} maxWidth="md">
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, paddingLeft: 22 }}>
                        Investment Documents
                    </Typography>
                    <Button color="secondary" onClick={() => setShowDocsModal({ ...showDocsModal, openImgDialog: false })}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers sx={{ paddingY: 5 }}>
                {
                    loading ? <><Container><Box>Loading...<CircularProgress /></Box></Container></> :
                        <>

                            {documents[0] ?
                                <Container >

                                    {documents.map((document, index) => (
                                        <div key={index}>
                                            {detectFileType(document) === 'image' ? (
                                                <img src={document} alt="View after sometime or Download to view" style={{ width: '100%', flex: 1, paddingTop: 30 }} />
                                            ) : (
                                                <iframe width="500" height="500" title={id} src={document}></iframe>
                                            )}
                                        </div>

                                    ))}
                                    <Box><Button className="btn btn-primary mt-3" onClick={() => downloadInvestmentDocuments(documents)}>Download<DownloadIcon /></Button></Box>


                                </Container> :
                                <Typography>Please Upload Investment Documents</Typography>
                            }
                        </>
                }
            </DialogContent>
        </Dialog>
    );
}
