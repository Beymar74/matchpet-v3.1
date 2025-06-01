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


// Datos simulados (resumen como antes)
type MascotaMes = {
  mes: string;
  adopciones: number;
};

type TipoMascota = {
  Perro: MascotaMes[];
  Gato: MascotaMes[];
};

type Refugio = {
  [refugio: string]: TipoMascota;
};

type Region = {
  [region: string]: Refugio;
};

type DatosFicticios = {
  [anio: string]: Region;
};
const datosFicticios: Record<string, Record<string, Record<string, Record<string, { mes: string; adopciones: number; }[]>>>> = {
  "2023": {
    "LaPaz": {
      "Refugio Esperanza": {
        "Perro": [
          { mes: 'Ene', adopciones: 5 },
          { mes: 'Feb', adopciones: 9 },
          { mes: 'Mar', adopciones: 6 },
          { mes: 'Abr', adopciones: 7 },
          { mes: 'May', adopciones: 4 },
          { mes: 'Jun', adopciones: 8 },
          { mes: 'Jul', adopciones: 10 },
          { mes: 'Ago', adopciones: 11 },
          { mes: 'Sep', adopciones: 9 },
          { mes: 'Oct', adopciones: 13 },
          { mes: 'Nov', adopciones: 7 },
          { mes: 'Dic', adopciones: 9 },
        ],
        "Gato": [
          { mes: 'Ene', adopciones: 3 },
          { mes: 'Feb', adopciones: 5 },
          { mes: 'Mar', adopciones: 4 },
          { mes: 'Abr', adopciones: 6 },
          { mes: 'May', adopciones: 2 },
          { mes: 'Jun', adopciones: 4 },
          { mes: 'Jul', adopciones: 7 },
          { mes: 'Ago', adopciones: 6 },
          { mes: 'Sep', adopciones: 5 },
          { mes: 'Oct', adopciones: 8 },
          { mes: 'Nov', adopciones: 6 },
          { mes: 'Dic', adopciones: 7 },
        ]
      },
      "Refugio Huellitas": {
        "Perro": [
          { mes: 'Ene', adopciones: 6 },
          { mes: 'Feb', adopciones: 7 },
          { mes: 'Mar', adopciones: 8 },
          { mes: 'Abr', adopciones: 9 },
          { mes: 'May', adopciones: 6 },
          { mes: 'Jun', adopciones: 10 },
          { mes: 'Jul', adopciones: 11 },
          { mes: 'Ago', adopciones: 13 },
          { mes: 'Sep', adopciones: 10 },
          { mes: 'Oct', adopciones: 14 },
          { mes: 'Nov', adopciones: 12 },
          { mes: 'Dic', adopciones: 15 },
        ],
        "Gato": [
          { mes: 'Ene', adopciones: 2 },
          { mes: 'Feb', adopciones: 3 },
          { mes: 'Mar', adopciones: 4 },
          { mes: 'Abr', adopciones: 5 },
          { mes: 'May', adopciones: 3 },
          { mes: 'Jun', adopciones: 5 },
          { mes: 'Jul', adopciones: 6 },
          { mes: 'Ago', adopciones: 7 },
          { mes: 'Sep', adopciones: 5 },
          { mes: 'Oct', adopciones: 8 },
          { mes: 'Nov', adopciones: 7 },
          { mes: 'Dic', adopciones: 6 },
        ]
      }
    }
  }
};

const ComparativaAdopciones = () => {
  const [anio, setAnio] = useState("2023");
  const [region, setRegion] = useState("LaPaz");
  const [refugio, setRefugio] = useState("Refugio Esperanza");
  const [tipoMascota, setTipoMascota] = useState("Perro");

 
 const datos =
  (datosFicticios as any)?.[anio]?.[region]?.[refugio]?.[tipoMascota] || [];
  return (
    <>

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-center text-pink-600 mb-4">
            Comparativa de Adopciones
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Analiza la evolución mensual de adopciones según criterios seleccionados.
          </p>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-pink-200"
            >
              <option value="2023">Año 2023</option>
            </select>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            >
              <option value="LaPaz">Región La Paz</option>
            </select>

            <select
              value={refugio}
              onChange={(e) => setRefugio(e.target.value)}
              className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="Refugio Esperanza">Refugio Esperanza</option>
              <option value="Refugio Huellitas">Refugio Huellitas</option>
            </select>

            <select
              value={tipoMascota}
              onChange={(e) => setTipoMascota(e.target.value)}
              className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-purple-200"
            >
              <option value="Perro">Perros</option>
              <option value="Gato">Gatos</option>
            </select>
          </div>

          {/* Gráfico */}
          <div className="w-full h-[360px] bg-white rounded-lg border border-gray-200">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="adopciones" fill="#e91e63" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

    </>
  );
};

export default ComparativaAdopciones;