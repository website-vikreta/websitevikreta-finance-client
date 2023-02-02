const tableCustomStyles = {
   rows: {
      style: {
         fontSize: '1rem',
         padding: '10px 0',
         '&:nth-of-type(even)': { backgroundColor: 'rgba(119, 0, 255, 5%)' },
      },
   },
   headCells: {
      style: {
         fontSize: '1rem',
         padding: '10px .9rem',
         backgroundColor: '#7700ff',
         color: '#FFFFFF',
      },
   },
   cells: {
      style: {
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