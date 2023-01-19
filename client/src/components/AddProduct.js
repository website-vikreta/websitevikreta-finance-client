import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FormGroup, FormControl, InputLabel, TextField, Input, Button, Typography, styled } from '@mui/material';
import { createProduct } from '../api/index';

import { useNavigate } from 'react-router-dom';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;
const Date = styled(DatePicker)`
    width: 250px
`;

const AddProduct = () => {

    const [productData, setProductData] = useState({ title: '', amount: '', category: '', dateOfinvoice: '', dateOfPayment: '', description: '' });


    const { title, amount, category, dateOfinvoice, dateOfPayment,  description} = productData;
    

    
    let navigate = useNavigate();

    const addProductDetails = async() => {
        await createProduct(productData);
        navigate('/all');
    }
 
    const onValueChange = (e) => {
        setProductData({...productData, [e.target.name]: e.target.value})
    }

    return (
        <Container>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
            <InputLabel htmlFor="my-input"> Title</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="my-input">Amount</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name='amount' value={amount} id="my-input" />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="my-input">Category</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name='category' value={category} id="my-input"/>
        </FormControl>
       
        <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Date label='Date Of Invoice'
                name='dateOfinvoice'
                renderInput = {(params) => <TextField {...params}/>}
                value={dateOfinvoice}
                onChange={((date) => setProductData({...productData, dateOfinvoice:date})
                )} 
            />
    </LocalizationProvider>

        </FormControl>
        
        <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Date label='Date Of Payment'
                name='dateOfPayment'
                renderInput = {(params) => <TextField {...params}/>}
                value={dateOfPayment}
                onChange={((date) => setProductData({...productData, dateOfPayment:date}))} 
            />
    </LocalizationProvider>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" />
        </FormControl>
        <FormControl>
            <Button variant="contained" color="primary" onClick={() => addProductDetails()}>Add Product</Button>
        </FormControl>
    </Container>   
    )
}

export default AddProduct;
