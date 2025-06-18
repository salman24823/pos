'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ data }) {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        backgroundColor: '#4f46e5',
        borderRadius: 4,
      },
      {
        label: 'Purchases',
        data: data.map(item => item.purchases),
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}