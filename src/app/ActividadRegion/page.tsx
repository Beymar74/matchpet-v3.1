"use client";

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

export default function ActividadRegionRefugio() {
  const [filtro, setFiltro] = useState("adopciones");

  return (
    <div className="p-6 bg-white shadow-2xl rounded-2xl max-w-6xl mx-auto mt-6 border border-[#264653]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#BF3952]">
        Actividad por Región o Refugio
      </h2>

      {/* Filtros */}
      <div className="flex justify-end space-x-4 mb-6">
        <label className="font-semibold text-[#0D1B2A]">Mostrar:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-[#30588C] rounded-lg px-4 py-2 shadow-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#BF3952] bg-white"
        >
          <option value="adopciones">Adopciones</option>
          <option value="solicitudes">Solicitudes</option>
        </select>
      </div>

      {/* Gráfico de barras */}
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={datosFicticios} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <XAxis dataKey="refugio" tick={{ fill: "#0D1B2A", fontSize: 12 }} />
          <YAxis tick={{ fill: "#0D1B2A", fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ color: "#264653" }} />
          <Bar dataKey={filtro} fill="#BF3952" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla */}
      <div className="mt-10 overflow-x-auto rounded-xl border border-[#264653]">
        <table className="w-full text-sm text-left text-[#0D1B2A]">
          <thead className="bg-[#30588C] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Región</th>
              <th className="px-4 py-3">Refugio</th>
              <th className="px-4 py-3">Adopciones</th>
              <th className="px-4 py-3">Solicitudes</th>
            </tr>
          </thead>
          <tbody>
            {datosFicticios.map((item, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-[#C9D6DF]" : "bg-white"
                } border-b border-[#C9D6DF] hover:bg-[#F9F9FF]`}
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
  );
}
