import { Button, Container, Dialog, DialogContent, DialogTitle, FormLabel, TextField, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from '@mui/icons-material/Close';
import { getCashReceipt } from "../../api";

export default function DetailedView(props) {

  const { showDetailsModal, setShowDetailsModal } = props;
  const { openDetailsDialog, currInvestment } = showDetailsModal;

  const investmentData = currInvestment;


  const handleClose = () => {
    setShowDetailsModal({ ...showDetailsModal, openDetailsDialog: false });
  };

  const formatedate = (date) => {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const openDataUrlInNewTab = (dataUrl) => {
    const htmlContent = `<html><body><img src="${dataUrl}" /></body></html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    const newTab = window.open(url, '_blank');
    
    // Make sure to revoke the URL object to release resources
    URL.revokeObjectURL(url);
  
    return newTab;
  };

  // get cash receipt
  const getReceipt = async (id) => {
    let response = await getCashReceipt(id);    
    let url = "";
    url += response.data.cashReceipt;
    
    openDataUrlInNewTab(url);

  }

  return (
    <Dialog open={openDetailsDialog} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Investment Details
          </Typography>
          <Button
            color="secondary"
            onClick={() => setShowDetailsModal({ ...showDetailsModal, openDetailsDialog: false })}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers sx={{ paddingY: 2, paddingX: 0 }}>
        <Container>
          <div className="item-form">
            <div >
              <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Name <span className="text-danger">*</span></FormLabel>

              <TextField InputProps={{
                readOnly: true, // Set this field as read-only
              }} variant='outlined' fullWidth
                type={'text'}
                value={investmentData.investmentName}
                size="small"
              ></TextField>
            </div>
            <div >
              <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Vender <span className="text-danger">*</span></FormLabel>

              <TextField InputProps={{
                readOnly: true, // Set this field as read-only
              }} variant='outlined' fullWidth
                type={'text'}
                value={investmentData.investmentVendor}
                size="small"
              ></TextField>
            </div>

            <div className="grid grid-2">
              <div sx={{ padding: '20px' }}>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Amount <span className="text-danger">*</span></FormLabel>

                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  type={'text'}
                  fullWidth
                  value={investmentData.investmentAmount}
                  size="small"
                ></TextField>
              </div>

              <div>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Date <span className="text-danger">*</span></FormLabel>
                {/* DatePicker or similar component */}
                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  type={'text'}
                  fullWidth
                  value={formatedate(new Date(investmentData.investmentDate))}
                  size="small"
                ></TextField>
              </div>
            </div>
            <div className="grid grid-2">
              <div sx={{ padding: '20px' }}>

                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Duration <span className="text-danger">*</span></FormLabel>

                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  type={'text'}
                  fullWidth
                  value={investmentData.investmentDuration}
                  size="small"
                ></TextField>
              </div>
              <div>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Mature <span className="text-danger">*</span></FormLabel>
                {/* DatePicker or similar component */}

                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  type={'text'}
                  fullWidth
                  value={formatedate(new Date(investmentData.dateOfMature))}
                  size="small"
                ></TextField>
              </div>
            </div>
            <div>
              <FormLabel className="label" id="demo-controlled-radio-buttons-group">Mode of Payment <span className="text-danger">*</span></FormLabel>

              <TextField InputProps={{
                readOnly: true, // Set this field as read-only
              }}
                fullWidth
                variant="outlined"
                size="small"
                value={investmentData.modeOfPayment}

              />
            </div>
            {/* Online Payment Details */}
            {investmentData.modeOfPayment === "Online" && (
              <>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Online Payment Details</FormLabel>
                <div>
                  <FormLabel className="sub-label">Bank</FormLabel>
                  <TextField InputProps={{
                    readOnly: true, // Set this field as read-only
                  }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={investmentData.onlinePaymentDetails.onlinebank}

                  />
                </div>
                <div className="grid grid-2">
                  <div sx={{ padding: '20px' }}>

                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Payment<span className="text-danger">*</span></FormLabel>
                    <TextField InputProps={{
                      readOnly: true, // Set this field as read-only
                    }}
                      type={'text'}
                      fullWidth
                      value={formatedate(new Date(investmentData.onlinePaymentDetails.onlinepaymentDate))}
                      size="small"
                    ></TextField>

                  </div>
                  <div>
                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment ID<span className="text-danger">*</span></FormLabel>
                    <TextField InputProps={{
                      readOnly: true, // Set this field as read-only
                    }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={investmentData.onlinePaymentDetails.paymentId}

                    />
                  </div>
                </div>
              </>
            )}
            {/* Cash Receipt */}
            {investmentData.modeOfPayment === "Cash" && (

              <div className="grid grid-2">
                <div sx={{ padding: '20px' }}>
                  <FormLabel className="label">Cash Receipt<span className="text-danger">*</span></FormLabel>
                </div>
                <div className="cell-with-tooltip" title={"Show Details"}>
                  <Button
                    title={"Display all details"}
                    sx={{ color: "#fffff", padding: "0 2px" }}
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => getReceipt(investmentData._id)}
                  >View &nbsp;
                    <VisibilityIcon fontSize="small" />
                  </Button>
                </div>

              </div>
            )}
            {/* Cheque Details */}
            {investmentData.modeOfPayment === "Cheque" && (
              <>
                <FormLabel className="label">Cheque Details</FormLabel>
                <div>
                  <FormLabel className="sub-label">Bank</FormLabel>
                  <TextField InputProps={{
                    readOnly: true, // Set this field as read-only
                  }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={investmentData.chequeDetails.chequebank}

                  />
                </div>
                <div className="grid grid-2">
                  <div sx={{ padding: '20px' }}>
                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Date <span className="text-danger">*</span></FormLabel>
                    {/* DatePicker or similar component */}
                    <TextField InputProps={{
                      readOnly: true, // Set this field as read-only
                    }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={formatedate(new Date(investmentData.chequeDetails.chequepaymentDate))}
                    />
                  </div>
                  <div>
                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Cheque Number<span className="text-danger">*</span></FormLabel>
                    <TextField InputProps={{
                      readOnly: true, // Set this field as read-only
                    }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={investmentData.chequeDetails.chequeNumber}
                    />
                  </div>
                </div>
              </>

            )}

            <div className="grid grid-2">
              <div sx={{ padding: '20px' }}>

                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Qualify<span className="text-danger">*</span></FormLabel>
                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  fullWidth
                  type={'text'}
                  value={investmentData.investmentQualify}
                  size="small"
                ></TextField>
              </div>
              <div >
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Category<span className="text-danger">*</span></FormLabel>
                <TextField InputProps={{
                  readOnly: true, // Set this field as read-only
                }}
                  fullWidth
                  type={'text'}
                  value={investmentData.investmentCategory}
                  size="small"
                ></TextField>
              </div>
            </div>
            <div>
              <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Description<span className="text-danger">*</span></FormLabel>
              <TextField InputProps={{
                readOnly: true, // Set this field as read-only
              }}
                fullWidth
                type={'text'}
                value={investmentData.description}
                size="small"
              ></TextField>
            </div>
            <div>
              <FormLabel className="label" id="demo-controlled-radio-buttons-group">Point Of Contact<span className="text-danger"></span></FormLabel>
              <div className="grid grid-2">
                <div sx={{ padding: '20px' }}>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Name<span className="text-danger"></span></FormLabel>
                  <TextField InputProps={{
                    readOnly: true, // Set this field as read-only
                  }} variant='outlined' fullWidth
                    type={'text'}
                    value={investmentData.contactPerson ? investmentData.contactPerson.personName : ''}
                    size="small"
                  ></TextField>
                </div>
                <div>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Contact Number<span className="text-danger"></span></FormLabel>
                  <TextField InputProps={{
                    readOnly: true, // Set this field as read-only
                  }} variant='outlined' fullWidth
                    type={'text'}
                    value={investmentData.contactPerson ? investmentData.contactPerson.contactNumber : ''}
                    size="small"
                  ></TextField>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}