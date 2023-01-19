import express from 'express';

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productAccess.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/add', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;