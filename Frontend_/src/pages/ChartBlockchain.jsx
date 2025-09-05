import React from "react";
import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartBlockchain({ resumen }) {
  const data = {
    labels: resumen.map(item => item.nombre),
    datasets: [
      {
        label: 'Votos',
        data: resumen.map(item => item.votos),
        backgroundColor: '#3f72af',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Votos por Candidato', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
      x: { ticks: { font: { size: 12 } } }
    },
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ height: 260, width: '100%', mt: 2 }}>
      <Bar data={data} options={options} />
    </Box>
  );
}
