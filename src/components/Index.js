import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Add from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Items from './Items';
import { getItems } from '../api';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';



const StyleButton = styled(Button)`
margin-right: 20px

`;


const Index = () => {

  const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
  const [items, setItems] = useState([]);

  const getAllItems = async () => {
    let response = await getItems();
    setItems(response.data);

  }
  useEffect(() => {
    getAllItems();


  }, [items]);


 


  function getIncome(item, type) {
    if (item.paymentType === type) return item.amount;
    else return null;
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
      } else
        if (d.getFullYear() === (now.getFullYear() - 1) && month >= 12) {
          return item
        } else {
          return null;
        }
    } else if (d.getFullYear() === now.getFullYear()) {

      if (quartr === 1)
        return d.getFullYear() === now.getFullYear() && month >= 3 && month <= 5 ? item : null;
      if (quartr === 2)
        return d.getFullYear() === now.getFullYear() && month >= 6 && month <= 8 ? item : null;
      if (quartr === 3)
        return d.getFullYear() === now.getFullYear() && month >= 9 && month <= 11 ? item : null;
    } else return null;
  }



  function getIncomeInDuration(item, currentDate, timeFilter) {
    const itemDate = new Date(item.dateOfInvoice);
    if (timeFilter === 0) {
     
      return (itemDate.getFullYear() === currentDate.getFullYear()) ? item : null;

    }if(timeFilter === 1){
       var currentMonth = currentDate.getMonth();
      if(currentMonth === 0) return (itemDate.getFullYear() === (currentDate.getFullYear() - 1) && itemDate.getMonth() === 11) ? item: null;
      else return (itemDate.getMonth() === currentMonth-1) ? item: null;
    
    } else if (timeFilter === 2) {

      return (itemDate.getFullYear() === currentDate.getFullYear() - 1) ? item : null;

    } else if (timeFilter === 3) {

      const quartr = getQuarter(currentDate.getMonth() + 1);
      return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, quartr, item);

    }else{
       return item;
    }
  }

  function getTotalRevenueDetails(items, type, currentDate, timeFilter) {
    var currItems = items.filter((item) => getIncome(item, type));
    var currYear = currItems.filter((item) => getIncomeInDuration(item, currentDate, timeFilter)).map(item => item.amount);
    var total = 0;
    currYear.forEach(amount => total += amount);
    
    return total;
  }

  
  function getAllRevenueDetails(items, type, currentDate){
    var currItems = items.filter((item) => getIncome(item, type));
    var currYear = currItems.filter((item) => getIncomeInDuration(item, currentDate,-1)).map(item => item.amount);
    var total = 0;
    currYear.forEach(amount => total += amount);
    
    return total;
  }

  const totalIncome = getAllRevenueDetails(items, 'Income', new Date());
  const totalExpense = getAllRevenueDetails(items, 'Expense', new Date());
  const totalProfit = totalIncome - totalExpense;

  const currentYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 0);
  const currentYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 0);
  const currentYearTotalProfit = currentYearTotalIncome - currentYearTotalExpense;

  const lastMonthTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 1);
  const lastMonthTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 1);
  const lastMonthTotalProfit = lastMonthTotalIncome - lastMonthTotalExpense;

  const lastYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 2);
  const lastYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 2);
  const lastYearTotalProfit = lastYearTotalIncome - lastYearTotalExpense;

  const currQaurtrTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 3);
  const currQaurtrTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 3);
  const currQaurtrTotalProfit = currQaurtrTotalIncome - currQaurtrTotalExpense;

  let navigate = useNavigate();

  return (

    <div className="App">
      <header className="App-header">

        <StyleButton variant="contained" onClick={() => navigate('/all')} sx={{
          mr: 2,
          color: '#7700FF', backgroundColor: '#ddccff', borderColor: '#7700FF', ':hover': {
            bgcolor: '#ddccff',
            color: '#7700FF',
          }
        }}>View All Record</StyleButton>
        <StyleButton variant="contained" startIcon={<Add />} onClick={() => setShowModal({ ...showModal, openDialog: true })}
          sx={{
            color: 'white', backgroundColor: '#7700FF', borderColor: '#7700FF', ':hover': {
              bgcolor: '#7700FF',
              color: 'black',
            },
          }}>Add New Record</StyleButton>

      </header>
      <div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Total Sales</th>
              <th>Total Expense</th>
              <th>Total Profits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Current Year</th>
              <td>{currentYearTotalIncome}</td>
              <td>{currentYearTotalExpense}</td>
              <td>{currentYearTotalProfit}</td>
            </tr>
            <tr>
              <th>Last Month</th>
              <td>{lastMonthTotalIncome}</td>
              <td>{lastMonthTotalExpense}</td>
              <td>{lastMonthTotalProfit}</td>
            </tr>
            <tr>
              <th>last Year</th>
              <td>{lastYearTotalIncome}</td>
              <td>{lastYearTotalExpense}</td>
              <td>{lastYearTotalProfit}</td>
            </tr>
            <tr>
              <th>Current quartr</th>
              <td>{currQaurtrTotalIncome}</td>
              <td>{currQaurtrTotalExpense}</td>
              <td>{currQaurtrTotalProfit}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{totalIncome}</td>
              <td>{totalExpense}</td>
              <td>{totalProfit}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <Popup showModal={showModal} setShowModal={setShowModal} formType='Add'></Popup>
      <Items />


    </div>
  );

}

export default Index;