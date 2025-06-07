// src/pages/GestionAdopciones/EstadisticasDashboard.tsx
'use client';
import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const meses2025 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

const adopcionesMensuales = {
  labels: meses2025,
  datasets: [
    {
      label: 'Número de Adopciones',
      data: [5, 8, 6, 10, 7],
      backgroundColor: 'rgba(75,192,192,0.6)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      borderRadius: 5,
    },
  ],
};

const razonesRechazo = {
  labels: ['Incompatibilidad', 'Falta de espacio', 'Otros'],
  datasets: [
    {
      label: 'Razones de Rechazo',
      data: [3, 2, 1],
      backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};

const opcionesBarra: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Adopciones por Mes (2025)',
      color: '#30588C',
      font: { size: 16, weight: 'bold' },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Cantidad de Adopciones',
        color: '#30588C',
        font: { size: 14 },
      },
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Meses',
        color: '#30588C',
        font: { size: 14 },
      },
    },
  },
};

const opcionesPie: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#30588C',
        font: { size: 12 },
      },
    },
    title: {
      display: true,
      text: 'Principales Razones de Rechazo en Adopciones',
      color: '#30588C',
      font: { size: 16, weight: 'bold' },
    },
  },
};

export default function EstadisticasDashboard() {
  const [anioSeleccionado] = useState('2025');

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#F7C59F] to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-[#30588C] dark:text-[#7FB9C2] mb-6">
        Métricas de Adopciones
      </h2>
      <div className="flex justify-center mb-8">
        <select className="px-3 py-2 rounded border bg-white dark:bg-gray-700 text-gray-800 dark:text-white cursor-not-allowed" disabled>
          <option value="2025">Año 2025</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border dark:border-gray-700 h-[400px]">
          <Bar data={adopcionesMensuales} options={opcionesBarra} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border dark:border-gray-700 h-[400px]">
          <Pie data={razonesRechazo} options={opcionesPie} />
        </div>
      </div>
    </div>
  );
}
