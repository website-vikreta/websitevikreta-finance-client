import Button from '@mui/material/Button';

import Add from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import { useState } from 'react';
import Products from './Products';

import Popup from './Popup';
import {Link} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image from 'mui-image'


const StyleButton = styled(Button)`
margin-right: 20px

`;


const Index = () => {
  
    const [showModal,setShowModal] = useState(false);
    
    function showModalHandler(){
        setShowModal(!showModal);
    }

    let navigate = useNavigate();
 
    return (
        <div className="App">
        <header className="App-header">
        
       

        
        <StyleButton variant="contained" onClick={() => navigate('/all')} sx={{mr:2,
         color: '#7700FF', backgroundColor: '#ddccff', borderColor: '#7700FF', ':hover': {
                            bgcolor: '#ddccff', 
                            color: '#7700FF',
                        }
                    }}>View All Record</StyleButton>
        <StyleButton variant="contained" startIcon={<Add />} onClick={() => setShowModal({...showModal, openDialog: true})}
        sx={{ color: 'white', backgroundColor: '#7700FF', borderColor: '#7700FF', ':hover': {
          bgcolor: '#7700FF', 
          color: 'black',
        },}}>Add New Record</StyleButton>
        
        </header>
        <Popup showModal = {showModal} setShowModal = {setShowModal}></Popup>
        <Products/>
      </div>
        );
  
  }
  
  export default Index;