import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

// CRUD APIs
export const getItems = async (id) => {
   
   return await axios.get(`${url}/${id}`);
}
export const getItem = async (id) => {
   console.log(id,typeof(id), 'index');
   return await axios.get(`${url}/getedit${id}`);
}
export const createItem = async (newItem) => await axios.post(`${url}/add`, newItem);
export const updateItem = async (id, updatedItem) => await axios.put(`${url}/${id}`, updatedItem);
export const deleteItem = async (id) => await axios.delete(`${url}/${id}`);
export const getMedia = async (id) => {
   id = id || '';
   return await axios.get(`${url}/media${id}`);
};

// Authentication APIs
export const loginUser = async (user) => await axios.post(`${url}`, user);

