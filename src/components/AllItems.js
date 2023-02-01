import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Item from './Items';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";
import { TextField } from '@mui/material';
import { useState } from 'react';
const Date = styled(DatePicker)`
    width: 250px
`;
export default function AllItems() {
  const [val, setVal] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const { startDate, endDate } = dateRange;
  const [open, setOpen] = useState(false);
  const [filtr, setFilter] = useState({ filter: '_id', allActive: true, incomeActive: false, expenseActive: false, });
  const { filter, allActive, incomeActive, expenseActive } = filtr;
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setVal(event.target.value);
    if (val !== 8) setDateRange({ startDate: null, endDate: null });
  };

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }}>
        <Toolbar>
          <div className="d-inline-flex p-2">
            <Button sx={{
              p: 2, color: allActive ? 'white' : 'black', backgroundColor: allActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
                bgcolor: '#7700FF',
                color: 'white',

              }

            }} onClick={(() => setFilter({ filter: '_id', allActive: true }))}
            >All</Button>
            <Button sx={{
              p: 2, color: incomeActive ? 'white' : 'black', backgroundColor: incomeActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
                bgcolor: '#7700FF',
                color: 'white',
              }
            }} onClick={(() => setFilter({ filter: 'Income', incomeActive: true }))}>
              Income</Button>
            <Button sx={{
              p: 2, color: expenseActive ? 'white' : 'black', backgroundColor: expenseActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
                bgcolor: '#7700FF',
                color: 'white',
              }
            }} onClick={(() => setFilter({ filter: 'Expense', expenseActive: true }))}
            >Expense</Button>
          </div>
          <FormControl sx={{ m: 2, width: '250px' }}>

            <InputLabel id="demo-simple-select-label">Filter Records</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              open={open}
              value={val}
              onClose={handleClose}
              onOpen={handleOpen}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={1}>Today</MenuItem>
              <MenuItem value={2}>Past 7 Days</MenuItem>
              <MenuItem value={3}>Past 30 Days</MenuItem>
              <MenuItem value={4}>This Quarter</MenuItem>
              <MenuItem value={5}>Last Quarter</MenuItem>
              <MenuItem value={6}>This Year</MenuItem>
              <MenuItem value={7}>Last Year</MenuItem>
              <MenuItem value={8}>2021</MenuItem>
              <MenuItem value={9}>Custom Range</MenuItem>

            </Select>
          </FormControl>

          {val === 9 &&

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
      <Item type={filter} dateFilter={val} startDate={startDate} endDate={endDate}/>
    </Box>
  );
}