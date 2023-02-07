import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getItems } from '../../api';

import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = () => {
  
  const [Data, setData] = useState([]);
 
  useEffect(() => {
    const getAllItems = async () => {
        document.title = 'Home | WV Finance'
        let res = localStorage.getItem('user-info');
        let response = await getItems(JSON.parse(res).id);
        let thisYear = new Date().getFullYear();
        let currData = [];
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

  var data = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Profit',
      data: Data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
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
      <Pie
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default PieChart;