import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

// CRUD APIs
export const getItems = async (id) => await axios.get(`${url}/${id}`);
export const getItem = async (id) => await axios.get(`${url}/getedit${id}`);
export const donwloadExcelSheet = async (user) => axios.post(`${url}/downloadexcel`, user, {
   responseType: 'arraybuffer'
});


export const createItem = async (newItem) => await axios.post(`${url}/add`, newItem);
export const updateItem = async (id, updatedItem) => await axios.put(`${url}/${id}`, updatedItem);
export const deleteItem = async (id) => await axios.delete(`${url}/${id}`);
export const getMedia = async (id) => {
   id = id || '';
   return await axios.get(`${url}/media${id}`);
};

// Authentication APIs
export const loginUser = async (user) => await axios.post(`${url}`, user);
export const getPassword = async (id, password) => await axios.post(`${url}/password${id}`, password);
export const updatePassword = async (id, updatedPassword) => await axios.put(`${url}/password${id}`, updatedPassword);
export const forgotPassword = async (id, token) => await axios.get(`${url}/forgotpassword${id}/${token}`);
export const sendPasswordLink = async (email) => await axios.post(`${url}/sendpasswordlink`, email);
export const setNewPassword = async (id, token, password) => await axios.post(`${url}/${id}/${token}`, password);
export const setUserPasswordByAdmin = async (user) => await axios.post(`${url}/setuserpassword`, user);
export const deleteAllData = async (id) => await axios.delete(`${url}/deletedata${id}`);
export const deleteAccountPermanant = async (id, user) => axios.post(`${url}/deleteaccount${id}`, user);

// For Investment CRUD API's

export const createInvestment = async (newInvestment) => await axios.post(`${url}/investmentroot/addinvestment`, newInvestment);

export const getInvestments = async (id) => await axios.get(`${url}/investmentroot/${id}`);

export const getInvestmentMedia = async (id) => {
   id = id || '';
   return await axios.get(`${url}/investmentroot/investmentdocs${id}`);
};

export const getInvestment = async (id) => await axios.get(`${url}/investmentroot/getedit${id}`);
export const updateInvestment = async (id, updatedInvestment) => await axios.put(`${url}/investmentroot/${id}`, updatedInvestment);
export const deleteInvestment = async (id) => await axios.delete(`${url}/investmentroot/${id}`);
export const getCashReceipt = async (id) => {
   id = id || '';
   return await axios.get(`${url}/investmentroot/cashreceipt${id}`);
};