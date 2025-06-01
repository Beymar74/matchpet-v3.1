"use client";

import React, { useState } from "react";

const logsFicticios = [
  { id: 1, usuario: "admin01", accion: "Editó mascota", tipo: "Mascota", fecha: "2025-05-30", hora: "10:15" },
  { id: 2, usuario: "refugio02", accion: "Registró adopción", tipo: "Adopción", fecha: "2025-05-30", hora: "10:25" },
  { id: 3, usuario: "usuarioX", accion: "Actualizó perfil", tipo: "Cuenta", fecha: "2025-05-29", hora: "21:12" },
];

const tipos = ["Todos", "Adopción", "Mascota", "Cuenta"];

export default function LogsAuditorias() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");

  const filtrados = logsFicticios.filter(log =>
    tipoSeleccionado === "Todos" || log.tipo === tipoSeleccionado
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto p-6 bg-white border border-[#FDCBFA] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-[#A672E3] text-center mb-6">
          Historial de Auditorías
        </h2>

        {/* Filtros */}
        <div className="flex gap-4 mb-6 justify-end">
  <label className="text-sm font-semibold text-[#BF3952] self-center">
    Filtrar por tipo:
  </label>
  <select
  value={tipoSeleccionado}
  onChange={(e) => setTipoSeleccionado(e.target.value)}
  className="border border-[#E9A8E1] text-[#011526] font-medium px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A672E3] bg-white"
>
  {tipos.map((tipo, i) => (
    <option key={i} value={tipo}>{tipo}</option>
  ))}
</select>
</div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-[#FDCBFA] rounded-md overflow-hidden">
            <thead className="bg-[#FDCBFA] text-[#011526] font-semibold">
              <tr>
                <th className="p-3 border border-[#FDCBFA]">Usuario</th>
                <th className="p-3 border border-[#FDCBFA]">Acción</th>
                <th className="p-3 border border-[#FDCBFA]">Tipo</th>
                <th className="p-3 border border-[#FDCBFA]">Fecha</th>
                <th className="p-3 border border-[#FDCBFA]">Hora</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((log) => (
                <tr key={log.id} className="hover:bg-[#fef3f7]">
                  <td className="p-3 border border-[#FDCBFA] text-[#333]">{log.usuario}</td>
                  <td className="p-3 border border-[#FDCBFA] text-[#333]">{log.accion}</td>
                  <td className="p-3 border border-[#FDCBFA]">
                    <span className={`px-3 py-1 rounded-full text-white text-xs ${
                      log.tipo === "Adopción"
                        ? "bg-green-500"
                        : log.tipo === "Mascota"
                        ? "bg-purple-500"
                        : "bg-blue-500"
                    }`}>
                      {log.tipo}
                    </span>
                  </td>
                  <td className="p-3 border border-[#FDCBFA] text-[#333]">{log.fecha}</td>
                  <td className="p-3 border border-[#FDCBFA] text-[#333]">{log.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
