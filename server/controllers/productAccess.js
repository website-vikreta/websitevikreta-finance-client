import express from 'express';
import mongoose from 'mongoose';

import Product from '../models/productModel.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
   
    try {
        const products = await Product.find();
        
        res.status(200).json(products);


        
    } catch (error) {

        console.log("Errr getting");
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await Product.findById(id);        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        console.log("Add");
        res.status(201).json(newProduct);
    } catch (error){
        console.log("Errr addd");
        res.status(409).json({ message: error.message}); 
    } 
   
}

export const updateProduct = async (req, res) => {
    
    let product = req.body;

    const editProduct = new Product(product);
    try{
        await Product.updateOne({_id: req.params.id}, editProduct);

        console.log(" update");
        res.status(201).json(editProduct);
    } catch (error){
        console.log("Errr update");
        res.status(409).json({ message: error.message});     
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await Product.findByIdAndRemove(id);


    console.log("Delete");
    res.json({ message: "Product deleted successfully." });
}



export default router;