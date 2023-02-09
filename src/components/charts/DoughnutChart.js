import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getItems } from '../../api';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({items}) => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const getAllItems = async () => {
            let res = localStorage.getItem('user-info');
            let response = await getItems(JSON.parse(res).id);
            let thisYear = new Date();
            let currData = [];
            let thisMonthIncome = getThisMonth(response.data, 'Income', thisYear);
            let thisMonthExpense = getThisMonth(response.data, 'Expense', thisYear);
            let thisMonthProfit = thisMonthIncome - thisMonthExpense;
            currData.push(thisMonthIncome);
            currData.push(thisMonthExpense);
            currData.push(thisMonthProfit);
            setData(currData);
           
        }
        getAllItems();

    },[items]);
   

    function getThisMonth(items, paymentType, thisYear) {
        var total = 0;
        for (var item of items) {
            let currentYear = new Date(item.dateOfInvoice);
            total += (thisYear.getFullYear() === currentYear.getFullYear() && thisYear.getMonth() === currentYear.getMonth()) && item.paymentType === paymentType ? item.amount : 0;
        }
        return total;
    }

    var data = {
        labels: ['Income', 'Expense', 'Profit'],
        datasets: [{
            label: 'Amount',
            data: Data,
            backgroundColor: [
                '#e4ccff',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                '#7700ff',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
            <div> 
                <span> <strong>This Month</strong> </span>
            </div>
            <div>
                <Doughnut
                    data={data}
                    height={400}
                    options={options}
                />
            </div>
        </div>
    )
}

export default DoughnutChart;