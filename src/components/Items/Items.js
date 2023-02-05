
import React from 'react'
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { subDays } from 'date-fns';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from './TableStyle.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import Icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Grid } from '@mui/material';

import { getItems, getMedia, deleteItem } from '../../api/index';

// Import Components
import Popup from '../PopupModals/Popup';
import DeletePopup from '../PopupModals/DeletePopup';
import PopupImage from '../PopupModals/PopupImage';


const Item = (props) => {

   const [items, setItems] = useState([]);
   const { type, dateFilter, startDate, endDate } = props;

   const [search, setSearch] = useState('');
   const [filteredElements, setFilteredElements] = useState('');
   const [showModal, setShowModal] = useState({ openDialog: false, currItem: '' });
   const [showImgModal, setShowImgModal] = useState({ openImgDialog: false, id: '', paymentType: '', image: '' });
   const [delModal, setDelModal] = useState({ openDelDialog: false, deleteId: null });


   const getAllItems = async () => {
      let res = localStorage.getItem('user-info');

      let response = await getItems(JSON.parse(res).id);
      setItems(response.data);
   }
   useEffect(() => {
      getAllItems();

   }, [items]);

   useEffect(() => {

      function check(items, type) {
         if (type === '_id' || type === undefined) return items;
         return items.paymentType === type ? items : null;
      }
      function getQuarter(month) {
         if (month >= 3 && month <= 5) return 1;
         else if (month >= 6 && month <= 8) return 2;
         else if (month >= 9 && month <= 11) return 3;
         else return 4;
      }

      function thisQuarter(itemDate, now, month, quartr, item) {
         if (getQuarter(quartr === 4)) {
            if (itemDate.getFullYear() === now.getFullYear() && month <= 2) {
               return item;
            } else {
               if (itemDate.getFullYear() === (now.getFullYear() - 1) && month >= 12) {
                  return item
               } else {
                  return null;
               }
            }
         } else if (itemDate.getFullYear() === now.getFullYear()) {

            if (quartr === 1)
               return itemDate.getFullYear() === now.getFullYear() && month >= 3 && month <= 5 ? item : null;
            if (quartr === 2)
               return itemDate.getFullYear() === now.getFullYear() && month >= 6 && month <= 8 ? item : null;
            if (quartr === 3)
               return itemDate.getFullYear() === now.getFullYear() && month >= 9 && month <= 11 ? item : null;

         } else {
            return null;
         }
      }
      function lastQuarter(itemDate, now, month, item) {
         return itemDate.getFullYear() === (now.getFullYear() - 1) && month >= 9 && month <= 11 ? item : null;
      }

      // Function to Select Items Date Range
      function checkDuration(item, dateFilter) {
         const now = new Date();

         const currDate = new Date(item.dateOfInvoice);
         const currentDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
         const month = (currentDate.getMonth() + 1);
         if (dateFilter === 1) {

            return (currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === now.getMonth() && currentDate.getDate() === now.getDate()) ? item : null;

         } else if (dateFilter === 2) {

            const lastDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7));
            return currentDate <= now && currentDate >= lastDate ? item : null;

         } else if (dateFilter === 3) {

            const lastDate = subDays(now, 30);
            return currentDate <= now && currentDate >= lastDate ? item : null;

         } else if (dateFilter === 4) {
            const quartr = getQuarter(currentDate.getMonth() + 1);
            return thisQuarter(currentDate, now, month, quartr, item);

         } else if (dateFilter === 5) {

            const quartr = getQuarter(currentDate.getMonth() + 1);
            if (quartr === 1) return thisQuarter(currentDate, now, month, 4, item);
            if (quartr === 4 || ((currentDate.getFullYear() === now.getFullYear() - 1) && quartr === 3)) return lastQuarter(currentDate, now, month, item);
            return thisQuarter(currentDate, now, month, quartr - 1, item);

         } else if (dateFilter === 6) {

            return now.getFullYear() === currentDate.getFullYear() ? item : null;

         } else if (dateFilter === 7) {

            return (now.getFullYear() - 1) === currentDate.getFullYear() ? item : null;

         } else if (dateFilter === 8) {

            return currentDate.getFullYear() === 2021 ? item : null;

         } else if (dateFilter === 9) {

            return item;

         } else if (dateFilter === 10 && startDate && endDate) {
            const startDate_ = new Date(startDate);
            const endDate_ = new Date(endDate);
            return (currentDate >= startDate_) && (currentDate <= endDate_) ? item : null;
         }
         else {
            return item;
         }
      }

      var result = items.filter((item) => checkDuration(item, dateFilter))
         .filter((item) => check(item, type))
         .filter((item) => { return String(Object.values(item)).toLowerCase().includes(search.toLowerCase()); });

      setFilteredElements(result);



   }, [search, dateFilter, items, type, startDate, endDate]);


   const deleteItemData = (id) => {
      setDelModal({ openDelDialog: true, deleteId: id });
   }

   function confirm() {
      deleteConfirm(delModal.deleteId);
      setDelModal({ openDelDialog: false, deleteId: null });
   }

   const deleteConfirm = async (id) => {
      await deleteItem(id);
      toast(" Successfully Deleted", {
         position: "top-center",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         theme: "light",
      });
      getAllItems();
   }



   const formatedate = (date) => {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
   };

   const getProof = async (id) => {
      let response = await getMedia(id);
      console.log(response.data);
      setShowImgModal({ openImgDialog: true, id: response.data._id, paymentType: response.data.paymentType, image: response.data.paymentProof })
   }

   const columns = [
      {
         name: 'Sr. No.',
         cell: (row, index) => index + 1
      },
      {
         name: 'Title',
         selector: row => row.title,
         sortable: true,
      },
      {
         name: 'Amount',
         selector: row => row.amount,
         sortable: true,

      },
      {
         name: 'Category',
         selector: row => row.category,
         sortable: true,

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
         name: 'Payment Proof',
         cell: row =>
            <>
               <IconButton title='View/Download Payment Proof' sx={{ color: '#7700ff', padding: '0 2px' }} variant="contained" style={{ marginRight: 10 }}
                  onClick={() => getProof(row._id)}>
                  <VisibilityIcon fontSize='small' />
               </IconButton>
            </>
      },

      {
         name: 'Action ',
         cell: row =>
            <>
               <IconButton title='Edit Item' sx={{ color: '#7700ff', padding: '0 2px' }} variant="contained" style={{ marginRight: 10 }} onClick={() => setShowModal({ openDialog: true, currItem: row })}>
                  <EditIcon fontSize='small' />
               </IconButton>
               <IconButton title='Delete Item' sx={{ color: 'red', padding: '0 2px' }} variant="contained" onClick={() => deleteItemData(row._id)}>
                  <DeleteIcon fontSize='small' />
               </IconButton>
            </>

      },
   ];


   const customSort = (rows, selector, direction) => {
      return rows.sort((firstRow, secondRow) => {
         // use the selector function to resolve your field names by passing the sort comparitors
         const firstRowField = selector(firstRow)
         const secondRowField = selector(secondRow)

         let comparison = 0;
         if (typeof (firstRowField) === 'number') {
            if (firstRowField > secondRowField) {
               comparison = 1;
            } else if (firstRowField < secondRowField) {
               comparison = -1;
            }
         } else if (firstRowField.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {

            var parts = firstRowField.split('/');
            const firstRowDate = new Date(parts[parts.length - 1], parts[1] - 1, parts[0]);

            parts = secondRowField.split('/');
            const secondRowDate = new Date(parts[parts.length - 1], parts[1] - 1, parts[0]);

            if (firstRowDate > secondRowDate) comparison = 1;
            else comparison = -1;
         }
         else if (firstRowField > secondRowField) {
            comparison = 1;
         } else if (firstRowField < secondRowField) {
            comparison = -1;
         }

         return direction === 'desc' ? comparison * -1 : comparison;
      });

   };


   return (

      <Grid className='tableWrapper' container alignContent={'center'}>

         <Popup showModal={showModal} setShowModal={setShowModal} formType='Edit' ></Popup>
         <DeletePopup delModal={delModal} setDelModal={setDelModal} confirm={confirm}></DeletePopup>
         <PopupImage showImgModal={showImgModal} setShowImgModal={setShowImgModal}></PopupImage>
         <ToastContainer />
         <div style={{ width: '100%' }}>
            <DataTable
               columns={columns}
               data={filteredElements}
               sortFunction={customSort}
               customStyles={tableCustomStyles}
               fixedHeader
               pagination
               dense
               subHeader
               subHeaderComponent={
                  <div className='tableSubHeaderComponent'>
                     <div className='headingWrapper'>
                        <h5 className='heading heading-two'>All records</h5>
                        {/* <Link to="/all">View All Records</Link> */}
                     </div>
                     <input
                        type='text'
                        placeholder='Search Here'
                        className='form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
               }
            />
         </div>

      </Grid>
   );

}

export default Item;