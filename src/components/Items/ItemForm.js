import { useRef, useState } from "react";
import FileBase64 from 'react-file-base64';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Container, FormHelperText, FormControlLabel, FormLabel, Table, RadioGroup, Radio } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createItem } from '../../api/index';
import '../../styles/ItemForm.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Date = styled(DatePicker)`
    width: 250px
`;
const StyledTable = styled(Table)`
    width: 200px;
   
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
         if (currentValue === '') {
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
      if(countErrors !== 0) loadingRef.current = false;
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

      <Container >

         <StyledTable>
            <table>
               <tbody>
                  <tr>
                     <td colSpan='2'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Item Title</FormLabel>

                        <TextField variant='outlined' fullWidth
                           type={'text'} onChange={(e) => onValueChange(e)}
                           error={(errors.title.error)}
                           helperText={(errors.title.error && errors.title.errorMessage)}
                           name='title' value={title}
                           size="small"
                        ></TextField>

                     </td>
                  </tr>
                  <tr >
                     <td colSpan='2'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Amount</FormLabel>

                        <TextField type={'text'} onChange={(e) => onValueChange(e)}
                           name='amount' fullWidth
                           error={(errors.amount.error) || (amount !== '' && !amount.match(/^\d+$/))}
                           helperText={(errors.amount.error && errors.amount.errorMessage) || (!amount.match(/^\d+$/) && amount !== '' ? 'Only digits are allowed' : ' ')}
                           value={amount}
                           size="small"
                        ></TextField>

                     </td>
                  </tr>

                  <tr>
                     <td colSpan='2' >
                        <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>

                        <TextField fullWidth
                           type={'text'} onChange={(e) => onValueChange(e)}
                           name='category'
                           error={(errors.category.error)}
                           helperText={(errors.category.error && errors.category.errorMessage)}
                           value={category}
                           size="small"
                        ></TextField>

                     </td>

                  </tr>
                  <tr>
                     <td className='tr-row'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Payment Type</FormLabel>

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

                     </td>
                  </tr>
                  <tr >
                     <td className='tr-row'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Date of Invoice</FormLabel>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <Date
                              name='dateOfInvoice'
                              renderInput={(params) => <TextField {...params} size="small" />}
                              value={dateOfInvoice}
                              onChange={((date) => setItemData({ ...itemData, dateOfInvoice: date }))}

                           />
                        </LocalizationProvider>
                     </td>
                     <td>
                        <FormLabel id="demo-controlled-radio-buttons-group">Date of Payment</FormLabel>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <Date
                              name='dateOfPayment'
                              renderInput={(params) => <TextField {...params} size="small" />}
                              value={dateOfPayment}
                              onChange={((date) => setItemData({ ...itemData, dateOfPayment: date }))}
                           />
                        </LocalizationProvider>

                     </td>
                  </tr>
                  <tr >
                     <td colSpan='2' className='tr-row'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Description</FormLabel>

                        <TextField
                           multiline rows={5}
                           fullWidth
                           type={'text'} onChange={(e) => onValueChange(e)}
                           name='description'
                           value={description}
                           size="small"
                        ></TextField>

                     </td>
                  </tr>

                  <tr>
                     <td colSpan='2' className='tr-row'>
                        <FormLabel id="demo-controlled-radio-buttons-group">Payment Proof</FormLabel>
                        <br />
                        <span className="input-file" >
                           <FileBase64
                              type="file"
                              sx={{ display: 'none' }}
                              multiple={false}
                              onDone={({ base64 }) => { handleImageData(base64) }}
                           />
                        </span>

                     </td>
                  </tr>

                  <tr className='tr-row'>
                     <td>
                        <Button variant="contained" color="primary" onClick={() => clear()} sx={{
                           color: 'red', backgroundColor: '#ffe6e6', borderColor: 'red', ':hover': {
                              bgcolor: '#ffe6e6',
                              color: 'red',
                           }
                        }}>Reset</Button>
                     </td>
                     <td align='right'>
                        <Button variant="contained" color="primary" disabled={loadingRef.current} onClick={() => validateItemDetails()} sx={{
                           color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                              bgcolor: '#7700FF',
                              color: 'black',
                           }
                        }}>{loadingRef.current ? 'Adding...' : 'Add Item'}
                        {loadingRef.current && <FontAwesomeIcon icon="spinner" spin />}
                        </Button>
                     </td>
                  </tr>

               </tbody>

            </table>
         </StyledTable>

      </Container >


   );
}

export default ItemForm;