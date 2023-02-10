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

const QuartersChart = ({ items }) => {

    const [Data, setData] = useState([]);

    useEffect(() => {
        const getAllItems = async () => {
            document.title = 'Home | WV Finance'
            let res = localStorage.getItem('user-info');
            let response = await getItems(JSON.parse(res).id);
            let currData = [];
            let thisYear = new Date();
            const incomeTotal = getTotal(response.data, 'Income', thisYear);
            const expenseTotal = getTotal(response.data, 'Expense', thisYear);
            const profitTotal = getProfit(incomeTotal, expenseTotal);
            const labels = getLabels(thisYear);
            currData.push(labels);
            currData.push(incomeTotal);
            currData.push(expenseTotal);
            currData.push(profitTotal);
            setData(currData);

        }
        getAllItems();
    }, [items]);

    function getLabels(thisYear){
        let year = thisYear.getFullYear()%200;
        let labels = [];
        labels.push('MAR'+year+'-MAY'+year, 'JUN'+year+'-AUG'+year, 'SEPT'+year+'-NOV'+year,'DEC'+(year-1)+'-FEB'+year);
        return labels;
    }

    function getTotal(items, paymentType, thisYear) {
        var total = Array.from({ length: 4 }, () => { return 0 });

        for (var item = 0; item < items.length; item++) {
            let currentItem = items[item];
            let currentDate = new Date(currentItem.dateOfInvoice);
            let currentMonth = currentDate.getMonth() + 1;
            
            if (currentDate.getFullYear() === thisYear.getFullYear()) {
               
                if (currentMonth >= 3 && currentMonth <= 5) {
                    console.log(currentMonth)
                    total[0] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                } else if (currentMonth >= 6 && currentMonth <= 8) {
                    total[1] += currentItem.paymentType === paymentType ? currentItem.amount : 0;

                } else if (currentMonth >= 9 && currentMonth <= 11) {
                    total[2] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                } else if (currentMonth <= 2) {
                    total[3] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                }
            } else if (currentDate.getFullYear() === (thisYear.getFullYear() - 1) && currentMonth >= 12) {
                total[3] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
            }
        }
        return total;
    }
    function getProfit(incomeTotal, expenseTotal) {
        var profitTotal = Array.from({ length: incomeTotal.length }, () => { return 0 });
        for (var i = 0; i < incomeTotal.length; i++) {
            let profit = incomeTotal[i] - expenseTotal[i]; 
            profitTotal[i] =  profit > 0 ? profit: 0;
            
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

export default QuartersChart;