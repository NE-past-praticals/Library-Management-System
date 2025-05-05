import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BooksChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Books Added',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(22,119,255,0.7)',
        borderRadius: 6,
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Card style={{ borderRadius: 16, marginBottom: 24 }}>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Books Added Per Date', color: '#1677ff', font: { size: 18 } },
          },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#e0eafc' }, beginAtZero: true, ticks: { stepSize: 1 } },
          },
        }} />
      </Card>
    </motion.div>
  );
};

export default BooksChart;
