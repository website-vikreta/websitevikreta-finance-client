// import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
// import styled from '@emotion/styled';
import Items from './Items';
import { getItems } from '../api';
import Popup from './Popup';
import { useNavigate, Link } from 'react-router-dom';

// Image Imports
import SiteLogo from "../assets/websitevikreta-finance.svg";

// Icon Imports
import Logout from '@mui/icons-material/Logout';
import Add from '@mui/icons-material/Add';

const Index = () => {

   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
   const [items, setItems] = useState([]);

   let navigate = useNavigate();
   const getAllItems = async () => {
      let response = await getItems();
      setItems(response.data);
   }
   useEffect(() => {
      getAllItems();

   }, [items]);
   const handleLogout = () => {
      localStorage.removeItem('user-info');
      navigate('/');
   };

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

   function lastQuarter(d, now, month, item) {
      return d.getFullYear() === (now.getFullYear() - 1) && month >= 9 && month <= 11 ? item : null;
   }

   function getIncomeInDuration(item, currentDate, timeFilter) {
      const itemDate = new Date(item.dateOfInvoice);
      var currentMonth = currentDate.getMonth();
      if (timeFilter === 0) {

         return (itemDate.getFullYear() === currentDate.getFullYear()) ? item : null;

      } else if (timeFilter === 1) {

         return (itemDate.getFullYear() === currentDate.getFullYear() - 1) ? item : null;

      } else if (timeFilter === 2) {

         return itemDate.getFullYear() === (currentDate.getFullYear()) && (itemDate.getMonth() === currentMonth) ? item : null;

      } else if (timeFilter === 3) {

         if (currentMonth === 0) return (itemDate.getFullYear() === (currentDate.getFullYear() - 1) && itemDate.getMonth() === 11) ? item : null;
         else return (itemDate.getMonth() === currentMonth - 1) ? item : null;

      } else if (timeFilter === 4) {

         const quartr = getQuarter(currentDate.getMonth() + 1);
         return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, quartr, item);

      } else if (timeFilter === 5) {

         const quartr = getQuarter(currentDate.getMonth() + 1);
         if (quartr === 1) return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, 4, item);
         if (quartr === 4 || ((itemDate.getFullYear() === currentDate.getFullYear() - 1) && quartr === 3)) return lastQuarter(itemDate, currentDate, itemDate.getMonth() + 1, item);
         return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, quartr - 1, item);

      } else {
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


   // function getAllRevenueDetails(items, type, currentDate) {
   //    var currItems = items.filter((item) => getIncome(item, type));
   //    var currYear = currItems.filter((item) => getIncomeInDuration(item, currentDate, -1)).map(item => item.amount);
   //    var total = 0;
   //    currYear.forEach(amount => total += amount);

   //    return total;
   // }

   // const totalIncome = getAllRevenueDetails(items, 'Income', new Date());
   // const totalExpense = getAllRevenueDetails(items, 'Expense', new Date());
   // const totalProfit = totalIncome - totalExpense;

   const currentYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 0);
   const currentYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 0);
   const currentYearTotalProfit = currentYearTotalIncome - currentYearTotalExpense;

   const lastYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 1);
   const lastYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 1);
   const lastYearTotalProfit = lastYearTotalIncome - lastYearTotalExpense;

   const currMonthTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 3);
   const currMonthTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 3);
   const currMonthTotalProfit = currMonthTotalIncome - currMonthTotalExpense;

   const lastMonthTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 3);
   const lastMonthTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 3);
   const lastMonthTotalProfit = lastMonthTotalIncome - lastMonthTotalExpense;

   const currQaurtrTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 4);
   const currQaurtrTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 4);
   const currQaurtrTotalProfit = currQaurtrTotalIncome - currQaurtrTotalExpense;

   const lastQaurtrTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 5);
   const lastQaurtrTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 5);
   const lastQaurtrTotalProfit = lastQaurtrTotalIncome - lastQaurtrTotalExpense;


   return (

      // Defining Structure
      <>
         <div className="App container">
            {/* Header */}
            <header className="header">
               {/* Logo */}
               <div>
                  <img src={SiteLogo} alt="Logo Icon" />
               </div>
               {/* CTAs */}
               <div className='ctaWrapper'>
                  <div className="navLink">
                     <Link to="/all">View All Records</Link>
                  </div>
                  <div className="navLink">
                     <button className='linkBtn danger' onClick={handleLogout}>
                        <span>Logout</span> <Logout fontSize="small" sx={{ color: 'red' }} />
                     </button>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <main>

               {/* Numbers */}
               <section className="numbers">

                  <div className="row">
                     {/* This */}
                     <div className="card this">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {currMonthTotalIncome}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {currMonthTotalExpense}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {currMonthTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading'>This Month (Feb 2023)</div>
                     </div>

                     {/* Last */}
                     <div className="card">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {lastMonthTotalIncome}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {lastMonthTotalExpense}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {lastMonthTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading'>Last Month (Jan 2023)</div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="card">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {currQaurtrTotalProfit}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {currQaurtrTotalProfit}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {currQaurtrTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading this'>This Quarter (JAN23 - MAR23)</div>
                     </div>
                     <div className="card">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {lastQaurtrTotalIncome}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {lastQaurtrTotalExpense}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {lastQaurtrTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading'>Last Quarter (OCT22 - DEC22)</div>
                     </div>
                  </div>
                  <div className="row">
                     {/* This */}
                     <div className="card">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {currentYearTotalIncome}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {currentYearTotalExpense}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {currentYearTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading this'>This Year (2023)</div>
                     </div>
                     {/* Last */}
                     <div className="card">
                        <div className="numberWrapper">
                           <div className="item">
                              <span className='digits'>₹ {lastYearTotalIncome}</span>
                              <span className='label'>Sales</span>
                           </div>
                           <div className="item">
                              <span className='digits'>₹ {lastYearTotalExpense}</span>
                              <span className='label'>Expense</span>
                           </div>
                           <div className="item">
                              <span className='digits green'>₹ {lastYearTotalProfit}</span>
                              <span className='label'>Profit</span>
                           </div>
                        </div>
                        <hr />
                        <div className='cardHeading'>Last Year (2022)</div>
                     </div>
                  </div>

               </section>

               {/* Charts */}
               <section className='chartWrapper'>
                  <div className="card">Chart 1</div>

                  {/* grid */}
                  <div className="chartGrid">
                     <div className="card">Chart 2</div>
                     <div className="card">Chart 3</div>
                     <div className="card">Chart 4</div>
                     <div className="card">Chart 5</div>
                  </div>
               </section>

               {/* Table & Glimpse */}
               <div className="table">
                  <div className="card">
                     <Items />
                  </div>
               </div>

            </main>

            {/* Footer */}
            <footer className='footer'></footer>


            {/* Add Button Fixed */}
            <button
               className='btn btn-primary addItemFloating'
               onClick={() => setShowModal({ ...showModal, openDialog: true })}
               title="Add new item">
               <Add fontSize='medium' />
            </button>
         </div>

         <div className="App">
            <header className="App-header">



            </header>
            <Popup showModal={showModal} setShowModal={setShowModal} formType='Add'></Popup>


         </div>
      </>
   );

}

export default Index;