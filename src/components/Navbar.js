import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import DeleteDataPopup from './PopupModals/DeleteDataPopup';
// Image Imports
import SiteLogo from "../assets/websitevikreta-finance.svg";

// Icon Imports
import Logout from '@mui/icons-material/Logout';
import { Close, Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteAccount from './PopupModals/DeleteAccount';
const Navbar = ({ user }) => {

   const [showMediaIcon, setShowMediaIcon] = useState(false);
   const [openMenu, setOpenMenu] = useState(false);
   const [deleteDataModal, setDeleteDataModal] = useState(false);
   const [deleteAccountModal, setDeleteAccountModal] = useState(false);
   let menuRef = useRef();

   useEffect(() => {

      let handler = (e) => {
         if (menuRef.current) {
            if (!menuRef.current.contains(e.target)) {
               setShowMediaIcon(false)
               setOpenMenu(false)
            }
         }
      };

      document.addEventListener("mousedown", handler);


      return () => {
         document.removeEventListener("mousedown", handler);
      }

   }, [openMenu]);
   let navigate = useNavigate();

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 768) {
            setShowMediaIcon(false);
         }
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   // User Logout
   const handleLogout = () => {
      var cookie = new Cookie();
      cookie.remove('user');
      document.title = 'Login'
      localStorage.removeItem('user-info');
      setTimeout(() => {
         navigate('/');
      }, 2000);

   };

   // Open Delete Data Modal
   const handleDeleteData = () => {
      setDeleteDataModal(true);
      setShowMediaIcon(false);
   }
   // Open Delete Account Modal
   const handleDeleteAccount = () => {
      setDeleteAccountModal(true);
      setShowMediaIcon(false);
   }


   return (
      <>
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
                  <div className={showMediaIcon ? 'mobile-menu-link active' : 'ctaWrapper'} ref={menuRef}>

                     <div className='username-text'>
                        <span className='welcomeText'>Welcome back, <b>{user.username}</b></span>
                     </div>

                     {showMediaIcon ?
                        <>
                           {/* Menu Options on Mobile View */}
                           <div>
                              <button className='linkBtn' onClick={() => { navigate('/change-password') }}>Change Password</button>
                           </div>
                           <div>
                              <button className='linkBtn logout' onClick={() => { setOpenMenu(false); handleDeleteData() }}>
                                 <span>Delete All Data</span>
                              </button>
                           </div>
                           <div>
                              <button className='linkBtn logout' onClick={() => { setOpenMenu(false); handleDeleteAccount() }}>
                                 <span>Delete Account</span>
                              </button>
                           </div>
                           <div>
                              <button className='linkBtn logout' onClick={handleLogout}>
                                 <span>Logout</span> <Logout fontSize="small" />
                              </button>
                           </div>

                        </>

                        :
                        <>
                           {/* Menu Options on Desktop View */}
                           {!openMenu ? <AccountCircleIcon onClick={() => setOpenMenu(!openMenu)} /> : <span><AccountCircleIcon/></span>}

                           {openMenu && <div className='drop-down-menu' ref={menuRef}>
                              <ul>
                                 <div className='username-text'>
                                    <span className='welcomeText'>Welcome back, <b>{user.username}</b></span>
                                 </div>
                                 <li>
                                    <button className='linkBtn' onClick={() => navigate('/change-password')}>Change Password</button>
                                 </li>                                 
                                 <li>
                                    <button className='linkBtn logout' onClick={handleDeleteData}>
                                       <span>Delete All Data</span>
                                    </button>
                                 </li>
                                 <li>
                                    <button className='linkBtn logout' onClick={handleDeleteAccount}>
                                       <span>Delete Account</span>
                                    </button>
                                 </li>
                                 <li> <button className='linkBtn logout' onClick={handleLogout}>
                                    <span>Logout</span> <Logout fontSize="small" />
                                 </button></li>
                              </ul>
                           </div>}
                        </>}
                  </div>
               </>
            }
         </header>
         {user && <>
            <DeleteDataPopup userId={user.id} deleteDataModal={deleteDataModal} setDeleteDataModal={setDeleteDataModal} />
            <DeleteAccount user={user} deleteAccountModal={deleteAccountModal} setDeleteAccountModal={setDeleteAccountModal} handleLogout={handleLogout} />

         </>}
      </>
   );
}

export default Navbar;
