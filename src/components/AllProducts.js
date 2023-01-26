import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Product from './Products';


export default function AllProducts() {
  const [val, setVal] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [filtr, setFilter] = React.useState({filter:'_id', allActive: false, incomeActive: false, expenseActive: false, });
  const {filter, allActive, incomeActive, expenseActive} = filtr;
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setVal(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }}>
        <Toolbar>
          <div  className="d-inline-flex p-2">
          <Button sx={{ p: 2, color: allActive ? 'white': 'black', backgroundColor: allActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
              bgcolor: '#7700FF',
              color: 'white',
            
            }
            
          }} onClick= {(() => setFilter({filter: '_id', allActive: true}))}
          >All</Button>
          <Button sx={{ p: 2,  color: incomeActive ? 'white': 'black', backgroundColor: incomeActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
              bgcolor: '#7700FF', 
              color: 'white',
            }
          }}onClick= {(() => setFilter({filter: 'Income', incomeActive: true}))}>
            Income</Button>
          <Button sx={{ p: 2, color: expenseActive ? 'white': 'black', backgroundColor: expenseActive ? "#7700FF" : "white", borderColor: 'black', border: 1, ':hover': {
              bgcolor: '#7700FF', 
              color: 'white',
            }
          }} onClick= {(() => setFilter({filter: 'Expense', expenseActive: true}))}
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
              <MenuItem value={1}>Past 7 Days</MenuItem>
              <MenuItem value={2}>Past 30 Days</MenuItem>
              <MenuItem value={3}>This Quarter</MenuItem>
              <MenuItem value={4}>Last Quarter</MenuItem>
              <MenuItem value={5}>Last Year</MenuItem>
              <MenuItem value={6}>2021</MenuItem>

            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Product type={filter} dateFilter= {val}/>
    </Box>
  );
}