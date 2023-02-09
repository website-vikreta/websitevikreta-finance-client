import React from 'react';
import { useState } from 'react';

import { AppBar, Box, Select, FormControl, MenuItem, InputLabel, Toolbar, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";

const Item = React.lazy(() => import('./Items'));

const Date = styled(DatePicker)`
    width: 250px
`;
export default function AllItems({items, setItems, render, setRender}) {
   const [val, setVal] = useState('');

   const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
   const { startDate, endDate } = dateRange;

   const [open, setOpen] = useState(false);

   const [filtr, setFilter] = useState({ filter: '_id', allActive: true, incomeActive: false, expenseActive: false, });
   const { filter, allActive, incomeActive, expenseActive } = filtr;

   
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
      <Box sx={{ flexGrow: 1 }}>

         {/* All Table Filters */}
         <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }}>
            <Toolbar className='filterToolbar'>
               <div className="filterButtonWrapper">
                  <button
                     className={`btn ${allActive ? 'btn-primary' : 'btn-secondary'}`}
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

                     <MenuItem value={1}>Today</MenuItem>
                     <MenuItem value={2}>Past 7 Days</MenuItem>
                     <MenuItem value={3}>Past 30 Days</MenuItem>
                     <MenuItem value={4}>This Quarter</MenuItem>
                     <MenuItem value={5}>Last Quarter</MenuItem>
                     <MenuItem value={6}>This Year</MenuItem>
                     <MenuItem value={7}>Last Year</MenuItem>
                     <MenuItem value={8}>2021</MenuItem>
                     <MenuItem value={9}>All</MenuItem>
                     <MenuItem value={10}>Custom Range</MenuItem>

                  </Select>
               </FormControl>

               {/* Visible on Date Range Selecting Custom Range Menu */}
               {val === 10 &&

                  <Box component="div" sx={{ display: 'inline' }}>

                     <span>
                        <span style={{ padding: '0px 5px' }}>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Date
                                 label='Start Date'
                                 name='startDate'
                                 renderInput={(params) => <TextField {...params} />}
                                 value={startDate}
                                 onChange={((date) => setDateRange({ ...dateRange, startDate: date }))}
                              />
                           </LocalizationProvider>
                        </span>
                        <span style={{ padding: '0px 5px' }}>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Date
                                 toolbarTitle='End Date'
                                 label='End Date'
                                 name='endDate'
                                 renderInput={(params) => <TextField {...params} />}
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
      </Box>
   );
}