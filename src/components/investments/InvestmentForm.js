import React, { useRef, useState } from "react";
import {
   Container,
   FormLabel,
   TextField,
   RadioGroup,
   Radio,
   FormControlLabel,
   FormHelperText,
   MenuItem,
   FormControl,
   InputLabel,
   Select,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import Cookies from "universal-cookie";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { createInvestment } from '../../api/index';
import '../../styles/itemform.css';

const Date = styled(DatePicker)`
    width: 300px
`;

const InvestmentForm = (props) => {


   let user = JSON.parse(localStorage.getItem('user-info'));

   let QualifyArray = [
      "None",
      "80C",
      "80D"
   ];

   let CategoryArray = [
      "Stock",
      "Mutual Funds",
      "Fixed Deposit"
   ];

   const [investmentData, setInvestmentData] = useState({
      investmentName: "",
      investmentAmount: "",
      investmentVendor: "",
      investmentDate: null,
      investmentDuration: "",
      dateOfMature: null,
      modeOfPayment: "Online",
      onlinePaymentDetails: {
         onlinebank: "",
         onlinepaymentDate: null,
         paymentId: "",
      },
      cashReceipt: "",
      chequeDetails: {
         chequebank: "",
         chequeNumber: "",
         chequepaymentDate: null,
      },
      investmentDocuments: [],
      investmentQualify: "",
      investmentCategory: "",
      description: "",
      contactPerson: {
         personName: "",
         contactNumber: "",
      },
      userId: user.id
   });

   const { investmentName, investmentAmount, investmentVendor, investmentDate, investmentDuration, dateOfMature, modeOfPayment, onlinePaymentDetails: { onlinebank, onlinepaymentDate, paymentId }, cashReceipt, chequeDetails: { chequebank, chequeNumber, chequepaymentDate }, investmentDocuments, investmentQualify, investmentCategory, description, contactPerson: { personName, contactNumber }, userId, } = investmentData;

   const [openQualifyMenu, setOpenQualifyMenu] = useState(false);
   const [openCatMenu, setOpenCatMenu] = useState(false);
   const { setRender, showModal, setShowModal } = props;

   const loadingRef = useRef(false);

   var cookie = new Cookies();
   cookie.set('user', userId, { path: '/' })

   const [errors, setErrors] = useState({
      investmentName: {
         value: investmentName,
         error: false,
         errorMessage: ''
      },
      investmentAmount: {
         value: investmentAmount,
         error: false,
         errorMessage: ''
      },
      investmentVendor: {
         value: investmentVendor,
         error: false,
         errorMessage: ''
      },
      investmentDate: {
         value: investmentDate,
         error: false,
         errorMessage: ''
      },
      investmentDuration: {
         value: investmentDuration,
         error: false,
         errorMessage: ''
      },
      dateOfMature: {
         value: dateOfMature,
         error: false,
         errorMessage: ''
      },
      modeOfPayment: {
         value: modeOfPayment,
         error: false,
         errorMessage: ''
      },
      onlinePaymentDetails: {
         onlinebank: {
            value: onlinebank,
            error: false,
            errorMessage: ''
         },
         onlinepaymentDate: {
            value: onlinepaymentDate,
            error: false,
            errorMessage: ''
         },
         paymentId: {
            value: paymentId,
            error: false,
            errorMessage: ''
         },
      },
      cashReceipt: {
         value: cashReceipt,
         error: false,
         errorMessage: ''
      },
      chequeDetails: {
         chequebank: {
            value: chequebank,
            error: false,
            errorMessage: ''
         },
         chequeNumber: {
            value: chequeNumber,
            error: false,
            errorMessage: ''
         },
         chequepaymentDate: {
            value: chequepaymentDate,
            error: false,
            errorMessage: ''
         },
      },
      investmentDocuments: {
         value: investmentDocuments,
         error: false,
         errorMessage: ''
      },
      investmentQualify: {
         value: investmentQualify,
         error: false,
         errorMessage: ''
      },
      investmentCategory: {
         value: investmentCategory,
         error: false,
         errorMessage: ''
      },
      description: {
         value: description,
         error: false,
         errorMessage: ''
      },
      contactPerson: {
         value: personName,
         error: false,
         errorMessage: '',
         personName: {
            value: personName,
            error: false,
            errorMessage: ''
         },
         contactNumber: {
            value: contactNumber,
            error: false,
            errorMessage: ''
         },
      }
   })


   const clear = () => {
      setInvestmentData({ investmentName: '', investmentAmount: '',investmentVendor: '',  investmentDate: null, investmentDuration: '', dateOfMature: null, modeOfPayment: '', onlinePaymentDetails: { onlinebank: '', onlinepaymentDate: null, paymentId: '' }, cashReceipt: '', chequeDetails: { chequebank: '', chequeNumber: '', chequepaymentDate: null }, investmentQualify: '', investmentCategory: '', description: '', contactPerson: { personName: '', contactNumber: '' } });
   }


   function validateInvestmentDetails() {

      loadingRef.current = true;


      const errorFields = Object.keys(errors);
      let newErrorValues = { ...errors }
      let values = Object.values(investmentData)
      let countErrors = 0;

      for (let index = 0; index < errorFields.length; index++) {
         const currentField = errorFields[index];
         const currentValue = values[index];

         if (currentField === "cashReceipt" || currentField === "description") {
            continue;
         }

         if ((currentValue === '') || (currentValue === null)) {

            console.log(currentField)
            countErrors = countErrors + 1;
            newErrorValues = {
               ...newErrorValues,
               [currentField]: {
                  ...newErrorValues[currentField],
                  error: true,
                  errorMessage: 'This field is required'
               }
            }
         } else {
            newErrorValues = {
               ...newErrorValues,
               [currentField]: {
                  ...newErrorValues[currentField],
                  error: false,
                  errorMessage: ''
               }
            }
         }
      }

      if (investmentData.modeOfPayment === "Online") {         // Check if any online payment details are filled
         const onlineDetailsFilled =
            investmentData.onlinePaymentDetails.onlinebank ||
            investmentData.onlinePaymentDetails.onlinepaymentDate ||
            investmentData.onlinePaymentDetails.paymentId;

         if (!onlineDetailsFilled) {
            errors.modeOfPayment.errorMessage =
               "Online payment details are required.";
            setErrors({ ...errors });
            countErrors++;
            loadingRef.current = false;
            return;
         }
      } else {
         errors.modeOfPayment.errors = false;
         errors.modeOfPayment.errorMessage = '';
         setErrors({ ...errors });
      }
      if (investmentData.modeOfPayment === "Cash") {              // Check if cash receipt is empty
         if (!handlecashReceiptImg(cashReceipt)) {

            errors.modeOfPayment.errorMessage =
               "Please upload cash receipt";
            setErrors({ ...errors });
            loadingRef.current = false;
            countErrors++;
            loadingRef.current = false;
            return;
         }
      } else {
         errors.modeOfPayment.errors = false;
         errors.modeOfPayment.errorMessage = '';
         setErrors({ ...errors });
      }
      if (investmentData.modeOfPayment === "Cheque") {      // Check if handleChequeDetailsChange is empty
         const chequeDetailsFields = Object.keys(investmentData.chequeDetails);
         if (chequeDetailsFields.some((field) => !investmentData.chequeDetails[field])) {
            newErrorValues.modeOfPayment.error = true;
            newErrorValues.modeOfPayment.errorMessage =
               "All Cheque Details are required when selecting Cheque payment mode";
            countErrors++;
            loadingRef.current = false;
            return;
         }
      } else {
         errors.modeOfPayment.errors = false;
         errors.modeOfPayment.errorMessage = '';
         setErrors({ ...errors });
      }


      // Check if point of contact is empty

      const contactDetailsFilled =
         investmentData.contactPerson.personName &&
         investmentData.contactPerson.contactNumber;

      if (!contactDetailsFilled) {
         errors.contactPerson.errorMessage =
            "Person details are required.";
         setErrors({ ...errors });
         loadingRef.current = false;
         return;
      } else {
         errors.contactPerson.errors = false;
         errors.contactPerson.errorMessage = '';
         setErrors({ ...errors });
      }

      setErrors(newErrorValues);
      if (countErrors !== 0) loadingRef.current = false;
      if (countErrors === 0) addInvestmentDetails();
      setTimeout(() => {
         loadingRef.current = false;

      }, 2000);

   }

   const addInvestmentDetails = async () => {

      await createInvestment(investmentData);

      setShowModal({ ...showModal, openDialog: false });
      setRender('addSet');

      toast.success("Investment Added Successfully!!", {
         position: "top-center",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         theme: "light",
      });
   }

   
   const onValueChange = (e) => {

      setErrors({
         ...errors,
         [e.target.name]: {
            ...errors[e.target.name],
            error: false,
            errorMessage: ''
         }
      })
      setInvestmentData({ ...investmentData, [e.target.name]: e.target.value })
   }

   const setDateOfMature = (date) => {
      setInvestmentData({ ...investmentData, dateOfMature: date })
      setErrors({ ...errors, dateOfMature: { ...errors[dateOfMature], error: false, errorMessage: '' } })
   }

   const setInvestmentDate = (date) => {
      setInvestmentData({ ...investmentData, investmentDate: date })
      setErrors({ ...errors, investmentDate: { ...errors[investmentDate], error: false, errorMessage: '' } })
   }

   const handlecashReceiptImg = (img) => {


      setInvestmentData({ ...investmentData, cashReceipt: img });

      const validExtensions = ['png', 'jpeg', 'jpg', 'pdf'];
      const fileExtension = img.split(';')[0].split('/')[1]
      if (!validExtensions.includes(fileExtension)) {
         setErrors({
            ...errors,
            modeOfPayment: {
               ...errors.modeOfPayment,
               error: true,
               errorMessage: 'File must be in img and pdf format'
            }
         });
         return;
      }
      const newRes = (img.length * (3 / 4)) - 2;
      const size = (newRes / (1024 * 1024));

      if (size > 2) {
         setErrors({
            ...errors,
            modeOfPayment: {
               ...errors.modeOfPayment,
               error: true,
               errorMessage: 'File size should not exceed 2MB.'
            }
         });
         return;
      }
      setErrors({
         ...errors,
         modeOfPayment: {
            ...errors.modeOfPayment,
            error: false,
            errorMessage: ''
         }
      });

      return true;
   }

   const handleOnlinePaymentDetailsChange = (field, value) => {

      setInvestmentData({
         ...investmentData,
         onlinePaymentDetails: {
            ...investmentData.onlinePaymentDetails,
            [field]: value
         },
      });
   };

   const handleChequeDetailsChange = (field, value) => {
      setInvestmentData({
         ...investmentData,
         chequeDetails: {
            ...investmentData.chequeDetails,
            [field]: value,
         },
      });
   };


   const handleInvestmentDocuments = (images) => {


      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      let isValidSize = true;

      images.forEach((image) => {
         const fileSize = image.file.size;
         if (fileSize > maxSize) {
            isValidSize = false;
            return;
         }
      });

      if (!isValidSize) {

         setErrors({
            ...errors,
            investmentDocuments: {
               ...errors.investmentDocuments,
               error: false,
               errorMessage: 'File size should not exceed 2MB.'
            }
         });
         return;
      }

      // To check the file extension
      const allowedFileExtensions = ["jpg", "jpeg", "png", "pdf"];

      let isValidExtensions = true;

      images.forEach((image) => {
         const fileSize = image.file.size;
         if (fileSize > maxSize) {
            isValidSize = false;
            return;
         }

         const fileExtension = image.file.type.split("/")[1]; // Get the file extension
         if (!allowedFileExtensions.includes(fileExtension)) {
            isValidExtensions = false;
            return;
         }
      });
      if (!isValidExtensions) {

         setErrors({
            ...errors,
            investmentDocuments: {
               ...errors.investmentDocuments,
               error: false,
               errorMessage: 'Allowed file formats: jpg, jpeg, png, pdf.'
            }
         });

         return;
      }

      setInvestmentData({
         ...investmentData,
         investmentDocuments: images.map((image) => image.base64)
      });

      setErrors({
         ...errors,
         investmentDocuments: {
            ...errors.investmentDocuments,
            error: false,
            errorMessage: ''
         }
      });
   };


   const handleContactPersonDetailsChange = (field, value) => {

      if (field === "personName") {
         // Allow only alphabetic characters and spaces
         value = value.replace(/[^A-Za-z\s]/g, "");
      } else if (field === "contactNumber") {
         // Allow only digits and limit to 10 characters
         value = value.replace(/[^\d]/g, "").slice(0, 10);
      }

      setInvestmentData({
         ...investmentData,
         contactPerson: {
            ...investmentData.contactPerson,
            [field]: value,
         },
      });
   };
   return (
      <Container>
         <div className="item-form">
            <div >
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Name <span className="text-danger">*</span></FormLabel>

               <TextField variant='outlined' fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  error={(errors.investmentName.error)}
                  helperText={(errors.investmentName.error && errors.investmentName.errorMessage)}
                  name='investmentName' value={investmentName}
                  size="small"
                  inputProps={{ maxLength: 250 }}
               ></TextField>
            </div>
            <div >


               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Vender <span className="text-danger">*</span></FormLabel>

               <TextField variant='outlined' fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  error={(errors.investmentVendor.error)}
                  helperText={(errors.investmentVendor.error && errors.investmentVendor.errorMessage)}
                  name='investmentVendor' value={investmentVendor}
                  size="small"
                  inputProps={{ maxLength: 250 }}
               ></TextField>
            </div>


            <div className="grid grid-2">
               <div sx={{ padding: '20px' }}>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Amount <span className="text-danger">*</span></FormLabel>

                  <TextField type={'text'} onChange={(e) => onValueChange(e)}
                     name='investmentAmount' fullWidth
                     error={(errors.investmentAmount.error) || (investmentAmount !== '' && !investmentAmount.match(/^\d+$/))}
                     helperText={(errors.investmentAmount.error && errors.investmentAmount.errorMessage) || (!investmentAmount.match(/^\d+$/) && investmentAmount !== '' ? 'Only digits are allowed' : '')}
                     value={investmentAmount}
                     size="small"
                  ></TextField>
               </div>

               <div>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Date <span className="text-danger">*</span></FormLabel>
                  {/* DatePicker or similar component */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Date
                        name='dateOfMature'
                        renderInput={(params) => <TextField {...params} size="small" />}
                        value={investmentDate}
                        onChange={(date) => setInvestmentDate(date)}
                     />
                     <FormHelperText error>{errors.investmentDate.error && errors.investmentDate.errorMessage}</FormHelperText>
                  </LocalizationProvider>
               </div>
            </div>
            <div className="grid grid-2">
               <div sx={{ padding: '20px' }}>

                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Duration <span className="text-danger">*</span></FormLabel>

                  <TextField type={'text'} onChange={(e) => onValueChange(e)}
                     name='investmentDuration' fullWidth
                     error={(errors.investmentDuration.error) || (investmentDuration !== '' && !investmentDuration.match(/^\d+$/))}
                     helperText={(errors.investmentDuration.error && errors.investmentDuration.errorMessage) || (!investmentDuration.match(/^\d+$/) && investmentDuration !== '' ? 'Only digits are allowed' : '')}
                     value={investmentDuration}
                     size="small"
                  ></TextField>
               </div>
               <div>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Mature <span className="text-danger">*</span></FormLabel>
                  {/* DatePicker or similar component */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Date
                        name='dateOfMature'
                        renderInput={(params) => <TextField {...params} size="small" />}
                        value={dateOfMature}
                        onChange={(date) => setDateOfMature(date)}
                     />
                     <FormHelperText error>{errors.dateOfMature.error && errors.dateOfMature.errorMessage}</FormHelperText>
                  </LocalizationProvider>
               </div>
            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Mode of Payment <span className="text-danger">*</span></FormLabel>

               <RadioGroup row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="modeOfPayment"
                  value={modeOfPayment}
                  onChange={(e) => onValueChange(e)}
               >
                  <FormControlLabel
                     value="Online"
                     control={<Radio />}
                     label="Online"
                  />
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                  <FormControlLabel
                     value="Cheque"
                     control={<Radio />}
                     label="Cheque"
                  />
               </RadioGroup>
            </div>
            {/* Online Payment Details */}
            {investmentData.modeOfPayment === "Online" && (
               <>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Online Payment Details</FormLabel>
                  <div>
                     <FormLabel className="sub-label">Bank</FormLabel>
                     <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 250 }}
                        value={investmentData.onlinePaymentDetails.onlinebank}
                        onChange={(e) =>
                           handleOnlinePaymentDetailsChange("onlinebank", e.target.value)
                        }
                     />
                  </div>
                  <div className="grid grid-2">
                     <div sx={{ padding: '20px' }}>

                        <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Payment<span className="text-danger">*</span></FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <Date
                              name='onlinepaymentDate'
                              renderInput={(params) => <TextField {...params} size="small" />}
                              value={onlinepaymentDate}
                              onChange={(date) => handleOnlinePaymentDetailsChange("onlinepaymentDate", date)}
                           />
                        </LocalizationProvider>
                     </div>
                     <div>
                        <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment ID<span className="text-danger">*</span></FormLabel>
                        <TextField
                           name="paymentId"
                           fullWidth
                           variant="outlined"
                           size="small"
                           inputProps={{ maxLength: 100 }}
                           value={investmentData.onlinePaymentDetails.paymentId}
                           onChange={(e) =>
                              handleOnlinePaymentDetailsChange("paymentId", e.target.value)
                           }
                        />
                     </div>
                  </div>
               </>
            )}
            {/* Cash Receipt */}
            {investmentData.modeOfPayment === "Cash" && (
               <div>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Cash Receipt<span className="text-danger">*</span></FormLabel>
                  <span className="input-file" >
                     <FileBase64
                        name="cashReceipt"
                        type="file"
                        sx={{ display: 'none' }}
                        multiple={false}
                        onDone={({ base64 }) => { handlecashReceiptImg(base64) }}
                     />
                  </span>
               </div>
            )}
            {/* Cheque Details */}
            {investmentData.modeOfPayment === "Cheque" && (
               <>
                  <FormLabel className="label">Cheque Details</FormLabel>
                  <div>
                     <FormLabel className="sub-label">Bank</FormLabel>
                     <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 250 }}
                        value={investmentData.chequeDetails.chequebank}
                        onChange={(e) =>
                           handleChequeDetailsChange("chequebank", e.target.value)
                        }
                     />
                  </div>
                  <div className="grid grid-2">
                     <div sx={{ padding: '20px' }}>

                        <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Date <span className="text-danger">*</span></FormLabel>
                        {/* DatePicker or similar component */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <Date
                              name='chequepaymentDate'
                              renderInput={(params) => <TextField {...params} size="small" />}
                              value={chequepaymentDate}
                              onChange={(date) => handleChequeDetailsChange("chequepaymentDate", date)}
                           />
                        </LocalizationProvider>
                     </div>
                     <div>
                        <FormLabel className="label" id="demo-controlled-radio-buttons-group">Cheque Number<span className="text-danger">*</span></FormLabel>
                        <TextField
                           fullWidth
                           variant="outlined"
                           size="small"
                           inputProps={{ maxLength: 100 }}
                           name="chequeNumber"
                           value={investmentData.chequeDetails.chequeNumber}
                           onChange={(e) =>
                              handleChequeDetailsChange("chequeNumber", e.target.value)
                           }
                        />
                     </div>
                  </div>
               </>

            )}
            <FormHelperText error>{errors.modeOfPayment.errorMessage}</FormHelperText>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Document<span className="text-danger">*</span></FormLabel>
               <span className="input-file" >
                  <FileBase64
                     name="investmentDocuments"
                     type="file"
                     sx={{ display: 'none' }}
                     multiple={true}
                     onDone={(images) => handleInvestmentDocuments(images)}
                  />
                  <FormHelperText error>{errors.investmentDocuments.errorMessage}</FormHelperText>
               </span>
            </div>
            <div className="grid grid-2">
               <div sx={{ padding: '20px' }}>

                  <FormControl className='FilterFormControl' sx={{ minWidth: '250px' }} size="small">
                     <InputLabel id="demo-simple-select-label">Investment Qualify</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        open={openQualifyMenu}
                        name="investmentQualify"
                        value={investmentQualify}
                        onClose={() => { setOpenQualifyMenu(false) }}
                        onOpen={() => { setOpenQualifyMenu(true) }}
                        label="Filter"
                        onChange={onValueChange}>

                        {QualifyArray && QualifyArray.map((qualify, index) => (
                           <MenuItem value={qualify.toLowerCase()} key={qualify + index} >
                              {qualify}
                           </MenuItem>))
                        }

                     </Select>
                  </FormControl>
                  <FormHelperText error>{errors.investmentQualify.errorMessage}</FormHelperText>
               </div>
               <div >
                  <FormControl className='FilterFormControl' sx={{ minWidth: '250px' }} size="small">
                     <InputLabel id="demo-simple-select-label">Investment Category</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        open={openCatMenu}
                        name="investmentCategory"
                        value={investmentCategory}
                        onClose={() => { setOpenCatMenu(false) }}
                        onOpen={() => { setOpenCatMenu(true) }}
                        label="Filter"
                        onChange={onValueChange}>

                        {CategoryArray && CategoryArray.map((cat, index) => (
                           <MenuItem value={cat} key={cat + index} >
                              {cat}
                           </MenuItem>))
                        }
                     </Select>
                  </FormControl>
                  <FormHelperText error>{errors.investmentCategory.errorMessage}</FormHelperText>
               </div>
            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Investment Description<span className="text-danger">*</span></FormLabel>
               <TextField
                  multiline rows={5}
                  fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  name='description'
                  value={description}
                  size="small"
                  inputProps={{ maxLength: 1000 }}
               ></TextField>
            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Point Of Contact<span className="text-danger">*</span></FormLabel>
               <div className="grid grid-2">
                  <div sx={{ padding: '20px' }}>
                     <FormLabel className="label" id="demo-controlled-radio-buttons-group">Name<span className="text-danger">*</span></FormLabel>
                     <TextField variant='outlined' fullWidth
                        type={'text'} onChange={(e) => handleContactPersonDetailsChange("personName", e.target.value)}
                        error={(errors.contactPerson.personName.error)}
                        helperText={(errors.contactPerson.personName.error && errors.contactPerson.personName.errorMessage)}
                        name='personName' value={investmentData.contactPerson.personName}
                        size="small"
                        inputProps={{ maxLength: 250 }}
                     ></TextField>
                  </div>
                  <div>
                     <FormLabel className="label" id="demo-controlled-radio-buttons-group">Contact Number<span className="text-danger">*</span></FormLabel>
                     <TextField variant='outlined' fullWidth
                        type={'text'} onChange={(e) => handleContactPersonDetailsChange("contactNumber", e.target.value)}
                        error={(errors.contactPerson.contactNumber.error)}
                        helperText={
                           (errors.contactPerson.contactNumber.error &&
                              errors.contactPerson.contactNumber.errorMessage) ||
                           (investmentData.contactPerson.contactNumber.length !== 10 &&
                              investmentData.contactPerson.contactNumber.length > 0 &&
                              "Contact number should be exactly 10 digits")
                        }
                        name='contacNumber' value={investmentData.contactPerson.contactNumber}
                        size="small"
                     ></TextField>
                  </div>
                  <FormHelperText error>{errors.contactPerson.errorMessage}</FormHelperText>
               </div>
            </div>
            <div className="grid grid-2 mt-4">
               <button className="btn btn-secondary btn-danger" onClick={() => clear()}>
                  Reset
               </button>
               <button className="btn btn-primary" disabled={loadingRef.current} onClick={() => validateInvestmentDetails()}>
                  {loadingRef.current ? 'Adding...' : 'Add Investment'}
                  {loadingRef.current && <FontAwesomeIcon icon="spinner" spin />}
               </button>
            </div>
         </div>
      </Container>
   );
};

export default InvestmentForm;
