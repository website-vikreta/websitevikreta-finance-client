import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {  Table } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { TextField, Container, Button, styled ,FormHelperText } from '@mui/material';
import { updateItem, getItems } from '../api/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ItemForm.css';
import FileBase64 from 'react-file-base64';
const Date = styled(DatePicker)`
    width: 300px
`;

const StyledTable = styled(Table)`
    width: 200px;
   
`;


const EditItem = (props) => {
    const [item, setItem] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: '', dateOfPayment: '', description: '', paymentProof: '' });
    const { title, amount, category, paymentType, dateOfInvoice, dateOfPayment, description, paymentProof } = item;
   
    const { cItem, showModal, setShowModal } = props;
    const id = cItem._id;

    useEffect(() => {
        const loadItemDetails = async () => {
            const response = await getItems(id);
            setItem(response.data);
            
        }
        loadItemDetails();
    }, [id]);

    const [errors, setErrors] = useState({
        title: {
            value: cItem.title,
            error: false,
            errorMessage: ''
        },
        amount: {
            value: cItem.amount,
            error: false,
            errorMessage: ''
        },
        category: {
            value: cItem.category,
            error: false,
            errorMessage: ''
        },
        paymentType: {
            value: cItem.paymentType,
            error: false,
            errorMessage: ''
        },
        dateOfInvoice: {
            value: cItem.dateOfInvoice,
            error: false,
            errorMessage: ''
        },
        dateOfPayment: {
            value: cItem.dateOfPayment,
            error: false,
            errorMessage: ''
        },
        description: {
            value: cItem.description,
            error: false,
            errorMessage: ''
        }
    })

    const clear = () => {
        setItem({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: null, dateOfPayment: null, description: '', paymentProof: '' });
    }

    const validateItemDetails = () => {
        const errorFields = Object.keys(errors);
        let newErrorValues = { ...errors }
        let values = Object.values(item)
        let cnt = 0;
        for (let index = 0; index < errorFields.length; index++) {
            const currentField = errorFields[index];
            const currentValue = values[index+1];
            console.log('dsfsd', currentValue, );
            if (currentValue === '') {
                cnt= cnt+1;
                newErrorValues = {
                    ...newErrorValues,
                    [currentField]: {
                        ...newErrorValues[currentField],
                        error: true,
                        errorMessage: 'This field is required'
                    }
                }
                console.log(values[index],'fsfsdff', currentValue,'gdgdgs');
            }

        }

        setErrors(newErrorValues);
        console.log(errors, '.............................');
        if(cnt === 0)  editItemDetails();
    }
    const editItemDetails = async () => {
        console.log(item.dateOfInvoice);
        await updateItem(id, item);
        setShowModal({ ...showModal, openDialog: false });
        toast.success("Item updated Successfully!!", {
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
                value: e.target.value,
                error: false,
                errorMessage: ''
            }
        })
        setItem({ ...item, [e.target.name]: e.target.value })
    }

    const handleImageData = (img) => {
        setItem({ ...item, paymentProof: img });
        console.log(paymentProof, 'dgsgsgsggq1111');
    }
    return (

        <Container >

            <StyledTable>

                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td colSpan='2'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Item Title</FormLabel>

                                <TextField variant='outlined' fullWidth
                                    type={'text'} onChange={(e) => onValueChange(e)}
                                    error={(errors.title.error) || (!title.match(/^[a-z]+$/) && title !== '')}
                                    helperText={(errors.title.error && errors.title.errorMessage) || (!title.match(/^[a-z]+$/) && title !== '' ? 'Item title should contain only characters. Special chracters, whitespaces, digits are not allowed' : ' ')}

                                    name='title' value={title}></TextField>

                            </td>

                        </tr>
                        <tr >
                            <td colSpan='2'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Amount</FormLabel>

                                <TextField type={'text'} onChange={(e) => onValueChange(e)}
                                    name='amount'
                                    fullWidth
                                    error={(errors.amount.error) || (amount !== '' && !String(amount).match(/^\d+$/))}
                                    helperText={(errors.amount.error && errors.amount.errorMessage) || (!String(amount).match(/^\d+$/) && amount !== '' ? 'Only digits are allowed' : ' ')}
                                   
                                    value={amount}></TextField>

                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' >
                                <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>

                                <TextField fullWidth
                                    type={'text'} onChange={(e) => onValueChange(e)}
                                    name='category'
                                    error={(errors.category.error) || (category !== '' && !category.match(/^[a-z]+$/))}
                                    helperText={(errors.category.error && errors.category.errorMessage) || (!category.match(/^[a-z]+$/) && category !== '' ?
                                        'Category should contain only characters. Special chracters, whitespaces, digits are not allowed' : ' ')}

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
                                <FormHelperText error>{errors.paymentType.errorMessage}</FormHelperText>

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
                                        onChange={((date) => setItem({ ...item, dateOfInvoice: date }))}

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
                                        onChange={((date) => setItem({ ...item, dateOfPayment: date }))}
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
                                    error={(errors.description.error)}
                                    helperText={(errors.description.error && errors.description.errorMessage) }
                                    ></TextField>

                            </td>
                        </tr>
                        <tr>
                        <td colSpan='2' className='tr-row' >
                               
                                    <span className="input-file" >
                            <FileBase64
                                type="file"
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
                                <Button variant="contained" color="primary" onClick={() => validateItemDetails()} sx={{
                                    color: 'white', backgroundColor: '#7700FF', borderColor: 'white', ':hover': {
                                        bgcolor: '#7700FF',
                                        color: 'black',
                                    }
                                }}>Edit Item</Button>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </StyledTable>

        </Container >

    )
}

export default EditItem;
