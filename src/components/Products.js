
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api/index';
import { Grid } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from './Popup';
import { subDays } from 'date-fns';
import React from 'react'
import DeletePopup from './DeletePopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from './TableStyle.js';


const Product = (props) => {

    const [products, setProducts] = useState([]);
    const { type, dateFilter } = props;

    const [search, setSearch] = useState('');
    const [filteredElements, setFilteredElements] = useState('');
    const [showModal, setShowModal] = useState({ openDialog: false, currProduct: '' });
    const [delModal, setDelModal] = useState({ openDelDialog: false, deleteId: null });


   
    useEffect(() => {
        getAllProducts();
        
    }, [products]);

    useEffect(() => {

    function check(products, type) {
        if (type === '_id' || type === undefined) return products;

        return products.paymentType === type ? products : null;
    }
    function getQuarter(month) {
        if (month >= 3 && month <= 5) return 1;
        else if (month >= 6 && month <= 8) return 2;
        else if (month >= 9 && month <= 11) return 3;
        else return 4;
    }

    function thisQuarter(d, now, month, quartr, product){
        if(getQuarter(quartr === 4)){
            if(d.getFullYear() === now.getFullYear() && month <= 2){
                   return product;
               }else
               if(d.getFullYear() === (now.getFullYear()-1) && month >= 12){
                   return product
               }else{
                   return null;
               }
       }else if (d.getFullYear() === now.getFullYear()) {
           console.log(d.getFullYear(), d.getMonth());
           if (quartr === 1)
               return d.getFullYear() === now.getFullYear() && month >= 3 && month <= 5 ? product : null;
           if (quartr === 2)
               return d.getFullYear() === now.getFullYear() && month >= 6 && month <= 8 ? product : null;
           if (quartr === 3)
               return d.getFullYear() === now.getFullYear() && month >= 9 && month <= 11 ? product : null;
       }else return null;
    }


    function lastQuarter(d, now, month, product){
        return d.getFullYear() === (now.getFullYear()-1) && month >= 9 && month <= 11 ? product : null;
    }

    function checkDuration(product, dateFilter) {
        const now = new Date();
        const s = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const currDate = new Date(product.dateOfPayment);
        const d = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
        const month = (d.getMonth()+1);

        if (dateFilter === 1) {

            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7));
            return d <= s && d >= e ? product : null;

        } else if (dateFilter === 2) {

            const e = subDays(now, 30);
            return d <= s && d >= e ? product : null;

        } else if (dateFilter === 3) {
            const quartr = getQuarter(d.getMonth()+1);
            return thisQuarter(d, now, month, quartr, product);
           
        } else if (dateFilter === 4) {

            const quartr = getQuarter(d.getMonth()+1);
            if(quartr === 1 ) return thisQuarter(d, now, month, 4, product);
            if(quartr === 4 ||(( d.getFullYear() === now.getFullYear()-1) && quartr === 3)) return lastQuarter(d, now, month, product);
            return thisQuarter(d, now, month, quartr-1, product);

        }else if (dateFilter === 5) {

            return (s.getFullYear() - 1) === d.getFullYear() ? product : null;

        } else if (dateFilter === 6) {

            return d.getFullYear() === 2021 ? product : null;
        }
        return product;
    }
    const result = products.filter((e) => checkDuration(e, dateFilter)).filter((e) => check(e, type)).filter((product) =>{
        return product.title.match(search);
    });
    
    setFilteredElements(result);
    }, [search,dateFilter, products, type]);

    const getAllProducts = async () => {
        let response = await getProducts();
        setProducts(response.data);
    }

    const deleteProductData = (id) => {
        setDelModal({ openDelDialog: true, deleteId: id });
    }

    function confirm() {
        deleteConfrim(delModal.deleteId);
        setDelModal({ openDelDialog: false, deleteId: null });
    }

    const deleteConfrim = async (id) => {
        await deleteProduct(id);
        toast(" Successfully Deleted", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            });
        getAllProducts();
    }



    const formatedate = (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    };
    
   


const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => row.amount,
       
    },
    {
        name: 'Category',
        selector: row => row.category,
       
    },
    
    {
        name: 'Payment Type',
        selector: row => row.paymentType,
    },
    {
        name: 'Date of Invoice',
        selector: row => formatedate(new Date(row.dateOfInvoice)),
        sortable: true,
    },
    {
        name: 'Date of Payment',
        selector: row => formatedate(new Date(row.dateOfPayment)),
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
    {
        name: 'Action ',
        cell: row => <> <IconButton sx={{ color: '#0052cc' }} variant="contained" style={{ marginRight: 10 }} onClick={() => setShowModal({ openDialog: true, currProduct: row })}><EditIcon /></IconButton> 
        <IconButton sx={{ color: 'red' }} variant="contained" onClick={() => deleteProductData(row._id)}><DeleteIcon /></IconButton> </>
                                
    },
];

    return (
        <Grid container alignContent={'center'}>
            
            <Popup showModal={showModal} setShowModal={setShowModal} formType='Edit' ></Popup>
            <DeletePopup delModal={delModal} setDelModal={setDelModal} confirm={confirm}></DeletePopup>
            <ToastContainer/>
            <div style={{ width: '95%', margin: '50px'}}>
            <DataTable
            columns={columns}
            data={filteredElements}
           
            customStyles = {tableCustomStyles}
            fixedHeader
            pagination
            pointerOnHover
            highlightOnHover
            dense
            subHeader
            subHeaderComponent = {
                <input 
                    type='text'
                    placeholder='Search Here'
                    className='w-25 form-control'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}    
                />
            }
            />
            </div>
            
        </Grid>
    );

}

export default Product;
