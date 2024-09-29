import React from 'react';
import { Bar } from 'react-chartjs-2';

const ScreenTimeGraph = ({ screenTimeData }) => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Non-Toxic Screen Time',
        data: screenTimeData.map(day => day.nonToxic),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Toxic Screen Time',
        data: screenTimeData.map(day => day.toxic),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    stacked: true,  // Enables stacked bars
  };

  return (
    <div>
      <h2>Weekly Screen Time Usage</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScreenTimeGraph;