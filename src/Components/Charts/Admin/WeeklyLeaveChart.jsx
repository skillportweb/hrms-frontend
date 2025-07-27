import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function WeeklyLeaveChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Employees on Leave',
        data: [3, 5, 2, 4, 1],
        borderColor: '#42A5F5',
        backgroundColor: '#BBDEFB',
        pointStyle: 'rectRot',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-slate-50 text-center" style={{ maxWidth: '600px', height: '400px', margin: '0 auto' }}>
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Weekly Leave Distribution
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}
