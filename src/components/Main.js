
import { useState } from 'react';
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

const Index = () => {

   const [showModal, setShowModal] = useState({ openDialog: false, itemId: 0 });


   let navigate = useNavigate();

   const handleLogout = () => {
      var cookie = new Cookie();
      cookie.remove('user');
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