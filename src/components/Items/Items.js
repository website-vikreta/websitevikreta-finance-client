
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
import '../../styles/item.css';
// Import Components
const Popup = React.lazy(() => import('../PopupModals/Popup'));
const DeletePopup = React.lazy(() => import('../PopupModals/DeletePopup'));
const PopupImage = React.lazy(() => import('../PopupModals/PopupImage'));



const Item = ({ items, setItems, render, setRender, type, dateFilter, startDate, endDate }) => {

   const [search, setSearch] = useState('');
   const [filteredElements, setFilteredElements] = useState('');
   const [showModal, setShowModal] = useState({ openDialog: false, currItem: '' });
   const [showImgModal, setShowImgModal] = useState({ openImgDialog: false, id: '', paymentType: '', image: '' });
   const [delModal, setDelModal] = useState({ openDelDialog: false, deleteId: null });
   const [page, setPage] = useState(1);
   const handlePageChange = (page) => setPage(page);
  
   const getAllItems = async () => {
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      setItems(response.data);
   }
   useEffect(() => {
      const getAllItems = async () => {
         let res = localStorage.getItem('user-info');
         let response = await getItems(JSON.parse(res).id);
         setItems(response.data);
      }
      getAllItems();
      setRender('unset');
   }, [render, setItems, setRender]);
   useEffect(() => {

      function check(items, type) {
         if (type === '_id' || type === undefined) return items;
         return items.paymentType === type ? items : null;
      }
      function getQuarter(month) {
         if (month >= 4 && month <= 6) return 1;
         else if (month >= 7 && month <= 9) return 2;
         else if (month >= 10 && month <= 12) return 3;
         else return 4;
      }

      function thisQuarter(currentDate, now, month, quartr, item) {
         if (getQuarter(quartr === 4)) {
            if (currentDate.getFullYear() === now.getFullYear() && (month <= 3)) {
               return item;
            } else {
               return null;
            }
         } else if (currentDate.getFullYear() === now.getFullYear()) {

            if (quartr === 1)
               return currentDate.getFullYear() === now.getFullYear() && month >= 4 && month <= 6 ? item : null;
            if (quartr === 2)
               return currentDate.getFullYear() === now.getFullYear() && month >= 7 && month <= 9 ? item : null;
            if (quartr === 3)
               return currentDate.getFullYear() === now.getFullYear() && month >= 10 && month <= 12 ? item : null;
         } else return null;
      }

      function lastQuarter(currentDate, now, month, item) {
         return currentDate.getFullYear() === (now.getFullYear() - 1) && month >= 10 && month <= 12 ? item : null;
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
            if (quartr === 4 ) return lastQuarter(currentDate, now, month, item);
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

      setShowImgModal({ openImgDialog: true, id: response.data._id, paymentType: response.data.paymentType, image: response.data.paymentProof })
   }

   const rowsPerPage = 10;
   const columns = [
      {
         name: 'Sr.No.',
         cell: (row, index) => (page - 1) * rowsPerPage + index + 1,
         sortable: true,
         width: '90px',
         

      },
      {
         name: 'Title',
         selector: row => row.title,
         cell: row => <><div className="cell-with-tooltip" title={row.title}>{row.title}</div></>,
         sortable: true,
         
      },
      {
         name: 'Amount',
         selector: row => row.amount,
         cell: row => <><div className="cell-with-tooltip" title={row.amount}>{row.amount}</div></>,
         sortable: true,
        

      },
      {
         name: 'Category',
         cell: row => <><div className="cell-with-tooltip" title={row.category}>{row.category}</div></>,
         sortable: true,
       

      },

      {
         name: 'Payment Type',
         cell: row => <><div className="cell-with-tooltip" title={row.paymentType}>{row.paymentType}</div></>,
        
      },
      {
         name: 'Date of Invoice',
         selector: row => formatedate(new Date(row.dateOfInvoice)),
         cell: row => <><div className="cell-with-tooltip" title={formatedate(new Date(row.dateOfInvoice))}>{formatedate(new Date(row.dateOfInvoice))}</div></>,
         sortable: true,
         width: '135px',
         
      },
      {
         name: 'Date of Payment',
         selector: row => formatedate(new Date(row.dateOfPayment)),
         cell: row => <><div className="cell-with-tooltip" title={formatedate(new Date(row.dateOfPayment))}>{formatedate(new Date(row.dateOfPayment))}</div></>,
         sortable: true,
         width: '145px',
        
      },
      {
         name: 'Description',
         cell: row => <><div className="cell-with-tooltip" title={row.description}>{row.description}</div></>,
        
      },
      {
         name: 'Payment Proof',
         cell: row =>
            <>
               <IconButton title='View/Download Payment Proof' sx={{ color: '#7700ff', padding: '0 2px' }} variant="contained" style={{ marginRight: 10 }}
                  onClick={() => getProof(row._id)}>
                  <VisibilityIcon fontSize='small' />
               </IconButton>
            </>,
         width: '120px',
      },

      {
         name: 'Action',
         cell: row =>
            <>
               <IconButton title='Edit Item' sx={{ color: '#7700ff', padding: '0 2px' }} variant="contained" style={{ marginRight: 10 }} onClick={() => setShowModal({ openDialog: true, currItem: row })}>
                  <EditIcon fontSize='small' />
               </IconButton>
               <IconButton title='Delete Item' sx={{ color: 'red', padding: '0 2px' }} variant="contained" onClick={() => deleteItemData(row._id)}>
                  <DeleteIcon fontSize='small' />
               </IconButton>
            </>,
         width: '90px',

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

         <Popup setRender={setRender} showModal={showModal} setShowModal={setShowModal} formType='Edit' ></Popup>
         <DeletePopup delModal={delModal} setDelModal={setDelModal} confirm={confirm}></DeletePopup>
         <PopupImage showImgModal={showImgModal} setShowImgModal={setShowImgModal}></PopupImage>
         <ToastContainer />
         <div style={{width: '100%'}}>
            <DataTable
               columns={columns}
               data={filteredElements}
               sortFunction={customSort}
               customStyles={tableCustomStyles}
               fixedHeader
               pagination
               
               paginationResetDefaultPage={true}
               paginationTotalRows={filteredElements.length}
               paginationComponentOptions={{
                  rowsPerPageText: "Rows per page:",
                  rangeSeparatorText: "of",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                  selectAllRowsItemText: "All",
                }}
               
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
               onChangePage={handlePageChange}
               highlightOnHover
            />
         </div>

      </Grid>
   );

}

export default Item;