import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { getItems } from '../../api';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
 
  const [Data, setData] = useState({monthlyIncome: [], monthlyExpense: [], monthlyProfit: []});
 
  useEffect(() => {
    const getAllItems = async () => {
      document.title = 'Home | WV Finance'
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      let thisYear = new Date();
      let currData = [];
     
      currData.push(getThisYear(response.data, 'Income', thisYear));
      currData.push(getThisYear(response.data, 'Expense', thisYear));
      const monthlyIncome = getThisYear(response.data, 'Income', thisYear); 
      const monthlyExpense = getThisYear(response.data, 'Expense', thisYear);
      const monthlyProfit = getProfit(monthlyIncome, monthlyExpense);
      setData({monthlyIncome, monthlyExpense, monthlyProfit});
      
    }
    getAllItems();

  }, []);

  
 
  function getThisYear(items, paymentType, thisYear) {
    var monthTotal = Array.from({length: 12}, () => {return 0});
    for (var item=0; item<items.length; item++) {
      if((thisYear.getFullYear() === new Date(items[item].dateOfInvoice).getFullYear()) && items[item].paymentType === paymentType){
        let currMonth = new Date(items[item].dateOfInvoice).getMonth();
        monthTotal[currMonth] += items[item].amount;
      }
    }
    return monthTotal;
  }
  function getProfit(monthlyIncome, monthlyExpense) {
    var monthTotal = Array.from({length: 12}, () => {return 0});
    for (var i=0; i<monthlyIncome.length; i++) {
        monthTotal[i] = monthlyIncome[i]-monthlyExpense[i];
    }
    return monthTotal;
  }


  var data = {
    labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
    datasets: [{
      label: 'Income',
      data: Data.monthlyIncome,
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
    },
    {
      label: 'Epense',
      data: Data.monthlyExpense,
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
    },
    {
      label: 'Profit',
      data: Data.monthlyProfit,
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
      <Line
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default LineChart