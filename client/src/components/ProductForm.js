import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";
import { useState } from "react";
import { FormControl, InputLabel, TextField, Input, Grid, Button, Container } from '@mui/material';
import { createProduct } from '../api/index';

import { useNavigate } from 'react-router-dom';
const Date = styled(DatePicker)`
    width: 250px
`;


const ProductForm = () => {
    const [productData, setProductData] = useState({ title: '', amount: '', category: '', dateOfinvoice: '', dateOfPayment: '', description: '' });
    const { title, amount, category, dateOfinvoice, dateOfPayment, description } = productData;

    let navigate = useNavigate();

    const addProductDetails = async() => {
        await createProduct(productData);
        navigate('/all');
    }

    const clear = ()=>{
        setProductData({ title: '', amount: '', category: '', dateOfinvoice: null, dateOfPayment: null, description: '' });
    }
    const onValueChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    return (
       
            <Container >
           
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={6}>
                        <TextField label="Product Title" type={'text'}  onChange={(e) => onValueChange(e)} name='title' value={title}></TextField>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField label="Amount" type={'text'} onChange={(e) => onValueChange(e)} name='amount' value={amount}></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField label="Category" type={'text'} onChange={(e) => onValueChange(e)} name='category' value={category}></TextField>
                    </Grid> <Grid item xs={6}>
                        <TextField label="Description" type={'text'} onChange={(e) => onValueChange(e)} name='description' value={description}></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Date label='Date Of Payment'
                                name='dateOfPayment'
                                renderInput={(params) => <TextField {...params} />}
                                value={dateOfPayment}
                                onChange={((date) => setProductData({ ...productData, dateOfPayment: date }))}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Date label='Date Of Invoice'
                                name='dateOfinvoice'
                                renderInput={(params) => <TextField {...params} />}
                                value={dateOfinvoice}
                                onChange={((date) => setProductData({ ...productData, dateOfinvoice: date })
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={() => clear()} sx={{
                        color: 'red', backgroundColor: '#ffe6e6', borderColor: 'red', ':hover': {
                            bgcolor: '#ffe6e6', 
                            color: 'red',
                        }
                    }}>Reset</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={() => addProductDetails()} sx={{
                        color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                            bgcolor: '#7700FF', 
                            color: 'black',
                        }
                    }}>Add Product</Button>
                </Grid>
                   
                </Grid>
            </Container>
       
    );
}

export default ProductForm;