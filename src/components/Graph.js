import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const LineChart = () => {
  // Sample data for the chart
  const data = {
    labels: [
      "2024-10-01",
      "2024-10-04",
      "2024-10-07",
      "2024-10-10",
      "2024-10-13",
    ],
    datasets: [
      {
        label: "Parameter 0",
        data: [0, 1, 0, 2, 1],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1, // For a smooth line
      },
      {
        label: "Parameter 1",
        data: [1, 2, 1, 0, 2],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "Parameter 2",
        data: [2, 0, 1, 1, 0],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart Example",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
