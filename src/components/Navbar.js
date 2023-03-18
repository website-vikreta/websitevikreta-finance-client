import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
// Image Imports
import SiteLogo from "../assets/websitevikreta-finance.svg";

// Icon Imports
import Logout from '@mui/icons-material/Logout';
import { Close, Menu } from '@mui/icons-material';

const Navbar = ({ user }) => {

   const [showMediaIcon, setShowMediaIcon] = useState(false);
   let navigate = useNavigate();
   const handleLogout = () => {
      var cookie = new Cookie();
      cookie.remove('user');
      document.title = 'Login | WV Finance'
      localStorage.removeItem('user-info');
      navigate('/');
   };

   return (
      <header className="header">
         {/* Logo */}
         <div className='logoWrapper'>
            <img src={SiteLogo} alt="Logo Icon" />
         </div>

         {/* Hamburger menu for mobile screen */}

         {user &&
            <>
               {/* Toggle Button */}
               <span onClick={() => setShowMediaIcon(!showMediaIcon)} className="hamburgerMenu m-0 p-0">
                  {showMediaIcon ? <Close /> : <Menu />}
               </span>

               {/* CTAs */}
               <div className={showMediaIcon ? 'mobile-menu-link' : 'ctaWrapper'}>

                  <div className='username-text'>
                     <span className='welcomeText'>Welcome back, <b>{user}</b></span>
                  </div>

                  <div >
                     <button className='linkBtn' onClick={() => navigate('/ChangePassword')}>Change Password</button>
                  </div>
                  <div >
                     <button className='linkBtn logout' onClick={handleLogout}>
                        <span>Logout</span> <Logout fontSize="small" />
                     </button>
                  </div>

               </div>
            </>
         }

      </header>
   );
}
export default Navbar;