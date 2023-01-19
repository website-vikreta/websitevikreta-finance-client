import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { FormGroup, FormControl, InputLabel, TextField, Input, Button, Typography, styled } from '@mui/material';
import { updateProduct, getProducts } from '../api/index';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
    }
`;

const Date = styled(DatePicker)`
    width: 250px
`;

const EditProduct = () => {
    const [product, setProduct] = useState({ title: '', amount: '', category: '', dateOfinvoice: '', dateOfPayment: '', description: '' });
    const { title, amount, category, dateOfinvoice, dateOfPayment,  description} = product;
    const { id } = useParams();
    console.log(id);
    let navigate = useNavigate();

    useEffect(() => {
        const loadProductDetails = async() => {
            const response = await getProducts(id);
            setProduct(response.data);
        }
        loadProductDetails();
    }, [id]);


    const editProductDetails = async() => {
        const response = await updateProduct(id, product);
        console.log(response);
        navigate('/all');
    }

    const onValueChange = (e) => {
        
        setProduct({...product, [e.target.name]: e.target.value})
    }

    return (
        <Container>
        <Typography variant="h4">Edit Product</Typography>
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
                onChange={((date) => setProduct({...product, dateOfinvoice:date})
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
                onChange={((date) => setProduct({...product, dateOfPayment:date}))} 
            />
    </LocalizationProvider>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" />
        </FormControl>
        <FormControl>
            <Button variant="contained" color="primary" onClick={() => editProductDetails()}>Edit Product</Button>
        </FormControl>
    </Container>   
    )
}

export default EditProduct;