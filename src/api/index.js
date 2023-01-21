import axios from 'axios';

const url = 'http://localhost:5000/root';

export const getProducts = async (id) =>{
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const createProduct = async (newProduct) => await axios.post(`${url}/add`, newProduct);

export const updateProduct = async (id, updatedProduct) => await axios.put(`${url}/${id}`, updatedProduct);
export const deleteProduct = async (id) => await axios.delete(`${url}/${id}`);