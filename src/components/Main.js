
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';

// Image Imports
import SiteLogo from "../assets/websitevikreta-finance.svg";

// Icon Imports
import Logout from '@mui/icons-material/Logout';
import Add from '@mui/icons-material/Add';

// Import Components
import AllItems from './Items/AllItems';
import Popup from './PopupModals/Popup';
import ItemsTable from './Items/ItemSummary';
import { getItems } from '../api';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
const Index = () => {
   const [items, setItems] = useState([]);
   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });
   const getAllItems = async () => {
      document.title = 'Home | WV Finance'
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      setItems(response.data);
   }
   useEffect(() => {
      getAllItems();

   }, [items]);

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
                     <button className='linkBtn danger' onClick={handleLogout}>
                        <span>Logout</span> <Logout fontSize="small" sx={{ color: 'red' }} />
                     </button>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <main>
               <ItemsTable />
               {/* Charts */}
               <section className='chartWrapper'>
                  {/* current year monthly data */}
                  <div className="card"><LineChart setItems = {setItems}/></div>
                  {/* grid */}
                  <div className="chartGrid">
                       {/* yearly income expense and profit  */}
                      <div className="card"><BarChart setItems = {setItems}/></div>
                     {/* current year income expense */}
                     <div className="card"><PieChart  setItems = {setItems} /></div>
                     <div className="card"><DoughnutChart setItems = {setItems}/></div>
                     <div className="card">Chart 4</div>
                     <div className="card">Chart 5</div>
                  </div>
               </section>
               {/* Table & Glimpse */}
               <div className="table">
                  <div className="card">
                     <AllItems />
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
            <Popup showModal={showModal} setShowModal={setShowModal} formType='Add'></Popup>

         </div>
      </>
   );

}

export default Index;