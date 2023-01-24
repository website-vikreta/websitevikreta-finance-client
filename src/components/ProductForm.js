import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";
import { useState } from "react";
import { TextField, Button, Container } from '@mui/material';
import { createProduct } from '../api/index';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Table } from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ProductForm.css';
const Date = styled(DatePicker)`
    width: 250px
`;
const StyledTable = styled(Table)`
    width: 100%;
   
`;

const ProductForm = (props) => {
    const [productData, setProductData] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfinvoice: '', dateOfPayment: '', description: '' });
    const { title, amount, category, paymentType, dateOfinvoice, dateOfPayment, description } = productData;
    const {showModal, setShowModal} = props;
    
    const addProductDetails = async () => {
        await createProduct(productData);
        setShowModal({...showModal, openDialog: false});
        toast.success("Product Added Successfully!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    }

    const clear = () => {
        setProductData({ title: '', amount: '', category: '', paymentType: '', dateOfinvoice: null, dateOfPayment: null, description: '' });
    }
    const onValueChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    return (

        <Container >

        <StyledTable>

            <table>
                <tr>
                    <td >
                    <TextField label="Product Title" type={'text'} onChange={(e) => onValueChange(e)} name='title' value={title}></TextField>
          
                    </td>
                    <td>
                    <TextField label="Amount" type={'text'} onChange={(e) => onValueChange(e)} name='amount' value={amount}></TextField>
            
                    </td>
                </tr>

                <tr>
                    <td style={{ paddingBottom: '0px'}}>
                    <TextField fullWidth sx={{paddingBottom: '20px'}} label="Category" type={'text'} onChange={(e) => onValueChange(e)} name='category' value={category}></TextField>
                
                    <FormLabel  id="demo-controlled-radio-buttons-group">Payment Type</FormLabel>
                   
                    <RadioGroup 
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="paymentType"
                        value={paymentType}
                        onChange={(e) => onValueChange(e)}>
                        <FormControlLabel value="Income" control={<Radio />} label="Income" />
                        <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
                    </RadioGroup>
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                    <TextField multiline rows={5} fullWidth label="Description" type={'text'} onChange={(e) => onValueChange(e)} name='description' value={description}></TextField>

                    </td>
                </tr>
                <tr>
                    <td style={{paddingTop: '0px',verticalAlign: 'top'}}>
                    
                    </td>
                </tr>
                <tr>
                    <td>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Date label='Date Of Invoice'
                            name='dateOfinvoice'
                            renderInput={(params) => <TextField {...params} />}
                            value={dateOfinvoice}
                            onChange={((date) => setProductData({ ...productData, dateOfinvoice: date })
                            )}
                        />
                    </LocalizationProvider>
                    </td>
                    <td>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Date width='100%' label='Date Of Payment'
                            name='dateOfPayment'
                            renderInput={(params) => <TextField {...params} />}
                            value={dateOfPayment}
                            onChange={((date) => setProductData({ ...productData, dateOfPayment: date }))}
                        />
                    </LocalizationProvider>
                    
                    </td>
                </tr>
                <tr>
                    <td>
                    <Button variant="contained" color="primary" onClick={() => clear()} sx={{
                    color: 'red', backgroundColor: '#ffe6e6', borderColor: 'red', ':hover': {
                        bgcolor: '#ffe6e6',
                        color: 'red',
                    }
                }}>Reset</Button>
                    </td>
                    <td align='right'>
                    <Button variant="contained" color="primary" onClick={() => addProductDetails()} sx={{
                        color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                            bgcolor: '#7700FF',
                            color: 'black',
                        }
                    }}>Add Product</Button>
                    </td>
                </tr>


            </table>
        </StyledTable>
        
    </Container >

       
    );
}

export default ProductForm;
