import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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


const LineChart = ({items}) => {

  const [Data, setData] = useState({ labels: [], monthlyIncome: [], monthlyExpense: [], monthlyProfit: [] });

  useEffect(() => {
    const getAllItems = async () => {
      
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);

      let res_data = response.data;
      const yearTotal = getTotalYears(res_data);
      res_data.sort((item1, item2) => {return new Date(item1.dateOfInvoice) - new Date(item2.dateOfInvoice)});
    
      let labels = getLabels(yearTotal);
     
      let monthlyIncome = getThisYear(res_data, 'Income', yearTotal);
      let monthlyExpense = getThisYear(res_data, 'Expense', yearTotal);
     
      const monthlyProfit = getProfit(monthlyIncome, monthlyExpense, yearTotal);
      setData({ labels, monthlyIncome, monthlyExpense, monthlyProfit });
      
    }
    getAllItems();

  },[items]);
 

  function getLabels(yearTotal){
   
    let labels = [];
    for(var i=0; i<yearTotal.length; i++){
      let y = yearTotal[i]%200;
      labels.push("Jan"+y, "May"+y, "June"+y, "July"+y, "Aug"+y, "Sept"+y, "Oct"+y, "Nov"+y, "Dec"+y);
    }
   
    return labels;
  }

  function getTotalYears(items) {
    var yearTotal = [];
    for (var i = 0; i < items.length; i++) {
      let year = new Date(items[i].dateOfInvoice).getFullYear();
      if (!yearTotal.includes(year)) {
        yearTotal.push(year)
      }
    }
    yearTotal.sort()
    return yearTotal;
  }

  function getThisYear(items, paymentType, yearTotal) {
    var monthTotal = Array.from({ length: yearTotal.length*12 }, () => { return 0 });
    for(var year=0; year<yearTotal.length; year++){
      for(var item=0; item<items.length; item++){
        if ((yearTotal[year] === new Date(items[item].dateOfInvoice).getFullYear()) && items[item].paymentType === paymentType) {
          let currMonth = year * 12 + (new Date(items[item].dateOfInvoice).getMonth());
          monthTotal[currMonth] += items[item].amount;
        }
      }
    }
    return monthTotal;
  }
  function getProfit(monthlyIncome, monthlyExpense, yearTotal) {
    var monthTotal = Array.from({ length: yearTotal.length * 12 }, () => { return 0 });
    for (var i = 0; i < monthlyIncome.length; i++) {
      monthTotal[i] = monthlyIncome[i] - monthlyExpense[i];
    }
    return monthTotal;
  }


  var data = {
    labels: Data.labels,
    datasets: [{
      label: 'Income',
      data: Data.monthlyIncome,
      backgroundColor: ' #e4ccff',
      borderColor: '#7700ff',
      
      borderWidth: 1
    },
    {
      label: 'Epense',
      data: Data.monthlyExpense,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      
      borderColor: 'rgba(54, 162, 235, 1)',
     
      borderWidth: 1
    },
    {
      label: 'Profit',
      data: Data.monthlyProfit,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
    
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
      <div>
        <span> <strong>This Year Monthly Data</strong> </span>
      </div>
      <div>
        <Line
          data={data}
          height={400}
          options={options}

        />
      </div>
    </div>
  )
}

export default LineChart