
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import React from 'react';
// Image Imports
import SiteLogo from "../assets/websitevikreta-finance.svg";

// Icon Imports
import Logout from '@mui/icons-material/Logout';
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
import { Button } from '@mui/material';
const Popup = React.lazy(() => import('./PopupModals/Popup'));
const Index = () => {

   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
   const [items, setItems] = useState([]);
   const [render, setRender] = useState('unset');

   const getAllItems = async () => {
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      setItems(response.data);
   }
   useEffect(() => {
      getAllItems();
   }, [render]);

   let navigate = useNavigate();

   const handleLogout = () => {
      var cookie = new Cookie();
      cookie.remove('user');
      document.title = 'Login | WV Finance'
      localStorage.removeItem('user-info');
      navigate('/');
   };


   return (

      // Defining Structure
      <>
         <div className="App container">
            {/* Header */}
            <header className="header">
               {/* Logo */}
               <div className='logoWrapper'>
                  <img src={SiteLogo} alt="Logo Icon" />
               </div>
               {/* CTAs */}
               <div className='ctaWrapper'>
                  <div className="navLink">
                     <span className='welcomeText'>Welcome back, <b>{JSON.parse(localStorage.getItem('user-info')).username}</b></span>
                  </div>
                  <div className="navLink">
                     <Button onClick={()=> navigate('/ChangePassword')}>Change Password</Button>
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
            <Popup setRender={setRender} showModal={showModal} setShowModal={setShowModal} formType='Add'></Popup>

         </div>
      </>
   );

}

export default Index;