
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api/index';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import React from 'react'

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #7700FF;
        color: #FFFFFF;
        text-align: center;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px;
        text-align: center;
    }
    &> tr:nth-child(even) {
        background-color: #D6EEEE;
      }
`;

const Product = () => {
  
  // const products = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
    
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
 
  return (
    <StyledTable>
    <TableHead>
        <THead>
            
            <TableCell >Title</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Category</TableCell>
            <TableCell >Date of Invoice</TableCell>
            <TableCell >Date of Payment</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Action</TableCell>
        </THead>
    </TableHead>
    <TableBody>
        {products.map((product) => (
            <TRow key={product._id}>
                
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.dateOfInvoice}</TableCell>
                <TableCell>{product.dateOfPayment}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                <IconButton sx={{color: '#0052cc'}} variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${product._id}`}><EditIcon/></IconButton> {/* change it to user.id to use JSON Server */}
                    <IconButton sx={{color:'red'}} variant="contained" onClick={() => deleteProductData(product._id)}><DeleteIcon/></IconButton> {/* change it to user.id to use JSON Server */}
                </TableCell>
            </TRow>
        ))}
    </TableBody>
</StyledTable>
      );

}

export default Product;
