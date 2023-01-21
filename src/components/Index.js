import Button from '@mui/material/Button';

import Add from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import { useState } from 'react';
import Products from './Products';

import Popup from './Popup';
import { useNavigate } from 'react-router-dom';



const StyleButton = styled(Button)`
margin-right: 20px

`;


const Index = () => {
  
    const [showModal,setShowModal] = useState({openDialog: false, productId: 0});
    
    
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
        <Popup showModal = {showModal} setShowModal = {setShowModal} formType = 'Add'></Popup>
        <Products/>
      </div>
        );
  
  }
  
  export default Index;