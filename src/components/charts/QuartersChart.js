import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getItems } from '../../api';
import { Box, CircularProgress } from '@mui/material';
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
            let res = localStorage.getItem('user-info');
            let response = await getItems(JSON.parse(res).id);
            let thisYear = new Date();
            let currData = [];
            let quarter = getQuarter(thisYear.getMonth() + 1);
            console.log(quarter, thisYear)
            let incomeTotal = getTotal(response.data, 'Income', thisYear, quarter);
            let expenseTotal = getTotal(response.data, 'Expense', thisYear, quarter);
            let profitTotal = getProfit(incomeTotal, expenseTotal);
            currData.push(getLabels(thisYear, quarter))
            currData.push(incomeTotal);
            currData.push(expenseTotal);
            currData.push(profitTotal);
            setData(currData);

        }
        getAllItems();
    }, [items]);


    function getProfit(incomeTotal, expenseTotal) {
        var profitTotal = Array.from({ length: 4 }, () => { return 0 });
        for (var i = 0; i < incomeTotal.length; i++) {
            let profit = incomeTotal[i] - expenseTotal[i];
            profitTotal[i] = profit > 0 ? profit : 0;

        }
        return profitTotal;
    }


    function getTotal(items, paymentType, thisYear, quarter) {
        var total = Array.from({ length: 4 }, () => { return 0 });
        
        for (var item = 0; item < items.length; item++) {
            let currentItem = items[item];
            let currentDate = new Date(currentItem.dateOfInvoice);
            let currentMonth = currentDate.getMonth() + 1;

            if (quarter === 4) {
                if (currentDate.getFullYear() === (thisYear.getFullYear() - 1)) {
                    if (currentMonth >= 4 && currentMonth <= 6) {

                        total[0] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    } else if (currentMonth >= 7 && currentMonth <= 9) {
                        total[1] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    } else if (currentMonth >= 10 && currentMonth <= 12) {
                        total[2] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    }
                } else if (currentDate.getFullYear() === thisYear.getFullYear()) {
                    if (currentMonth <= 3) {
                        total[3] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    }
                }
            } else {
                if (currentDate.getFullYear() === thisYear.getFullYear()) {
                    if (currentMonth >= 4 && currentMonth <= 6) {
                        total[0] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    } else if (currentMonth >= 7 && currentMonth <= 9) {
                        total[1] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    } else if (currentMonth >= 10 && currentMonth <= 12) {
                        total[2] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    }
                } else if (currentDate.getFullYear() === thisYear.getFullYear() + 1) {
                    if (currentMonth <= 3) {
                        total[3] += currentItem.paymentType === paymentType ? currentItem.amount : 0;
                    }
                }
            }
        }

        return total;
    }

    function getLabels(thisYear, quarter) {
        let year = thisYear.getFullYear() % 200;
        let labels = [];
        if (quarter === 4) {
            labels.push('APR' + (year - 1) + '-JUN' + (year - 1), 'JUL' + (year - 1) + '-SEPT' + (year - 1), 'OCT' + (year - 1) + '-DEC' + (year - 1), 'JAN' + year + '-MAR' + year);
            return labels;
        }

        labels.push('APR' + year + '-JUN' + year, 'JUL' + year + '-SEPT' + year, 'OCT' + year + '-DEC' + year, 'JAN' + (year + 1) + '-MAR' + (year + 1));
        return labels;
    }

    function getQuarter(month) {
        if (month >= 4 && month <= 6) return 1;
        else if (month >= 7 && month <= 9) return 2;
        else if (month >= 10 && month <= 12) return 3;
        else return 4;
    }



    var data = {
        labels: Data[0],
        datasets: [
            {
                label: "Income",
                data: Data[1],
               
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: "Expense",
                data: Data[2],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: "Profit",
                data: Data[3],
                
                backgroundColor: ' #e4ccff',
                borderColor: '#7700ff',

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
                <span> <strong>Quarterly Growth</strong> </span>
            </div>
            {Data.length === 0 ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                Loading... &nbsp;
                <CircularProgress />
            </Box> :
                <div>
                    <Bar
                        data={data}
                        height={400}
                        options={options}

                    />
                </div>

            }
        </div>
    )
}


export default QuartersChart;