
import { useState, useEffect } from 'react';

import React from 'react';

import Add from '@mui/icons-material/Add';

// Import Components
// import ItemsTable from './Items/ItemSummary';
import { getInvestments } from '../api';
import { Suspense } from 'react';
import Navbar from './Navbar';
import AllInvestments from './investments/AllInvestments';

const Popup = React.lazy(() => import('./PopupModals/Popup'));

const InvestmentMain = () => {

   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
   const [investments, setInvestments] = useState([]);
   const [user, setUser] = useState([]);
   const [render, setRender] = useState('unset');

   document.title = 'WV | Investment'
   const getAllInvestments = async () => {
      let res = localStorage.getItem('user-info');
      let response = await getInvestments(JSON.parse(res).id);
      setUser(JSON.parse(res))

      // Sort and set data according to latest date of invoice 
      setInvestments(response.data.sort((investment1, investment2) => {
         let d1 = new Date(investment1.dateOfMature);
         let d2 = new Date(investment2.dateOfMature);
         if (d1 < d2) return 1
         else if (d1 > d2) return -1;
         else return 0;
      }));
   }
   useEffect(() => {
      getAllInvestments();
   }, [render]);


   return (

      // Defining Structure
      <>
         <div className="App container">
            {/* Header */}
            <Navbar user={user} />

            {/* Main Content */}
            <main>
               {/* <ItemsTable items={items} /> */}
               {/* Charts */}
               <section className='chartWrapper'>
                  {/* current year monthly data */}

                  <div className="chartGrid filterCharts">
                     {/* <div className="card col-span-2"><LineChart items={items} /></div> */}
                     {/* yearly income expense and profit  */}
                     {/* <div className="card"><BarChart items={items} /></div> */}
                  </div>
                  {/* grid */}
                  <div className="chartGrid normalCharts">
                     {/* <div className="card col-span-2"><QuartersChart items={items} /></div> */}
                     {/* current year income expense */}
                     {/* <div className="card"><PieChart items={items} /></div> */}
                     {/* <div className="card"><DoughnutChart items={items} /></div> */}
                  </div>

               </section>
               {/* Table & Glimpse */}
               <div className="table">
                  <div className="card">

                     <AllInvestments investments={investments} setInvestments={setInvestments} render={render} setRender={setRender} />

                  </div>

               </div>

            </main>

            {/* Footer */}
            <footer className='footer'></footer>


            {/* Add Button Fixed */}
            <button
               className='btn btn-primary addItemFloating'
               onClick={() => setShowModal({ ...showModal, openDialog: true })}
               title="Add new Investment">
               <Add fontSize='medium' />
            </button>
            <Suspense>
               <Popup setRender={setRender} showModal={showModal} setShowModal={setShowModal} formType='Investment'></Popup>
            </Suspense>
         </div>
      </>
   );

}

export default InvestmentMain;