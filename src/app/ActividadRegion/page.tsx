"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import HeaderAdmin from "@/components/layout/HeaderAdmin";
import SidebarAdmin from "@/components/admin-dashboard/sidebar/SidebarAdmin";
// Menú superior
const botonesModulo7 = [
  { nombre: 'Inicio', ruta: '/admin' },
  { nombre: 'Comparativa', ruta: '/ComparativaAdopciones' },
  { nombre: 'Evolución', ruta: '/EvolucionHistorica' },
  { nombre: 'Región', ruta: '/ActividadRegion' },
  { nombre: 'Favoritos', ruta: '/FavoritosFrecuentes' },
];

// Datos simulados
const datosFicticios = [
  { region: "La Paz", refugio: "Refugio Esperanza", adopciones: 120, solicitudes: 80 },
  { region: "Cochabamba", refugio: "Huellitas del Sur", adopciones: 95, solicitudes: 60 },
  { region: "Santa Cruz", refugio: "Patitas Felices", adopciones: 150, solicitudes: 100 },
  { region: "Tarija", refugio: "Vida Animal", adopciones: 60, solicitudes: 40 },
];

export default function ActividadRegionRefugio() {
  const [filtro, setFiltro] = useState("adopciones");
  const [regionSeleccionada, setRegionSeleccionada] = useState("Todas");
  const [refugioSeleccionado, setRefugioSeleccionado] = useState("Todos");

  const regiones = ["Todas", ...new Set(datosFicticios.map(d => d.region))];
  const refugiosFiltrados = regionSeleccionada === "Todas"
    ? datosFicticios
    : datosFicticios.filter(d => d.region === regionSeleccionada);
  const refugios = ["Todos", ...new Set(refugiosFiltrados.map(d => d.refugio))];

  const datosFiltrados = datosFicticios.filter(d =>
    (regionSeleccionada === "Todas" || d.region === regionSeleccionada) &&
    (refugioSeleccionado === "Todos" || d.refugio === refugioSeleccionado)
  );
  const [activeModule, setActiveModule] = useState("modulo7");
  const [collapsed, setCollapsed] = useState(false);
  return (
  <>
  <HeaderAdmin />
      
    <main className={`min-h-screen bg-gray-50 py-8 px-4 transition-all ${collapsed ? "ml-20" : "ml-80"}`}>
        <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {botonesModulo7.map((btn, i) => (
          <Link
            key={i}
            href={btn.ruta}
            className={`px-3 py-1 text-sm rounded-full transition font-medium ${
              btn.nombre === 'Región'
                ? 'bg-[#30588C] text-white'
                : 'bg-[#BF3952] text-white hover:bg-[#a82f46]'
            }`}
          >
            {btn.nombre}
          </Link>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-[#BF3952]">
        Actividad por Región y Refugio
      </h2>
      <p className="text-center text-sm text-gray-700 mb-6">
        Visualiza la cantidad de adopciones o solicitudes realizadas por refugio o región.
      </p>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-[#264653] mb-1">Filtrar por región:</label>
          <select
            value={regionSeleccionada}
            onChange={(e) => {
              setRegionSeleccionada(e.target.value);
              setRefugioSeleccionado("Todos");
            }}
            className="w-full px-3 py-2 border border-[#30588C] rounded-lg text-sm text-[#011526] bg-white"
          >
            {regiones.map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#264653] mb-1">Filtrar por refugio:</label>
          <select
            value={refugioSeleccionado}
            onChange={(e) => setRefugioSeleccionado(e.target.value)}
            className="w-full px-3 py-2 border border-[#30588C] rounded-lg text-sm text-[#011526] bg-white"
          >
            {refugios.map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#264653] mb-1">Métrica:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full px-3 py-2 border border-[#30588C] rounded-lg text-sm text-[#011526] bg-white"
          >
            <option value="adopciones">Adopciones</option>
            <option value="solicitudes">Solicitudes</option>
          </select>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={datosFiltrados} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <XAxis dataKey="refugio" tick={{ fill: "#011526", fontSize: 12 }} />
            <YAxis tick={{ fill: "#011526", fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey={filtro} fill="#BF3952" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <div className="mt-10 overflow-x-auto rounded-xl border border-[#264653]">
        <table className="w-full text-sm text-left text-[#011526]">
          <thead className="bg-[#30588C] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Región</th>
              <th className="px-4 py-3">Refugio</th>
              <th className="px-4 py-3">Adopciones</th>
              <th className="px-4 py-3">Solicitudes</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-white"
                } border-b border-[#d0dbe6] hover:bg-[#f0f8ff]`}
              >
                <td className="px-4 py-3">{item.region}</td>
                <td className="px-4 py-3">{item.refugio}</td>
                <td className="px-4 py-3">{item.adopciones}</td>
                <td className="px-4 py-3">{item.solicitudes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </main>
    </>
  );
}