import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getItems } from '../../api';


ChartJS.register( BarElement);

const BarChart = () => {
  
  const [Data, setData] = useState([]);
 
  useEffect(() => {
    const getAllItems = async () => {
        document.title = 'Home | WV Finance'
        let res = localStorage.getItem('user-info');
        let response = await getItems(JSON.parse(res).id);
        let thisYear = new Date().getFullYear();
        let currData = [];
        console.log((response.data), 'ssssssssssssssssss')
        currData.push(getThisYear(response.data, 'Income', thisYear));
        currData.push(getThisYear(response.data, 'Expense', thisYear));
        setData(currData);
    }
    getAllItems();
  }, []);
  
      function getThisYear(items, paymentType, thisYear) {
          var total = 0;
          for (var item of items) {
              total += (thisYear === new Date(item.dateOfInvoice).getFullYear()) && item.paymentType === paymentType ? item.amount : 0;
          }
          return total;
      }

      console.log(Data)
  var data = {
    labels: [2021, 2022, 2023],
    datasets: [{
      label: 'Income',
      data: [2000, 3000, 1500],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Expense',
      data: [1500, 2000, 2500],
      backgroundColor: 'rgba(255, 99, 132, 1.2)',
     
      borderColor:  'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    },
    {
      label: 'Profit',
      data: [1500, 2000, 2500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor:  'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }
  ]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default BarChart;