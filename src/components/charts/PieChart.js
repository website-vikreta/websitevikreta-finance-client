import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, CircularProgress } from '@mui/material';
import { getItems } from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ items }) => {
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear() % 100);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        let res = localStorage.getItem('user-info');
        let response = await getItems(JSON.parse(res).id);
        let thisYear = new Date();
        let currData = [];
        currData.push(getThisYear(response.data, 'Income', thisYear));
        currData.push(getThisYear(response.data, 'Expense', thisYear));
        setData(currData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllItems();
  }, [items]);

  useEffect(() => {
    const year = new Date();
    if (year.getMonth() < 3) {
      setCurrentYear((year.getFullYear() - 1) % 100);
    }
  }, []); // Run only once on mount

  function getThisYear(items, paymentType, thisYear) {
    var total = 0;
    for (var item of items) {
      let itemDate = new Date(item.dateOfInvoice);
      if (thisYear.getMonth() < 3) {
        if (
          (thisYear.getFullYear() === itemDate.getFullYear() && itemDate.getMonth() < 3) ||
          (itemDate.getFullYear() === thisYear.getFullYear() - 1 && itemDate.getMonth() >= 3)
        )
          total += item.paymentType === paymentType ? item.amount : 0;
      }

      if (thisYear.getMonth() >= 3) {
        if (
          (thisYear.getFullYear() === itemDate.getFullYear() && itemDate.getMonth() >= 3) ||
          (itemDate.getFullYear() === thisYear.getFullYear() + 1 && itemDate.getMonth() < 3)
        )
          total += item.paymentType === paymentType ? item.amount : 0;
      }
    }
    return total;
  }

  var chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: data,
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', ' #e4ccff'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', '#7700ff'],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <div>
        <span> <strong>This Year (APR{currentYear}-MAR{currentYear + 1})</strong> </span>
      </div>
      {data.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Pie data={chartData} height={400} options={options} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
