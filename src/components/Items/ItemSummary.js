import '@fortawesome/fontawesome-free/css/all.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const ItemsTable = ({ items }) => {

   function getIncome(item, type) {
      if (item.paymentType === type) return item.amount;
      else return null;
   }

   function getQuarter(month) {
      if (month >= 4 && month <= 6) return 1;
      else if (month >= 7 && month <= 9) return 2;
      else if (month >= 10 && month <= 12) return 3;
      else return 4;
   }

   function thisQuarter(currentDate, now, month, quartr, item) {
      if (currentDate.getFullYear() !== now.getFullYear()) {
         return null;
      }

      switch (quartr) {
         case 1:
            return month >= 4 && month <= 6 ? item : null;
         case 2:
            return month >= 7 && month <= 9 ? item : null;
         case 3:
            return month >= 10 && month <= 12 ? item : null;
         case 4:
            return month <= 3 ? item : null;
         default:
            return null;
      }
   }

   function lastQuarter(currentDate, now, month, item) {
      return currentDate.getFullYear() === (now.getFullYear() - 1) && month >= 10 && month <= 12 ? item : null;
   }

   function getIncomeInDuration(item, currentDate, timeFilter) {
      const itemDate = new Date(item.dateOfInvoice);
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      var quarter = 0;
      switch (timeFilter) {
         case 0:
            return itemDate.getMonth() < 3 ? (itemDate.getFullYear() === currentYear + 1 ? item : null) : (itemDate.getFullYear() === currentYear ? item : null);
         case 1:
            return itemDate.getMonth() < 3 ? (itemDate.getFullYear() === currentYear ? item : null) : (itemDate.getFullYear() === currentYear - 1 ? item : null);
         case 2:
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth ? item : null;
         case 3:
            if (currentMonth === 0) {
               return itemDate.getFullYear() === currentYear - 1 && itemDate.getMonth() === 11 ? item : null;
            } else {
               return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth - 1 ? item : null;
            }
         case 4:
            quarter = getQuarter(currentMonth + 1);
            return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, quarter, item);
         case 5:
            quarter = getQuarter(currentMonth + 1);
            if (quarter === 1) {
               return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, 4, item);
            } else if (quarter === 4) {
               return lastQuarter(itemDate, currentDate, itemDate.getMonth() + 1, item);
            } else {
               return thisQuarter(itemDate, currentDate, itemDate.getMonth() + 1, quarter - 1, item);
            }
         default:
            return item;
      }
   }


   function getTotalRevenueDetails(items, type, currentDate, timeFilter) {
      return items.reduce((total, item) => {
         const { amount } = item;
         if (getIncome(item, type) && getIncomeInDuration(item, currentDate, timeFilter)) {
            total += amount;
         }
         return total;
      }, 0);
   }


   function currency(value) {
      return value.toLocaleString('en-IN');
   }

   const currentYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 0);
   const currentYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 0);
   const currentYearTotalProfit = currentYearTotalIncome - currentYearTotalExpense;

   const lastYearTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 1);
   const lastYearTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 1);
   const lastYearTotalProfit = lastYearTotalIncome - lastYearTotalExpense;

   const currMonthTotalIncome = getTotalRevenueDetails(items, 'Income', new Date(), 2);
   const currMonthTotalExpense = getTotalRevenueDetails(items, 'Expense', new Date(), 2);
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

   const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

   // Calculate Current Months Details
   const currentDate = new Date();
   const currentFinancialYear = currentDate.getMonth() < 3 ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
   const previousFinancialYear = currentFinancialYear - 1;


   const currentMonth = month[currentDate.getMonth()];

   // Calculate Last Months Details
   var lastMonth = month[currentDate.getMonth() - 1];

   if (currentMonth === 0) {
      lastMonth = 11;
   }


   // Calculate Current Quarter Months Details
   const qaurters = [["APR", "JUN"], ["JUL", "SEPT"], ["OCT", "DEC"], ["JAN", "MAR"]];
   var currQuartr = getQuarter(currentDate.getMonth() + 1);
   const currQuartrMonths = qaurters[currQuartr - 1];
   var currQuartrYear1 = currentDate.getFullYear();
   var currQuartrYear2 = currentDate.getFullYear();


   // Calculate Last Quarter Months Details
   var lastQuartrMonths = qaurters[currQuartr - 2];
   var lastQuartrYear1 = currentDate.getFullYear();
   var lastQuartrYear2 = currentDate.getFullYear();
   if (currQuartr === 1) {
      lastQuartrMonths = qaurters[3];
      lastQuartrYear1 = currentDate.getFullYear() - 1;
   } else if (currQuartr === 4) {
      lastQuartrYear1 = currentDate.getFullYear() - 1;
      lastQuartrYear2 = currentDate.getFullYear() - 1;
   }




   // Calculate current month, quarter and year profit
   function calculateProfitPercentage(currentProfit, lastProfit) {
      if (lastProfit === 0) {
         return currentProfit > 0 ? 100 : -100;
      } else {
         return (((currentProfit - lastProfit) / lastProfit) * 100).toFixed(2);
      }
   }

   const currentMonthProfit = calculateProfitPercentage(currMonthTotalProfit, lastMonthTotalProfit);
   const currentQuarterProfit = calculateProfitPercentage(currQaurtrTotalProfit, lastQaurtrTotalProfit);
   const currentYearProfit = calculateProfitPercentage(currentYearTotalProfit, lastYearTotalProfit);


   return (

      // Defining Structure
      <>

         {/* Numbers */}
         <section className="numbers">

            <div className="card this">
               <div className="card-body">
                  {/* This */}
                  <div className="numberWrapper this">
                     <div className='cardHeading fullRow'>This Month ({currentMonth + ' ' + currentDate.getFullYear()})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currMonthTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currMonthTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currMonthTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
                  {/* Prev */}
                  <div className="numberWrapper">
                     <div className='cardHeading fullRow'>Prev Month ({lastMonth + ' ' + (lastMonth === 'DEC' ? currentDate.getFullYear() - 1 : currentDate.getFullYear())})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastMonthTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastMonthTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastMonthTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
               </div>
               {/* Titles */}
               <div className='card-footer'>
                  <span>Month</span>

                  {/* Arrow % */}
                  <div className="arrowValue">
                     {((currentMonthProfit !== 0 && currentMonthProfit > 0) ? (<FontAwesomeIcon icon="arrow-up" style={{ color: 'green' }} />) : currentMonthProfit !== 0 ? (<FontAwesomeIcon icon="arrow-down" style={{ color: 'red' }} />) : null)}
                     {currentMonthProfit === 0 ? <span style={{ color: 'gray ' }}>{0 + '%'}</span> : (currentMonthProfit > 0) ? <span style={{ color: 'green ' }}>{currentMonthProfit + '%'}</span> : <span style={{ color: 'red ' }}>{currentMonthProfit + '%'}</span>}
                     <span>than prev month</span>
                  </div>
               </div>
            </div>

            <div className="card">
               <div className="card-body">
                  {/* This */}
                  <div className="numberWrapper this">
                     <div className='cardHeading fullRow'>This Quarter ({currQuartrMonths[0] + (currQuartrYear1 % 100) + ' - ' + currQuartrMonths[1] + (currQuartrYear2 % 100)})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currQaurtrTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currQaurtrTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currQaurtrTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
                  {/* Prev */}
                  <div className="numberWrapper">
                     <div className='cardHeading fullRow'>Prev Quarter ({lastQuartrMonths[0] + (lastQuartrYear1 % 100) + ' - ' + lastQuartrMonths[1] + (lastQuartrYear2 % 100)})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastQaurtrTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastQaurtrTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastQaurtrTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
               </div>
               {/* Titles */}
               <div className='card-footer'>
                  <span>Quarter</span>

                  {/* Arrow % */}
                  <div className="arrowValue">
                     {(currentQuarterProfit !== 0 && currentQuarterProfit > 0) ? (<FontAwesomeIcon icon="arrow-up" style={{ color: 'green' }} />) : currentQuarterProfit !== 0 ? (<FontAwesomeIcon icon="arrow-down" style={{ color: 'red' }} />) : null}
                     {currentQuarterProfit === 0 ? <span style={{ color: 'gray ' }}>{0 + '%'}</span> : (currentQuarterProfit > 0) ? <span style={{ color: 'green ' }}>{currentQuarterProfit + '%'}</span> : <span style={{ color: 'red ' }}>{currentQuarterProfit + '%'}</span>}
                     <span>than prev quarter</span>
                  </div>
               </div>
            </div>

            <div className="card">
               <div className="card-body">
                  {/* This */}
                  <div className="numberWrapper this">
                     <div className='cardHeading fullRow'>This Financial Year ({'FY' + currentFinancialYear % 100})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currentYearTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currentYearTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currentYearTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
                  {/* Prev */}
                  <div className="numberWrapper">
                     <div className='cardHeading fullRow'>Prev Financial Year ({'FY' + previousFinancialYear % 100})</div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastYearTotalIncome)}</span>
                        <span className='label'>Income</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastYearTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastYearTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                  </div>
               </div>
               {/* Titles */}
               <div className='card-footer'>
                  <span>Year</span>

                  {/* Arrow % */}
                  <div className="arrowValue">
                     {(currentYearProfit !== 0 && currentYearProfit > 0) ? (<FontAwesomeIcon icon="arrow-up" style={{ color: 'green' }} />) : currentYearProfit !== 0 ? (<FontAwesomeIcon icon="arrow-down" style={{ color: 'red' }} />) : null}
                     {currentYearProfit === 0 ? <span style={{ color: 'gray ' }}>{0 + '%'}</span> : (currentYearProfit > 0) ? <span style={{ color: 'green ' }}>{currentYearProfit + '%'}</span> : <span style={{ color: 'red ' }}>{currentYearProfit + '%'}</span>}
                     <span>than prev year</span>
                  </div>
               </div>
            </div>
         </section>
      </>
   );

}

export default ItemsTable;