
import { useState, useEffect } from 'react';

import React from 'react';

import Add from '@mui/icons-material/Add';

// Import Components
import AllItems from './Items/AllItems';
// import Popup from './PopupModals/Popup';
import ItemsTable from './Items/ItemSummary';
import BarChart from './charts/BarChart'
import DoughnutChart from './charts/DoughnutChart'
import PieChart from './charts/PieChart'
import LineChart from './charts/LineChart'
import { getItems } from '../api';
import QuartersChart from './charts/QuartersChart';
import { Suspense } from 'react';
import Navbar from './Navbar';
import ChangePassword from './ChangePassword';
const Popup = React.lazy(() => import('./PopupModals/Popup'));

const Index = () => {

   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
   const [items, setItems] = useState([]);
   const [user, setUser] = useState([]);
   const [render, setRender] = useState('unset');
   
   document.title = 'Home'
   const getAllItems = async () => {
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      setUser(JSON.parse(res))
      setItems(response.data);
   }
   useEffect(() => {
      getAllItems();
   }, [render]);

   
   return (

      // Defining Structure
      <>
         <div className="App container">
            {/* Header */}
            <Navbar user={user}/>

            {/* Main Content */}
            <main>
               <ItemsTable items={items} />
               {/* Charts */}
               <section className='chartWrapper'>
                  {/* current year monthly data */}

                  <div className="chartGrid filterCharts">
                     <div className="card col-span-2"><LineChart items={items} /></div>
                     {/* yearly income expense and profit  */}
                     <div className="card"><BarChart items={items} /></div>
                  </div>
                  {/* grid */}
                  <div className="chartGrid normalCharts">
                     <div className="card col-span-2"><QuartersChart items={items} /></div>
                     {/* current year income expense */}
                     <div className="card"><PieChart items={items} /></div>
                     <div className="card"><DoughnutChart items={items} /></div>
                  </div>

               </section>
               {/* Table & Glimpse */}
               <div className="table">
                  <div className="card">

                     <AllItems items={items} setItems={setItems} render={render} setRender={setRender} />
                     
                  </div>
                  <ChangePassword/>
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
            <Suspense>
            <Popup setRender={setRender} showModal={showModal} setShowModal={setShowModal} formType='Add'></Popup>

            </Suspense>
         </div>
      </>
   );

}

export default Index;