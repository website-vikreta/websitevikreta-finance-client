import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getItems } from '../../api';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const BarChart = ({items}) => {

  const [Data, setData] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      document.title = 'Home | WV Finance'
      let res = localStorage.getItem('user-info');
      let response = await getItems(JSON.parse(res).id);
      let currData = [];
      const yearTotal = getTotalYears(response.data);
      currData.push(yearTotal)
      const incomeTotal = getTotal(response.data, 'Income', yearTotal);
      const expenseTotal = getTotal(response.data, 'Expense', yearTotal);
      const profitTotal = getProfit(incomeTotal, expenseTotal);
      currData.push(incomeTotal);
      currData.push(expenseTotal);
      currData.push(profitTotal);
      setData(currData);
     
    }
    getAllItems();
  },[items]);


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

  function getTotal(items, paymentType, totalYears) {
    var total = Array.from({ length: totalYears.length }, () => { return 0 });

    for (var item of items) {
      let thisYear = new Date(item.dateOfInvoice).getFullYear();
      total[totalYears.indexOf(thisYear)] += item.paymentType === paymentType ? item.amount : 0;
    }
    return total;
  }

  function getProfit(incomeTotal, expenseTotal) {
    var profitTotal = Array.from({ length: incomeTotal.length }, () => { return 0 });
    for (var i = 0; i < incomeTotal.length; i++) {
      profitTotal[i] = incomeTotal[i] - expenseTotal[i];
    }
    return profitTotal;
  }


  var data = {
    labels: Data[0],
    datasets: [
      {
        label: "Income",
        data: Data[1],
        backgroundColor: ' #e4ccff',
        borderColor: '#7700ff',

        borderWidth: 1
      },
      {
        label: "Expense",
        data: Data[2],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: "Profit",
        data: Data[3],
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
        <span> <strong>Overall Summary</strong> </span>
      </div>
      <div>
        <Bar
          data={data}
          height={400}
          options={options}

        />
      </div>
    </div>
  )
}

export default BarChart;