// src/app/Modulo7/ActividadRegionRefugio/page.tsx
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const datosFicticios = [
  { region: "La Paz", refugio: "Refugio Esperanza", adopciones: 120, solicitudes: 80 },
  { region: "Cochabamba", refugio: "Huellitas del Sur", adopciones: 95, solicitudes: 60 },
  { region: "Santa Cruz", refugio: "Patitas Felices", adopciones: 150, solicitudes: 100 },
  { region: "Tarija", refugio: "Vida Animal", adopciones: 60, solicitudes: 40 },
];

const colores = ["#4EDCD8", "#A672E3", "#FF9FF3", "#FDCBFA"];

export default function ActividadRegionRefugio() {
  const [filtro, setFiltro] = useState("adopciones");

  return (
    <>
      <div className="p-6 bg-white shadow-xl rounded-2xl max-w-6xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#A672E3]">Actividad por Región o Refugio</h2>

        {/* Filtros */}
        <div className="flex justify-end space-x-4 mb-6">
          <label className="font-medium text-gray-700">Mostrar:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A672E3]"
          >
            <option value="adopciones">Adopciones</option>
            <option value="solicitudes">Solicitudes</option>
          </select>
        </div>

        {/* Gráfico de barras */}
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={datosFicticios} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="refugio" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={filtro} fill="#A672E3" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Tabla */}
        <div className="mt-8 overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="text-xs text-white uppercase bg-[#A672E3]">
              <tr>
                <th className="px-4 py-3">Región</th>
                <th className="px-4 py-3">Refugio</th>
                <th className="px-4 py-3">Adopciones</th>
                <th className="px-4 py-3">Solicitudes</th>
              </tr>
            </thead>
            <tbody>
              {datosFicticios.map((item, i) => (
                <tr key={i} className="bg-white border-b hover:bg-[#FDF1FF]">
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
    </>
  );
}
