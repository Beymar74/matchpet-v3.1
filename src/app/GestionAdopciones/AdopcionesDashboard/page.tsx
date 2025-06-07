'use client';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const adopcionesMensuales = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
  datasets: [{
    label: 'Adopciones',
    data: [5, 8, 6, 10, 7],
    backgroundColor: 'rgba(75,192,192,0.6)',
  }],
};

const razonesRechazo = {
  labels: ['Incompatibilidad', 'Falta de espacio', 'Otros'],
  datasets: [{
    label: 'Razones',
    data: [3, 2, 1],
    backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
  }],
};

export default function AdopcionesDashboard() {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-bold">Métricas de Adopciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Adopciones por Mes</h3>
          <Bar data={adopcionesMensuales} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Razones de Rechazo</h3>
          <Pie data={razonesRechazo} />
        </div>
      </div>
    </div>
  );
}