import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const LineChart = ({ chartData }) => {
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        title: {
          display: true,
          text: "Day of the Month",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Color of y-axis grid lines
        },
        ticks: {
          beginAtZero: true, // Start y-axis scale from 0
        },
        title: {
          display: true,
          text: "Total Customer Per Day",
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top", // Legend position
      },
      tooltip: {
        enabled: true, // Show tooltip on hover
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
export default LineChart;
