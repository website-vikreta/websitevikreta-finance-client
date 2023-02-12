const tableCustomStyles = {
   table: {
      style: {
         padding: '0',
         margin: '0',
         overflow: 'visible',
         whiteSpace: 'nowrap',
         textOverflow: 'none'

      }
   },
   rows: {
      style: {
         fontSize: '.6rem',
         padding: '10px 0',
         '&:nth-of-type(even)': { backgroundColor: 'rgba(119, 0, 255, 5%)' },
      },
   },
   headCells: {
      style: {
         fontSize: '0.6rem ',
         
         margin: '0',
         backgroundColor: '#7700ff',
         color: '#FFFFFF',
         whiteSpace: 'pre-wrap'
      },
   },
   cells: {
      style: {
        margin: 0
      },
   },
   pagination: {
      style: {
         fontSize: '0.9rem',
         padding: '0',
      }
   },
   subHeaderComponent: {
      style: {
         padding: '0'
      }
   }

}
export { tableCustomStyles };