import { useRef, useState } from "react";
import FileBase64 from 'react-file-base64';

import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Container, FormHelperText, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createItem } from '../../api/index';
import '../../styles/itemform.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Date = styled(DatePicker)`
    width: 300px
`;

const ItemForm = (props) => {

   let user = JSON.parse(localStorage.getItem('user-info'));

   const [itemData, setItemData] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: null, dateOfPayment: null, description: '', paymentProof: '', userId: user.id });
   const { title, amount, category, paymentType, dateOfInvoice, dateOfPayment, description, paymentProof, userId } = itemData;

   const { setRender, showModal, setShowModal } = props;

   const loadingRef = useRef(false);

   var cookie = new Cookie();
   cookie.set('user', userId, { path: '/' })
   const [errors, setErrors] = useState({
      title: {
         value: title,
         error: false,
         errorMessage: ''
      },
      amount: {
         value: amount,
         error: false,
         errorMessage: ''
      },
      category: {
         value: category,
         error: false,
         errorMessage: ''
      },
      paymentType: {
         value: paymentType,
         error: false,
         errorMessage: ''
      },
      dateOfInvoice: {
         value: dateOfInvoice,
         error: false,
         errorMessage: ''
      },
      dateOfPayment: {
         value: dateOfPayment,
         error: false,
         errorMessage: ''
      }
   })

   function validateItemDetails() {

      loadingRef.current = true;

      const errorFields = Object.keys(errors);
      let newErrorValues = { ...errors }
      let values = Object.values(itemData)
      let countErrors = 0;
      for (let index = 0; index < errorFields.length; index++) {
         const currentField = errorFields[index];
         const currentValue = values[index];
         
         if (currentValue === '' || ((currentField === 'dateOfInvoice'|| currentField === 'dateOfPayment') && currentValue === null)) {
            countErrors = countErrors + 1;
            newErrorValues = {
               ...newErrorValues,
               [currentField]: {
                  ...newErrorValues[currentField],
                  error: true,
                  errorMessage: 'This field is required'
               }
            }
         }
      }
      

      setErrors(newErrorValues);
      if (countErrors !== 0) loadingRef.current = false;
      if (countErrors === 0) addItemDetails();
      setTimeout(() => {
         loadingRef.current = false;

      }, 2000);

   }
   const addItemDetails = async () => {

      await createItem(itemData);
      setShowModal({ ...showModal, openDialog: false });
      setRender('addSet');

      toast.success("Item Added Successfully!!", {
         position: "top-center",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         theme: "light",
      });
   }

   const clear = () => {
      setItemData({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: null, dateOfPayment: null, description: '', paymentProof: '' });
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
      setItemData({ ...itemData, [e.target.name]: e.target.value })
   }
   const setDateOfInvoice = (date) => {
      setItemData({ ...itemData, dateOfInvoice: date })
      setErrors({...errors, dateOfInvoice: {...errors[dateOfInvoice], error: false, errorMessage: ''}})
   }
   const setDateOfPayment = (date) => {
      setItemData({ ...itemData, dateOfPayment: date })
      setErrors({...errors, dateOfPayment: {...errors[dateOfPayment], error: false, errorMessage: ''}})
   }

   const handleImageData = (img) => {

      setItemData({ ...itemData, paymentProof: img });
      const validExtensions = ['png', 'jpeg', 'jpg', 'pdf'];
      const fileExtension = img.split(';')[0].split('/')[1]
      if (!validExtensions.includes(fileExtension)) {
         alert('File must be in img and pdf format');
      }
      const newRes = (img.length * (3 / 4)) - 2;
      const size = (newRes / (1024 * 1024)); //1048576;2,560,181

      if (size > 1.5) {
         alert('File limit exceed');
      }
      console.log(paymentProof);

   }

   return (

      <Container>
         <div className="item-form">
            <div >
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Item Title <span className="text-danger">*</span></FormLabel>

               <TextField variant='outlined' fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  error={(errors.title.error)}
                  helperText={(errors.title.error && errors.title.errorMessage)}
                  name='title' value={title}
                  size="small"
               ></TextField>
            </div>
            <div >
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Amount <span className="text-danger">*</span></FormLabel>

               <TextField type={'text'} onChange={(e) => onValueChange(e)}
                  name='amount' fullWidth
                  error={(errors.amount.error) || (amount !== '' && !amount.match(/^\d+$/))}
                  helperText={(errors.amount.error && errors.amount.errorMessage) || (!amount.match(/^\d+$/) && amount !== '' ? 'Only digits are allowed' : '')}
                  value={amount}
                  size="small"
               ></TextField>
            </div>

            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Category <span className="text-danger">*</span></FormLabel>

               <TextField fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  name='category'
                  error={(errors.category.error)}
                  helperText={(errors.category.error && errors.category.errorMessage)}
                  value={category}
                  size="small"
               ></TextField>
            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Type <span className="text-danger">*</span></FormLabel>

               <RadioGroup row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="paymentType"
                  value={paymentType}
                  onChange={(e) => onValueChange(e)}
               >
                  <FormControlLabel value="Income" control={<Radio required={true} />} label="Income" />
                  <FormControlLabel value="Expense" control={<Radio required={true} />} label="Expense" />
               </RadioGroup>
               <FormHelperText error>{errors.paymentType.errorMessage}</FormHelperText>
            </div>
            <div className="grid grid-2">
               <div sx={{padding: '20px'}}>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Invoice <span className="text-danger">*</span></FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Date
                        name='dateOfInvoice'
                        renderInput={(params) => <TextField {...params} size="small" />}
                        value={dateOfInvoice}
                        onChange={(date) => setDateOfInvoice(date)}
                     />
                  </LocalizationProvider>
                 <FormHelperText error>{errors.dateOfInvoice.error && errors.dateOfInvoice.errorMessage}</FormHelperText>
               </div>
               <div>
                  <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Payment <span className="text-danger">*</span></FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Date
                        name='dateOfPayment'
                        renderInput={(params) => <TextField {...params} size="small" />}
                        value={dateOfPayment}
                        onChange={(date) => setDateOfPayment(date)}
                     />
                  </LocalizationProvider>
                  <FormHelperText error>{errors.dateOfPayment.error && errors.dateOfPayment.errorMessage}</FormHelperText>
               </div>
            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Description</FormLabel>

               <TextField
                  multiline rows={5}
                  fullWidth
                  type={'text'} onChange={(e) => onValueChange(e)}
                  name='description'
                  value={description}
                  size="small"
               ></TextField>

            </div>
            <div>
               <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Proof</FormLabel>
               
               <span className="input-file" >
                  <FileBase64
                     type="file"
                     sx={{ display: 'none' }}
                     multiple={false}
                     onDone={({ base64 }) => { handleImageData(base64) }}
                  />
               </span>
            </div>

            <div className="grid grid-2 mt-4">
               <button className="btn btn-secondary btn-danger" onClick={() => clear()}>
                  Reset
               </button>
               <button className="btn btn-primary" disabled={loadingRef.current} onClick={() => validateItemDetails()}>
                  {loadingRef.current ? 'Adding...' : 'Add Item'}
                  {loadingRef.current && <FontAwesomeIcon icon="spinner" spin />}
               </button>
            </div>
         </div>

      </Container >


   );
}

export default ItemForm;