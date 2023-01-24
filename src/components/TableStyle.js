const tableCustomStyles = {
    rows: {
        style: {
        
        minHeight: '70px',
        fontSize: '20px',
        padding: '20px 0px',
        '&:nth-of-type(even)':{backgroundColor: '#f5e6ff'},
        '&:hover':{backgroundColor: '#000000'}
        },
    },
    headCells: {
      style: {
        justifyContent: 'center',
        minHeight: '65px',
        fontSize: '20px',
        backgroundColor: '#6600cc',
        color: '#FFFFFF',
        textAlign: 'center',
      },
    },
    cells: {
        style: {
            justifyContent: 'center',
            textAlign: 'center',
        },
    },
    pagination:{
        style: {
            minHeight: '70px',
            fontSize: '20px',
        }
    }
    
  }
  export { tableCustomStyles };