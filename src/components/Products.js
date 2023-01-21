
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api/index';
import { Table, TableHead, TableCell, TableRow, TableBody, styled, Grid } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from './Popup';

import React from 'react'

const StyledTable = styled(Table)`
    width: 95%;
    margin: 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #6600cc;
        color: #FFFFFF;
        text-align: center;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px;
        text-align: center;
    }
    &:nth-of-type(even){
        background-color: #f5e6ff;
      }
`;

const Product = (props) => {

    // const products = useSelector((state) => state.products);
    const [products, setProducts] = useState([]);
    const { type, dateFilter } = props;
    const [showModal,setShowModal] = useState({openDialog: false, currProduct: ''});
    

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        let response = await getProducts();
        setProducts(response.data);
    }

    const deleteProductData = async (id) => {
        await deleteProduct(id);
        getAllProducts();
    }
   

    function check(products, type) {
        if (type === '_id' || type === undefined) return products;
       
        return products.paymentType === type ? products : null;
    }
    function checkDuration(product, dateFilter) {
        const now = new Date();
        const s = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const currDate = new Date(product.dateOfPayment);
        const d = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
        if (dateFilter === 1) { 
            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7));
            return d <= s && d >= e ? product : null;
        }else if(dateFilter === 2){
            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 30));
            return d <= s && d >= e ? product : null;
        }else if(dateFilter === 5){
            return (s.getFullYear()-1) === d.getFullYear() ? product : null;
        }else if(dateFilter === 6){
            return d.getFullYear() === 2021 ? product : null;
        }
        return product;
    }

    const formatedate = (d) => {
         return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() };
    const filteredElements = products.filter((e) => check(e, type)).filter((e) => checkDuration(e, dateFilter));


    return (
        <Grid container alignContent={'center'}>
            <Grid item xs={12}>
                <StyledTable>
                    <TableHead>
                        <THead>

                            <TableCell >Title</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Category</TableCell>
                            <TableCell >Payment Type</TableCell>
                            <TableCell >Date of Invoice</TableCell>
                            <TableCell >Date of Payment</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Action</TableCell>
                        </THead>
                    </TableHead>
                    <TableBody>
                        {filteredElements.map((product) => (
                            <TRow key={product._id}>

                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.amount}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.paymentType}</TableCell>
                                <TableCell>{formatedate(new Date(product.dateOfInvoice))}</TableCell>
                                <TableCell>{formatedate(new Date(product.dateOfPayment))}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: '#0052cc' }} variant="contained" style={{ marginRight: 10 }} onClick={() => setShowModal({openDialog: true, currProduct: product}) }><EditIcon /></IconButton> {/* change it to user.id to use JSON Server component={Link} to={`/edit/${product._id}`*/}
                                    <IconButton sx={{ color: 'red' }} variant="contained" onClick={() => deleteProductData(product._id)}><DeleteIcon /></IconButton> {/* change it to user.id to use JSON Server */}
                                </TableCell>
                            </TRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </Grid>
            <Popup showModal = {showModal} setShowModal = {setShowModal} formType = 'Edit' ></Popup>

        </Grid>
    );

}

export default Product;
