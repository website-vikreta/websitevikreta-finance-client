import React from 'react';
import { useState } from 'react';

import { AppBar, Box, Select, FormControl, MenuItem, InputLabel, Toolbar, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";

//import Item from './Items';
 const Item = React.lazy(() => import('./Items'));

const DateComponent = styled(DatePicker)`
    width: 250px
`;
export default function AllItems({ items, setItems, render, setRender }) {
   const [val, setVal] = useState('');

   const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
   const { startDate, endDate } = dateRange;

   const [open, setOpen] = useState(false);

   const [filtr, setFilter] = useState({ filter: '_id', allActive: true, incomeActive: false, expenseActive: false, });
   const { filter, allActive, incomeActive, expenseActive } = filtr;
   const currentDate = new Date();
  
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   const handleChange = (event) => {
      setVal(event.target.value);
      if (val !== 8) setDateRange({ startDate: null, endDate: null });
   };

   return (
      <div>
         {/* All Table Filters */}
         <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }}>
            <Toolbar className='filterToolbar'>
               <div className="filterButtonWrapper">
                  <button
                     className={`btn ${ allActive ? 'btn-primary' : 'btn-secondary'}`}
                     onClick={(() => setFilter({ filter: '_id', allActive: true }))}>
                     All
                  </button>
                  <button
                     className={`btn ${incomeActive ? 'btn-primary' : 'btn-secondary'}`}
                     onClick={(() => setFilter({ filter: 'Income', incomeActive: true }))}>
                     Income
                  </button>
                  <button
                     className={`btn ${expenseActive ? 'btn-primary' : 'btn-secondary'}`}
                     onClick={(() => setFilter({ filter: 'Expense', expenseActive: true }))}>
                     Expense
                  </button>
               </div>

               <FormControl className='FilterFormControl' sx={{ minWidth: '250px' }} size="small">
                  <InputLabel id="demo-simple-select-label">Filter Records</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     open={open}
                     value={val}
                     onClose={handleClose}
                     onOpen={handleOpen}
                     label="Filter"
                     onChange={handleChange}>

                     <MenuItem value={1}>All</MenuItem>
                     <MenuItem value={2}>Today</MenuItem>
                     <MenuItem value={3}>This Month</MenuItem>
                     <MenuItem value={4}>This Quarter</MenuItem>
                     <MenuItem value={5}>This Financial Year</MenuItem>
                     <MenuItem value={6}>Prev Month</MenuItem>
                     <MenuItem value={7}>Prev Quarter</MenuItem>
                     <MenuItem value={8}>Prev Financial Year</MenuItem>
                     <MenuItem value={9}>Other</MenuItem>
                     <MenuItem value={10}>FY{(currentDate.getFullYear()-3)%100}</MenuItem>
                     <MenuItem value={11}>FY{(currentDate.getFullYear()-2)%100}</MenuItem>
                     <MenuItem value={12}>FY{(currentDate.getFullYear()-1)%100}</MenuItem>
                    
                  </Select>
               </FormControl>

               {/* Visible on Date Range Selecting Custom Range Menu */}
               {val === 9 &&

                  <Box component="div" sx={{ display: 'inline' }}>

                     <span>
                        <span style={{ padding: '0px 5px' }}>

                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateComponent
                                 label='Start Date'
                                 name='startDate'
                                 renderInput={(params) => <TextField {...params} size="small" />}
                                 value={startDate}
                                 onChange={((date) => setDateRange({ ...dateRange, startDate: date }))}
                              />
                           </LocalizationProvider>
                        </span>
                        <span style={{ padding: '0px 5px' }}>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateComponent
                                 toolbarTitle='End Date'
                                 label='End Date'
                                 name='endDate'
                                 renderInput={(params) => <TextField {...params} size="small" />}
                                 value={endDate}
                                 onChange={((date) => setDateRange({ ...dateRange, endDate: date }))}
                              />
                           </LocalizationProvider>
                        </span>
                     </span>
                  </Box>
               }
            </Toolbar>
         </AppBar>

         <div className='divider'>
         </div>


         {/* Item Data Table  */}
         <Item items={items} setItems={setItems} render={render} setRender={setRender} type={filter} dateFilter={val} startDate={startDate} endDate={endDate} />
      </div>
   );
}