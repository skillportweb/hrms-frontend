import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UserHolidayChart() {
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Leaves Taken',
        data: [2, 1, 3, 2, 4, 1, 2, 2, 1, 3, 2, 1],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  return (
    <div className="w-full ">
      <h2 className="pb-5 pl-2 text-lg font-semibold">User Holiday Chart</h2>

      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <Bar data={data} options={config.options} />
      </div>
    </div>
  );
}
