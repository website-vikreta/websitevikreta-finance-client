import '@fortawesome/fontawesome-free/css/all.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const ItemsTable = ({ items }) => {

   //const [isArrowUp, setArrowUp] = useState({thisMonth: false, thisQuarter: false, thisYear: false, lastMonth: false, lastQuarter: false, lastYear: false });

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
         if (quartr === 4) return lastQuarter(itemDate, currentDate, itemDate.getMonth() + 1, item);
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
   const currentMonth = month[currentDate.getMonth()];

   // Calculate Last Months Details
   var lastMonth = month[currentDate.getMonth() - 1];
   var lastMonthYear = currentDate.getFullYear();
   if (currentMonth === 0) {
      lastMonth = 11;
      lastMonthYear = currentDate.getFullYear() - 1;
   }
   const lastYear = currentDate.getFullYear() - 1;

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
   //const [isArrowUp, setArrowUp] = useState({thisMonth: false, thisQuarter: false, thisYear: false, lastMonth: false, lastQuarter: false, lastYear: false });

   const thisYearProfitArrow = currentYearTotalIncome >= currentYearTotalExpense;
   const lastYearProfitArrow = lastYearTotalIncome >= lastYearTotalExpense;
   const currMonthProfitArrow = currMonthTotalIncome >= currMonthTotalExpense;
   const lastMonthProfitArrow = lastMonthTotalIncome >= lastMonthTotalExpense;
   const currQuarterProfitArrow = currQaurtrTotalIncome >= currQaurtrTotalExpense;
   const lastQuarterProfitArrow = lastQaurtrTotalIncome >= lastQaurtrTotalExpense;

   const profitPercentage = (income, expense) => income === 0 && expense === 0 ? 0 : expense === 0 ? 100 : Math.round(((((income - expense) / expense) * 100) + Number.EPSILON) * 100) / 100;
   const lossPercentage = (income, expense) => Math.round(((((expense - income) / expense) * 100) + Number.EPSILON) * 100) / 100;
   
   
   return (

      // Defining Structure
      <>

         {/* Numbers */}
         <section className="numbers">

            <div className="row">
               {/* This */}
               <div className="card this">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(currMonthTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currMonthTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currMonthTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                     <div>
                        <span>
                        {currMonthProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ padding: 0, margin:0, width: '25px', height: '50px', color: 'white' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'white' }} />)}
                        {(currMonthTotalIncome >= currMonthTotalExpense) ? <strong style={{  color: 'white ' }}>{profitPercentage(currMonthTotalIncome, currMonthTotalExpense)+'%'}</strong> :  <strong style={{  color: 'white ' }}>{lossPercentage(currMonthTotalIncome, currMonthTotalExpense)+'%'}</strong>}
                  
                        </span>
                     </div>
                  </div>
                  <hr />
                  <div className='cardHeading'>This Month ({currentMonth + ' ' + currentDate.getFullYear()})</div>
               </div>

               {/* Last */}
               <div className="card">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(lastMonthTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastMonthTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastMonthTotalProfit)}</span>
                        <span className='label'>Profit </span>

                     </div>
                      <div>
                        <span>
                        {lastMonthProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ padding: 0, margin:0, width: '25px', height: '50px', color: 'green' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'red' }} />)}
                        {(lastMonthTotalIncome >= lastMonthTotalExpense) ? <strong style={{  color: 'green ' }}>{profitPercentage(lastMonthTotalIncome, lastMonthTotalExpense)+'%'}</strong> :  <strong style={{  color: 'red ' }}>{lossPercentage(lastMonthTotalIncome, lastMonthTotalExpense)+'%'}</strong>}
                  
                        </span>
                     </div>

                  </div>
                  <hr />
                  <div className='cardHeading'>Last Month ({lastMonth + ' ' + lastMonthYear})</div>
               </div>
            </div>

            <div className="row">
               <div className="card">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(currQaurtrTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currQaurtrTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currQaurtrTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                     <div>
                        <span>
                        {currQuarterProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ padding: 0, margin:0, width: '25px', height: '50px', color: 'green' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'red' }} />)}
                        {(currQaurtrTotalIncome >= currQaurtrTotalExpense) ? <strong style={{  color: 'green ' }}>{profitPercentage(currQaurtrTotalIncome, currQaurtrTotalExpense)+'%'}</strong> :  <strong style={{  color: 'red ' }}>{lossPercentage(currQaurtrTotalIncome, currQaurtrTotalExpense)+'%'}</strong>}
                  
                        </span>
                     </div>
                  </div>
                  <hr />
                  <div className='cardHeading this'>This Quarter ({currQuartrMonths[0] + (currQuartrYear1 % 100) + ' - ' + currQuartrMonths[1] + (currQuartrYear2 % 100)})</div>
               </div>
               <div className="card">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(lastQaurtrTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastQaurtrTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastQaurtrTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                     <div>
                        <span>
                        {lastQuarterProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ padding: 0, margin:0, width: '25px', height: '50px', color: 'green' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'red' }} />)}
                        {(lastQaurtrTotalIncome >= lastQaurtrTotalExpense) ? <strong style={{  color: 'green ' }}>{profitPercentage(lastQaurtrTotalIncome, lastQaurtrTotalExpense)+'%'}</strong> :  <strong style={{  color: 'red ' }}>{lossPercentage(lastQaurtrTotalIncome, lastQaurtrTotalExpense)+'%'}</strong>}
                        </span>
                     </div>
                  </div>
                  <hr />
                  <div className='cardHeading'>Last Quarter ({lastQuartrMonths[0] + (lastQuartrYear1 % 100) + ' - ' + lastQuartrMonths[1] + (lastQuartrYear2 % 100)})</div>
               </div>
            </div>
            <div className="row">
               {/* This */}
               <div className="card">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(currentYearTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(currentYearTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(currentYearTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                     <div>
                        <span>
                        {thisYearProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ padding: 0, margin:0, width: '25px', height: '50px', color: 'green' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'red' }} />)}
                        {(currentYearTotalIncome >= currentYearTotalExpense) ? <strong style={{  color: 'green ' }}>{profitPercentage(currentYearTotalIncome, currentYearTotalExpense)+'%'}</strong> :  <strong style={{  color: 'red ' }}>{lossPercentage(currentYearTotalIncome, currentYearTotalExpense)+'%'}</strong>}
                  
                        </span>
                     </div>
                  </div>
                  <hr />
                  <div className='cardHeading this'>This Year ({new Date().getFullYear()})</div>
               </div>
               {/* Last */}
               <div className="card">
                  <div className="numberWrapper">
                     <div className="item">
                        <span className='digits'>₹ {currency(lastYearTotalIncome)}</span>
                        <span className='label'>Sales</span>
                     </div>
                     <div className="item">
                        <span className='digits'>₹ {currency(lastYearTotalExpense)}</span>
                        <span className='label'>Expense</span>
                     </div>
                     <div className="item">
                        <span className='digits green'>₹ {currency(lastYearTotalProfit)}</span>
                        <span className='label'>Profit</span>
                     </div>
                     <span>
                     {lastYearProfitArrow ? (<FontAwesomeIcon icon="arrow-up" style={{ width: '25px', height: '50px', color: 'green' }} />) : (<FontAwesomeIcon icon="arrow-down" style={{ width: '25px', height: '50px', color: 'red' }} />)}
                     {(lastYearTotalIncome >= lastYearTotalExpense) ? <strong style={{  color: 'green ' }}>{profitPercentage(lastYearTotalIncome, lastYearTotalExpense)+'%'}</strong> : <strong style={{  color: 'green ' }}>{lossPercentage(lastYearTotalIncome, lastYearTotalExpense)+'%'}</strong>}

                     </span>
                  </div>
                  <hr />
                  <div className='cardHeading'>Last Year  ({lastYear})</div>
               </div>
            </div>

         </section>




      </>
   );

}

export default ItemsTable;