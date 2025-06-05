'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Datos simulados (igual que antes)
const datosFicticios = {
  "2025": {
    "LaPaz": {
      "Refugio Esperanza": {
        "Perro": [
          { mes: 'Ene', adopciones: 5 }, { mes: 'Feb', adopciones: 9 }, { mes: 'Mar', adopciones: 6 },
          { mes: 'Abr', adopciones: 7 }, { mes: 'May', adopciones: 4 }, { mes: 'Jun', adopciones: 8 },
          { mes: 'Jul', adopciones: 10 }, { mes: 'Ago', adopciones: 11 }, { mes: 'Sep', adopciones: 9 },
          { mes: 'Oct', adopciones: 13 }, { mes: 'Nov', adopciones: 7 }, { mes: 'Dic', adopciones: 9 },
        ],
        "Gato": [
          { mes: 'Ene', adopciones: 3 }, { mes: 'Feb', adopciones: 5 }, { mes: 'Mar', adopciones: 4 },
          { mes: 'Abr', adopciones: 6 }, { mes: 'May', adopciones: 2 }, { mes: 'Jun', adopciones: 4 },
          { mes: 'Jul', adopciones: 7 }, { mes: 'Ago', adopciones: 6 }, { mes: 'Sep', adopciones: 5 },
          { mes: 'Oct', adopciones: 8 }, { mes: 'Nov', adopciones: 6 }, { mes: 'Dic', adopciones: 7 },
        ],
      },
      "Refugio Huellitas": {
        "Perro": [
          { mes: 'Ene', adopciones: 6 }, { mes: 'Feb', adopciones: 7 }, { mes: 'Mar', adopciones: 8 },
          { mes: 'Abr', adopciones: 9 }, { mes: 'May', adopciones: 6 }, { mes: 'Jun', adopciones: 10 },
          { mes: 'Jul', adopciones: 11 }, { mes: 'Ago', adopciones: 13 }, { mes: 'Sep', adopciones: 10 },
          { mes: 'Oct', adopciones: 14 }, { mes: 'Nov', adopciones: 12 }, { mes: 'Dic', adopciones: 15 },
        ],
        "Gato": [
          { mes: 'Ene', adopciones: 2 }, { mes: 'Feb', adopciones: 3 }, { mes: 'Mar', adopciones: 4 },
          { mes: 'Abr', adopciones: 5 }, { mes: 'May', adopciones: 3 }, { mes: 'Jun', adopciones: 5 },
          { mes: 'Jul', adopciones: 6 }, { mes: 'Ago', adopciones: 7 }, { mes: 'Sep', adopciones: 5 },
          { mes: 'Oct', adopciones: 8 }, { mes: 'Nov', adopciones: 7 }, { mes: 'Dic', adopciones: 6 },
        ],
      },
    },
  },
};

const ComparativaAdopciones = () => {
  const [anio, setAnio] = useState("2025");
  const [region, setRegion] = useState("LaPaz");
  const [refugio, setRefugio] = useState("Refugio Esperanza");
  const [tipoMascota, setTipoMascota] = useState("Perro");

  const datos = (datosFicticios as any)?.[anio]?.[region]?.[refugio]?.[tipoMascota] || [];

  return (
    <main className="min-h-screen bg-[#011526] py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#30588C]">
        <h1 className="text-3xl font-bold text-center text-[#BF3952] mb-4">
          Comparativa de Adopciones
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
          Visualiza las adopciones mensuales por tipo de mascota, región y refugio. Personaliza la vista con los filtros disponibles.
        </p>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <select
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="p-2 border border-[#30588C] text-sm rounded-lg text-[#254559] focus:ring-[#6093BF]"
          >
            <option value="2025">Año 2025</option>
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2 border border-[#30588C] text-sm rounded-lg text-[#254559] focus:ring-[#6093BF]"
          >
            <option value="LaPaz">Región La Paz</option>
          </select>
          <select
            value={refugio}
            onChange={(e) => setRefugio(e.target.value)}
            className="p-2 border border-[#30588C] text-sm rounded-lg text-[#254559] focus:ring-[#6093BF]"
          >
            <option value="Refugio Esperanza">Refugio Esperanza</option>
            <option value="Refugio Huellitas">Refugio Huellitas</option>
          </select>
          <select
            value={tipoMascota}
            onChange={(e) => setTipoMascota(e.target.value)}
            className="p-2 border border-[#30588C] text-sm rounded-lg text-[#254559] focus:ring-[#6093BF]"
          >
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
        </div>

        {/* Gráfico */}
        <div className="w-full h-[380px] bg-[#f9fafb] rounded-xl border border-[#6093BF] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" stroke="#254559" />
              <YAxis stroke="#254559" />
              <Tooltip />
              <Legend />
              <Bar dataKey="adopciones" fill="#BF3952" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default ComparativaAdopciones;
