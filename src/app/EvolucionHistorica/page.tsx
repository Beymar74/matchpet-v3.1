'use client';

import { useState } from 'react';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
type DatosHistoricos = {
  [region: string]: {
    [refugio: string]: {
      Perro: {
        anios: number[];
        valores: number[];
      };
      Gato: {
        anios: number[];
        valores: number[];
      };
    };
  };
};
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Datos simulados
const datosHistoricos: DatosHistoricos = {
  LaPaz: {
    "Refugio Esperanza": {
      Perro: { anios: [2020, 2021, 2022, 2023, 2024], valores: [45, 50, 65, 80, 90] },
      Gato: { anios: [2020, 2021, 2022, 2023, 2024], valores: [20, 25, 35, 42, 55] },
    },
    "Refugio Huellitas": {
      Perro: { anios: [2020, 2021, 2022, 2023, 2024], valores: [30, 40, 50, 60, 75] },
      Gato: { anios: [2020, 2021, 2022, 2023, 2024], valores: [15, 18, 22, 30, 40] },
    }
  }
};

const EvolucionHistorica = () => {
  const [region, setRegion] = useState("LaPaz");
  const [refugio, setRefugio] = useState("Refugio Esperanza");

  const perros = (datosHistoricos as any)?.[region]?.[refugio]?.Perro || { anios: [], valores: [] };
const gatos = (datosHistoricos as any)?.[region]?.[refugio]?.Gato || { anios: [], valores: [] };
const totalPerros = Array.isArray(perros.valores)
  ? perros.valores.reduce((sum: number, val: number) => sum + Number(val), 0)
  : 0;

const totalGatos = Array.isArray(gatos.valores)
  ? gatos.valores.reduce((sum: number, val: number) => sum + Number(val), 0)
  : 0;

  const diferencia = totalPerros - totalGatos;
  const porcentajeGatos = ((totalGatos / (totalPerros + totalGatos)) * 100).toFixed(1);

  const data = {
    labels: perros.anios,
    datasets: [
      {
        label: 'Perros',
        data: perros.valores,
        borderColor: '#e91e63',
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Gatos',
        data: gatos.valores,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
            Evolución Histórica de Adopciones
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Observa la evolución anual de adopciones de perros y gatos por refugio.
          </p>

          {/* Contenedor filtros + resumen */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Filtros a la izquierda */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="LaPaz">Región La Paz</option>
              </select>

              <select
                value={refugio}
                onChange={(e) => setRefugio(e.target.value)}
                className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-purple-200"
              >
                <option value="Refugio Esperanza">Refugio Esperanza</option>
                <option value="Refugio Huellitas">Refugio Huellitas</option>
              </select>
            </div>

            {/* Totales a la derecha */}
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-pink-100 border-l-4 border-pink-500 p-4 rounded-lg shadow">
                🐶 <strong className="text-pink-600">Perros:</strong> {totalPerros}
              </div>
              <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 rounded-lg shadow">
                🐱 <strong className="text-indigo-600">Gatos:</strong> {totalGatos}
              </div>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow">
                📊 <strong className="text-purple-600">Diferencia:</strong> {diferencia >= 0 ? '+' : ''}{diferencia}
              </div>
            </div>
          </div>

          {/* Texto contextual */}
          <p className="text-center text-sm text-gray-500 italic mb-4">
            En <strong>{refugio}</strong> ({region}), el {porcentajeGatos}% de las adopciones corresponden a gatos.
          </p>

          {/* Gráfico */}
          <div className="w-full h-[400px] bg-white rounded-lg border border-gray-200">
            <Line data={data} options={options} />
          </div>
        </div>
      </main>
    </>
  );
};

export default EvolucionHistorica;
