import { useState, useEffect, useRef } from 'react';
import FileBase64 from 'react-file-base64';
import Cookie from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TextField, Container, styled, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { updateItem, getItem } from '../../api/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/itemform.css';

var cookie = new Cookie();
const Date = styled(DatePicker)`
    width: 300px
`;


const EditItem = (props) => {

    let user = JSON.parse(localStorage.getItem('user-info'));

    const [item, setItem] = useState({ title: '', amount: '', category: '', paymentType: '', dateOfInvoice: '', dateOfPayment: '', description: '', paymentProof: '', userId: user.id });
    const { title, amount, category, paymentType, dateOfInvoice, dateOfPayment, description, userId } = item;
    const { setRender, cItem, showModal, setShowModal } = props;
    const id = cItem._id;
    cookie.set('user', userId, { path: '/' });
    const loadingRef = useRef(false);

    useEffect(() => {
        const loadItemDetails = async () => {
            const response = await getItem(id);
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
        }
    })

    const clear = () => {
        setItem({ ...item, title: '', amount: '', category: '', paymentType: '', dateOfInvoice: null, dateOfPayment: null, description: '', paymentProof: '' });
    }

    function validateItemDetails() {
        loadingRef.current = true;

        const errorFields = Object.keys(errors);
        let newErrorValues = { ...errors }
        let values = Object.values(item)

        let countErrors = 0;
        for (let index = 0; index < errorFields.length - 1; index++) {
            const currentField = errorFields[index];
            const currentValue = values[index + 1];
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

        if (countErrors !== 0) loadingRef.current = false;
        if (countErrors === 0) editItemDetails();

        setTimeout(() => {
            loadingRef.current = false;
        }, 2000);
    }
    const editItemDetails = async () => {
        await updateItem(id, item);
        setShowModal({ ...showModal, openDialog: false });
        setRender('editSet');
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
                        name='title'
                        size ='small' 
                        value={title}></TextField>

                </div>
                <div >
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Amount <span className="text-danger">*</span></FormLabel>

                    <TextField type={'text'} onChange={(e) => onValueChange(e)}
                        name='amount'
                        fullWidth
                        error={(errors.amount.error) || (amount !== '' && !String(amount).match(/^\d+$/))}
                        helperText={(errors.amount.error && errors.amount.errorMessage) || (!String(amount).match(/^\d+$/) && amount !== '' ? 'Only digits are allowed' : ' ')}
                        size='small'
                        value={amount}></TextField>

                </div>

                <div>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Category <span className="text-danger">*</span></FormLabel>

                    <TextField fullWidth
                        type={'text'} onChange={(e) => onValueChange(e)}
                        name='category'
                        error={(errors.category.error)}
                        helperText={(errors.category.error && errors.category.errorMessage)}
                        value={category}
                        size='small'></TextField>

                </div>
                <div>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Type <span className="text-danger">*</span></FormLabel>

                    <RadioGroup row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="paymentType"
                        value={paymentType}
                        onChange={(e) => onValueChange(e)}>
                        <FormControlLabel value="Income" control={<Radio />} label="Income" />
                        <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
                    </RadioGroup>
                    <FormHelperText error>{errors.paymentType.errorMessage}</FormHelperText>

                </div>
                <div className="grid grid-2">
                    <div>
                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Invoice <span className="text-danger">*</span></FormLabel>
                  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Date
                                name='dateOfInvoice'
                                renderInput={(params) => <TextField {...params} />}
                                value={dateOfInvoice}
                                onChange={((date) => setItem({ ...item, dateOfInvoice: date }))}

                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                    <FormLabel className="label" id="demo-controlled-radio-buttons-group">Date of Payment <span className="text-danger">*</span></FormLabel>
                  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Date
                                name='dateOfPayment'
                                renderInput={(params) => <TextField {...params} />}
                                value={dateOfPayment}
                                onChange={((date) => setItem({ ...item, dateOfPayment: date }))}
                            />
                        </LocalizationProvider>
                       
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
                        size='small'></TextField>

                </div>
                <div>
                <FormLabel className="label" id="demo-controlled-radio-buttons-group">Payment Proof</FormLabel>
               <br />
                    <span className="input-file" >
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => { handleImageData(base64) }}
                        />
                    </span>

                </div>

                <div className="grid grid-2 mt-4">
                    <button className="btn btn-secondary btn-danger" onClick={() => clear()}>
                        Reset
                    </button>
                    <button className="btn btn-primary" disabled={loadingRef.current} onClick={() => validateItemDetails()} >
                        {loadingRef.current ? 'Editting...' : 'Edit'}
                        {loadingRef.current && <FontAwesomeIcon icon="spinner" spin />}
                    </button>
                </div>
            </div>

        </Container >
    )
}

export default EditItem;
