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
    width: 200px;
   
`;

const ProductForm = (props) => {
    const [productData, setProductData] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: '', dateOfPayment: '', description: '' });
    const { title, amount, category, paymentType, dateOfInvoice, dateOfPayment, description } = productData;
    const { showModal, setShowModal } = props;

    const validateProductDetails = () => {
        if (!title.match(/^[a-z]+$/)) {
            alert('Enter product title properly');
        } else if (!amount.match(/^\d+$/)) {
            alert('Enter amount properly');
        } else if (!category.match(/^[a-z]+$/)) {
            alert('Enter product category properly');
        } else if (paymentType === '') {
            alert('Please select payment type');
        } else if (dateOfInvoice === '') {
            alert('Selete date of invoice');
        } else if (dateOfPayment === '') {
            alert('Select date of payment');
        } else if (description === '') {
            alert('Enter product description');
        } else {
            addProductDetails();
        }
    }
    const addProductDetails = async () => {
        await createProduct(productData);
        setShowModal({ ...showModal, openDialog: false });
        toast.success("Product Added Successfully!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    }

    const clear = () => {
        setProductData({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: null, dateOfPayment: null, description: '' });
    }
    const onValueChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    return (

        <Container >

            <StyledTable>

                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td colSpan='2'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Product Title</FormLabel>

                                <TextField variant='outlined' fullWidth
                                    type={'text'} onChange={(e) => onValueChange(e)}
                                    error={title !== '' && !title.match(/^[a-z]+$/)}
                                    helperText={!title.match(/^[a-z]+$/) && title !== '' ? 'Product title should contain only characters. Special chracters, whitespaces, digits are not allowed' : ' '}
                                    name='title' value={title}></TextField>

                            </td>

                        </tr>
                        <tr >
                            <td colSpan='2'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Amount</FormLabel>

                                <TextField type={'text'} onChange={(e) => onValueChange(e)}
                                    name='amount'
                                    error={amount !== '' && !amount.match(/^\d+$/)}
                                    helperText={!amount.match(/^\d+$/) && amount !== '' ? 'Only digits are allowed' : ' '}
                                    value={amount}></TextField>

                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' >
                                <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>

                                <TextField fullWidth
                                    type={'text'} onChange={(e) => onValueChange(e)}
                                    name='category'
                                    error={category !== '' && !category.match(/^[a-z]+$/)}
                                    helperText={!category.match(/^[a-z]+$/) && category !== '' ? 'Category should contain only characters. Special chracters, whitespaces, digits are not allowed' : ' '}

                                    value={category}></TextField>

                            </td>

                        </tr>
                        <tr>
                            <td className='tr-row'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Payment Type</FormLabel>

                                <RadioGroup row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="paymentType"
                                    value={paymentType}
                                    onChange={(e) => onValueChange(e)}>
                                    <FormControlLabel value="Income" control={<Radio />} label="Income" />
                                    <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr >
                            <td className='tr-row'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Date of Invoice</FormLabel>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Date
                                        name='dateOfInvoice'
                                        renderInput={(params) => <TextField {...params} />}
                                        value={dateOfInvoice}
                                        onChange={((date) => setProductData({ ...productData, dateOfInvoice: date }))}

                                    />
                                </LocalizationProvider>
                            </td>
                            <td>
                                <FormLabel id="demo-controlled-radio-buttons-group">Date of Payment</FormLabel>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Date
                                        name='dateOfPayment'
                                        renderInput={(params) => <TextField {...params} />}
                                        value={dateOfPayment}
                                        onChange={((date) => setProductData({ ...productData, dateOfPayment: date }))}
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
                                    value={description} required></TextField>

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
                                <Button variant="contained" color="primary" onClick={() => validateProductDetails()} sx={{
                                    color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                                        bgcolor: '#7700FF',
                                        color: 'black',
                                    }
                                }}>Add Product</Button>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </StyledTable>

        </Container >


    );
}

export default ProductForm;
