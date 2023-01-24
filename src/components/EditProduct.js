import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Table } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { TextField,  Container, Button, styled } from '@mui/material';
import { updateProduct, getProducts } from '../api/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductForm.css';

const Date = styled(DatePicker)`
    width: 300px
`;

const StyledTable = styled(Table)`
    width: 100%;
   
`;


const EditProduct = (props) => {
    const [product, setProduct] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfinvoice: '', dateOfPayment: '', description: '' });
    const { title, amount, category, paymentType, dateOfinvoice, dateOfPayment, description } = product;
    // const { id } = useParams();

    const {cProduct, showModal, setShowModal} = props;
    
    const id = cProduct._id;

    useEffect(() => {
        const loadProductDetails = async () => {
            const response = await getProducts(id);
            setProduct(response.data);
        }
        loadProductDetails();
    }, [id]);

    const clear = () => {
        setProduct({ title: '', amount: '', category: '', paymentType: '', dateOfinvoice: null, dateOfPayment: null, description: '' });
    }

    const editProductDetails = async () => {
        console.log(product.dateOfinvoice);
        await updateProduct(id, product);
        setShowModal({...showModal, openDialog: false});
        toast.success("Product updated Successfully!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            });
    }

    const onValueChange = (e) => {

        setProduct({ ...product, [e.target.name]: e.target.value })
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
                                onChange={((date) => setProduct({ ...product, dateOfinvoice: date })
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
                            onChange={((date) => setProduct({ ...product, dateOfPayment: date }))}
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
                        <Button variant="contained" color="primary" onClick={() => editProductDetails()} sx={{
                        color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                            bgcolor: '#7700FF',
                            color: 'black',
                        }
                    }}>Edit Product</Button>
                        </td>
                    </tr>


                </table>
            </StyledTable>
            <ToastContainer />
        </Container >
    )
}

export default EditProduct;
