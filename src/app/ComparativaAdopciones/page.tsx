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

type MascotaMes = {
  mes: string;
  adopciones: number;
};

type TipoMascota = {
  Perro: MascotaMes[];
  Gato: MascotaMes[];
};
import Link from 'next/link';
const botonesModulo7 = [
  { nombre: 'Inicio', ruta: '/admin' },
  { nombre: 'Comparativa', ruta: '/ComparativaAdopciones' },
  { nombre: 'Evolución', ruta: '/EvolucionHistorica' },
  { nombre: 'Región', ruta: '/ActividadRegion' },
  { nombre: 'Favoritos', ruta: '/FavoritosFrecuentes' },
  { nombre: 'Logs', ruta: '/LogsAuditorias' },
];
export const NavegacionModulo7 = () => (
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
);
const datosFicticios: Record<string, Record<string, Record<string, TipoMascota>>> = {
  "2025": {
    "LaPaz": {
      "Refugio Esperanza": {
        "Perro": [ { mes: 'Ene', adopciones: 5 }, { mes: 'Feb', adopciones: 9 }, { mes: 'Dic', adopciones: 9 }],
        "Gato": [ { mes: 'Ene', adopciones: 3 }, { mes: 'Feb', adopciones: 5 }, { mes: 'Dic', adopciones: 7 }]
      },
      "Refugio Huellitas": {
        "Perro": [ { mes: 'Ene', adopciones: 6 }, { mes: 'Feb', adopciones: 7 }, { mes: 'Dic', adopciones: 15 }],
        "Gato": [ { mes: 'Ene', adopciones: 2 }, { mes: 'Feb', adopciones: 3 }, { mes: 'Dic', adopciones: 6 }]
      }
    }
  }
};

const ComparativaAdopciones = () => {
  const [anio, setAnio] = useState("2025");
  const [region, setRegion] = useState("LaPaz");
  const [refugio, setRefugio] = useState("Refugio Esperanza");
  const [tipoMascota, setTipoMascota] = useState("Perro");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const refugiosDisponibles = Object.keys(datosFicticios[anio]?.[region] || {});
  const refugiosFiltrados = refugiosDisponibles.filter(r =>
    r.toLowerCase().includes(busqueda.toLowerCase())
  );

  const datos =
    datosFicticios?.[anio]?.[region]?.[refugio]?.[tipoMascota] || [];

  const manejarEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && refugiosFiltrados.length > 0) {
      setRefugio(refugiosFiltrados[0]);
      setBusqueda("");
      setMostrarSugerencias(false);
    }
  };

  const seleccionarSugerencia = (nombre: string) => {
    setRefugio(nombre);
    setBusqueda("");
    setMostrarSugerencias(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
        {/* 👉 Barra de botones de navegación */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {botonesModulo7.map((btn, i) => (
            <Link
              key={i}
              href={btn.ruta}
              className={`px-3 py-1 text-sm rounded-full transition font-medium ${
                btn.nombre === 'Comparativa'
                  ? 'bg-[#30588C] text-white'
                  : 'bg-[#BF3952] text-white hover:bg-[#a82f46]'
              }`}
            >
              {btn.nombre}
            </Link>
          ))}
        </div>
        <h1 className="text-2xl font-semibold text-center text-pink-600 mb-4">
          Comparativa de Adopciones
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Analiza la evolución mensual de adopciones según criterios seleccionados.
        </p>

        {/* Barra de búsqueda con sugerencias */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar refugio por nombre..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setMostrarSugerencias(true);
            }}
            onKeyDown={manejarEnter}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-pink-200 text-[#BF3952]"
          />
          {mostrarSugerencias && busqueda && refugiosFiltrados.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow-md max-h-40 overflow-y-auto">
              {refugiosFiltrados.map((r) => (
                <li
                  key={r}
                  className="p-2 hover:bg-pink-100 cursor-pointer text-[#BF3952]"
                  onClick={() => seleccionarSugerencia(r)}
                >
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <select
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-pink-200 text-[#BF3952]"
          >
            <option value="2025">Año 2025</option>
          </select>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-indigo-200 text-[#BF3952]"
          >
            <option value="LaPaz">Región La Paz</option>
          </select>

          <select
            value={refugio}
            onChange={(e) => setRefugio(e.target.value)}
            className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-blue-200 text-[#BF3952]"
          >
            {refugiosFiltrados.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            value={tipoMascota}
            onChange={(e) => setTipoMascota(e.target.value)}
            className="p-2 text-sm border rounded-lg shadow-sm focus:ring focus:ring-purple-200 text-[#BF3952]"
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
  );
};

export default ComparativaAdopciones;
