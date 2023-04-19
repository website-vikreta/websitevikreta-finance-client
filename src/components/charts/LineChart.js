import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getItems } from "../../api";
import { Box, CircularProgress } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ items }) => {
  const [Data, setData] = useState({
    labels: null,
    monthlyIncome: null,
    monthlyExpense: null,
    monthlyProfit: null,
  });
  var [yearSince, setYearSince] = useState({
    month: "Mar",
    year: new Date().getFullYear() % 100,
  });
  useEffect(() => {
    function getData(monthlyIncome, monthlyExpense, yearTotal, labels) {
      let i = 0;
      while (monthlyIncome[i] === 0 && monthlyExpense[i] === 0) {
        i++;
      }
      monthlyIncome.splice(0, i);
      monthlyExpense.splice(0, i);
      let monthlyProfit = Array.from({ length: yearTotal.length * 12 }, () => {
        return 0;
      });
      for (var ii = 0; ii < monthlyIncome.length; ii++) {
        let profit = monthlyIncome[ii] - monthlyExpense[ii];
        monthlyProfit[ii] = profit > 0 ? profit : 0;
      }

      labels.splice(0, i);

      if (labels.length !== 0) {
        var year = labels[0].match(/\d+/g);
        var month = labels[0].match(/[a-zA-Z]+/g);
        // console.log(year[0])
        // if(!months.includes(month[0])) setYearSince({month:month[0],year: ++year[0]});
        setYearSince({ month: month, year: year[0] });
      }
      return [labels, monthlyIncome, monthlyExpense, monthlyProfit];
    }

    const getAllItems = async () => {
      let res = localStorage.getItem("user-info");
      let response = await getItems(JSON.parse(res).id);

      let res_data = response.data;
      let yearTotal = getTotalYears(res_data);
      res_data.sort((item1, item2) => {
        return new Date(item1.dateOfInvoice) - new Date(item2.dateOfInvoice);
      });

      let labels = getLabels(yearTotal);

      let monthlyIncome = getThisYear(res_data, "Income", yearTotal);
      let monthlyExpense = getThisYear(res_data, "Expense", yearTotal);
      let data = getData(monthlyIncome, monthlyExpense, yearTotal, labels);

      setData(data);
    };
    getAllItems();
  }, [items]);

  function getLabels(yearTotal) {
    let labels = [];
    for (var i = 0; i < yearTotal.length; i++) {
      let y = yearTotal[i] % 200;
      labels.push(
        "Jan" + y,
        "Feb" + y,
        "Mar" + y,
        "Apr" + y,
        "May" + y,
        "June" + y,
        "July" + y,
        "Aug" + y,
        "Sept" + y,
        "Oct" + y,
        "Nov" + y,
        "Dec" + y
      );
    }

    return labels;
  }

  function getTotalYears(items) {
    var yearTotal = [];
    for (var i = 0; i < items.length; i++) {
      let year = new Date(items[i].dateOfInvoice).getFullYear();
      if (!yearTotal.includes(year)) {
        yearTotal.push(year);
      }
    }
    yearTotal.sort();
    return yearTotal;
  }

  function getThisYear(items, paymentType, yearTotal) {
    var monthTotal = Array.from({ length: yearTotal.length * 12 }, () => {
      return 0;
    });
    for (var year = 0; year < yearTotal.length; year++) {
      for (var item = 0; item < items.length; item++) {
        if (
          yearTotal[year] ===
            new Date(items[item].dateOfInvoice).getFullYear() &&
          items[item].paymentType === paymentType
        ) {
          let currMonth =
            year * 12 + new Date(items[item].dateOfInvoice).getMonth();
          monthTotal[currMonth] += items[item].amount;
        }
      }
    }

    return monthTotal;
  }

  var data = {
    labels: Data[0],
    datasets: [
      {
        label: "Income",
        data: Data[1],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: Data[2],

        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",

        borderWidth: 1,
      },
      {
        label: "Profit",
        data: Data[3],
        backgroundColor: " #e4ccff",
        borderColor: "#7700ff",

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
        <span>
          {" "}
          <strong>
            Month on Month Growth since {yearSince.month + "" + yearSince.year}
          </strong>{" "}
        </span>
      </div>
      {Data.labels === null ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Line data={data} height={400} options={options} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
