
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

      function thisQuarter(d, now, month, quartr, item) {
         if (getQuarter(quartr === 4)) {
            if (d.getFullYear() === now.getFullYear() && month <= 2) {
               return item;
            } else{
               if (d.getFullYear() === (now.getFullYear() - 1) && month >= 12) {
                  return item
               } else {
                  return null;
               }
            }
         } else if (d.getFullYear() === now.getFullYear()) {

            if (quartr === 1)
               return d.getFullYear() === now.getFullYear() && month >= 3 && month <= 5 ? item : null;
            if (quartr === 2)
               return d.getFullYear() === now.getFullYear() && month >= 6 && month <= 8 ? item : null;
            if (quartr === 3)
               return d.getFullYear() === now.getFullYear() && month >= 9 && month <= 11 ? item : null;

         } else{
            return null;
         }
      }
      function lastQuarter(d, now, month, item) {
         return d.getFullYear() === (now.getFullYear() - 1) && month >= 9 && month <= 11 ? item : null;
      }

      // Function to Select Items Date Range
      function checkDuration(item, dateFilter) {
         const now = new Date();
         const s = new Date(now.getFullYear(), now.getMonth(), now.getDate());
         const currDate = new Date(item.dateOfInvoice);
         const d = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
         const month = (d.getMonth() + 1);
         if (dateFilter === 1) {

            return (d.getFullYear() === s.getFullYear() && d.getMonth() === s.getMonth() && d.getDate() === s.getDate()) ? item : null;

         } else if (dateFilter === 2) {

            const e = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7));
            return d <= s && d >= e ? item : null;

         } else if (dateFilter === 3) {

            const e = subDays(now, 30);
            return d <= s && d >= e ? item : null;

         } else if (dateFilter === 4) {
            const quartr = getQuarter(d.getMonth() + 1);
            return thisQuarter(d, now, month, quartr, item);

         } else if (dateFilter === 5) {

            const quartr = getQuarter(d.getMonth() + 1);
            if (quartr === 1) return thisQuarter(d, now, month, 4, item);
            if (quartr === 4 || ((d.getFullYear() === now.getFullYear() - 1) && quartr === 3)) return lastQuarter(d, now, month, item);
            return thisQuarter(d, now, month, quartr - 1, item);

         } else if (dateFilter === 6) {

            return s.getFullYear() === d.getFullYear() ? item : null;

         } else if (dateFilter === 7) {

            return (s.getFullYear() - 1) === d.getFullYear() ? item : null;

         } else if (dateFilter === 8) {

            return d.getFullYear() === 2021 ? item : null;

         } else if (dateFilter === 9 && startDate && endDate) {
            const d1 = new Date(startDate);
            const d2 = new Date(endDate);
            return (d >= d1) && (d <= d2) ? item : null;
         }
         else {
            return item;
         }
      }
      
      var result = items.filter((e) => checkDuration(e, dateFilter))
         .filter((e) => check(e, type))
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



   const formatedate = (d) => {
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
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
            const d1 = new Date(parts[parts.length - 1], parts[1] - 1, parts[0]);
            parts = secondRowField.split('/');
            const d2 = new Date(parts[parts.length - 1], parts[1] - 1, parts[0]);
            if (d1 > d2) comparison = 1;
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
      
      <Grid container alignContent={'center'}>

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
                        <h5 className='heading heading-two'>Latest records</h5>
                        <Link to="/all">View All Records</Link>
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