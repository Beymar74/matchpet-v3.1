'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const datosHistoricos = {
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

const botonesModulo7 = [
  { nombre: 'Inicio', ruta: '/admin' },
  { nombre: 'Comparativa', ruta: '/ComparativaAdopciones' },
  { nombre: 'Evolución', ruta: '/EvolucionHistorica' },
  { nombre: 'Región', ruta: '/ActividadRegion' },
  { nombre: 'Favoritos', ruta: '/FavoritosFrecuentes' },
  { nombre: 'Logs', ruta: '/LogsAuditorias' },
];

const EvolucionHistorica = () => {
  const [region, setRegion] = useState("LaPaz");
  const [refugio, setRefugio] = useState("Refugio Esperanza");
  const [busqueda, setBusqueda] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const refugiosDisponibles = Object.keys(datosHistoricos[region] || {});
  const perros = datosHistoricos?.[region]?.[refugio]?.Perro || { anios: [], valores: [] };
  const gatos = datosHistoricos?.[region]?.[refugio]?.Gato || { anios: [], valores: [] };

  const totalPerros = perros.valores.reduce((a, b) => a + b, 0);
  const totalGatos = gatos.valores.reduce((a, b) => a + b, 0);
  const diferencia = totalPerros - totalGatos;
  const porcentajeGatos = ((totalGatos / (totalPerros + totalGatos)) * 100).toFixed(1);

  const data = {
    labels: perros.anios,
    datasets: [
      {
        label: 'Perros',
        data: perros.valores,
        borderColor: '#BF3952',
        backgroundColor: 'rgba(191, 57, 82, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Gatos',
        data: gatos.valores,
        borderColor: '#30588C',
        backgroundColor: 'rgba(48, 88, 140, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">

        {/* Botones navegación módulo */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {botonesModulo7.map((btn, i) => (
            <Link
              key={i}
              href={btn.ruta}
              className={`px-3 py-1 text-sm rounded-full transition font-medium ${
                btn.nombre === 'Evolución'
                  ? 'bg-[#30588C] text-white'
                  : 'bg-[#BF3952] text-white hover:bg-[#a82f46]'
              }`}
            >
              {btn.nombre}
            </Link>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#30588C] mb-4">
          Evolución Histórica de Adopciones
        </h1>
        <p className="text-center text-base text-gray-600 mb-6">
          Observa la evolución anual de adopciones de perros y gatos por refugio.
        </p>

        {/* Barra de búsqueda encima */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar refugio..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setMostrarSugerencias(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const match = refugiosDisponibles.find(r =>
                  r.toLowerCase().includes(busqueda.toLowerCase())
                );
                if (match) {
                  setRefugio(match);
                  setBusqueda('');
                  setMostrarSugerencias(false);
                }
              }
            }}
            className="w-full md:w-1/2 mx-auto block p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-purple-200"
          />
          {mostrarSugerencias && busqueda && (
            <ul className="absolute left-0 right-0 md:left-1/4 md:right-1/4 bg-white w-full md:w-1/2 mx-auto mt-1 rounded-md shadow-md border max-h-40 overflow-y-auto z-10">
              {refugiosDisponibles
                .filter(r => r.toLowerCase().includes(busqueda.toLowerCase()))
                .map((r) => (
                  <li
                    key={r}
                    className="p-2 hover:bg-[#BF3952]/20 cursor-pointer text-[#011526]"
                    onClick={() => {
                      setRefugio(r);
                      setBusqueda('');
                      setMostrarSugerencias(false);
                    }}
                  >
                    {r}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Filtros y tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filtro región */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="LaPaz">Región La Paz</option>
            </select>
          </div>

          {/* Totales */}
          <div className="flex items-center justify-between bg-[#BF3952]/10 border-l-4 border-[#BF3952] p-4 rounded-lg shadow text-[#BF3952] font-medium">
            🐶 Perros: <span className="ml-2 font-bold">{totalPerros}</span>
          </div>
          <div className="flex items-center justify-between bg-[#30588C]/10 border-l-4 border-[#30588C] p-4 rounded-lg shadow text-[#30588C] font-medium">
            🐱 Gatos: <span className="ml-2 font-bold">{totalGatos}</span>
          </div>
        </div>

        {/* Diferencia */}
        <div className="w-full md:w-1/3 mx-auto mb-6">
          <div className="flex items-center justify-between bg-[#011526] text-white p-4 rounded-lg shadow border-l-4 border-[#011526] font-medium">
            📊 Diferencia: <span className="ml-2 font-bold">+{diferencia}</span>
          </div>
        </div>

        {/* Resumen textual */}
        <p className="text-center text-base text-[#254559] italic font-medium mb-4">
          En <strong>{refugio}</strong> ({region}), el {porcentajeGatos}% de las adopciones corresponden a gatos.
        </p>

        {/* Gráfico */}
        <div className="w-full min-h-[300px] bg-white rounded-lg border border-gray-200">
          <Line data={data} options={options} />
        </div>
      </div>
    </main>
  );
};

export default EvolucionHistorica;