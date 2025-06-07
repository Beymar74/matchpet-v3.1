"use client";

import React, { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

const logsFicticios = [
  { id: 1, usuario: "admin01", accion: "Editó mascota", tipo: "Mascota", fecha: "2025-05-30", hora: "10:15" },
  { id: 2, usuario: "refugio02", accion: "Registró adopción", tipo: "Adopción", fecha: "2025-05-30", hora: "10:25" },
  { id: 3, usuario: "usuarioX", accion: "Actualizó perfil", tipo: "Cuenta", fecha: "2025-05-29", hora: "21:12" },
];

const tipos = ["Todos", "Adopción", "Mascota", "Cuenta"];
const rangos = ["Todos", "Hoy", "Esta semana", "Este mes", "Este año"];

export default function LogsAuditorias() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [rangoSeleccionado, setRangoSeleccionado] = useState("Todos");
  const [fechaFiltro, setFechaFiltro] = useState("");

  const esEnRango = (fechaStr) => {
    if (rangoSeleccionado === "Todos") return true;
    const fecha = dayjs(fechaStr);
    const hoy = dayjs();
    if (rangoSeleccionado === "Hoy") return fecha.isSame(hoy, "day");
    if (rangoSeleccionado === "Esta semana") return fecha.isSame(hoy, "week");
    if (rangoSeleccionado === "Este mes") return fecha.isSame(hoy, "month");
    if (rangoSeleccionado === "Este año") return fecha.isSame(hoy, "year");
    return true;
  };

  const filtrados = logsFicticios.filter(log => {
    const coincideTipo = tipoSeleccionado === "Todos" || log.tipo === tipoSeleccionado;
    const coincideFecha = !fechaFiltro || log.fecha === fechaFiltro;
    const coincideRango = esEnRango(log.fecha);
    return coincideTipo && coincideFecha && coincideRango;
  });

  const botonesModulo7 = [
    { nombre: 'Comparativa', ruta: '/ComparativaAdopciones' },
    { nombre: 'Evolución', ruta: '/EvolucionHistorica' },
    { nombre: 'Región', ruta: '/ActividadRegion' },
    { nombre: 'Favoritos', ruta: '/FavoritosFrecuentes' },
    { nombre: 'Logs', ruta: '/LogsAuditorias' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {botonesModulo7.map((btn, i) => (
          <Link
            key={i}
            href={btn.ruta}
            className={`px-3 py-1 text-sm rounded-full transition font-medium ${
              btn.nombre === 'Logs'
                ? 'bg-[#30588C] text-white'
                : 'bg-[#BF3952] text-white hover:bg-[#a82f46]'
            }`}
          >
            {btn.nombre}
          </Link>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white border border-[#FDCBFA] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-[#A672E3] text-center mb-6">
          Historial de Auditorías
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6 justify-end">
          <label className="text-sm font-semibold text-[#BF3952] self-center">
            Tipo:
          </label>
          <select
            value={tipoSeleccionado}
            onChange={(e) => setTipoSeleccionado(e.target.value)}
            className="border border-[#E9A8E1] text-[#011526] font-medium px-3 py-2 rounded-md text-sm shadow-sm bg-white"
          >
            {tipos.map((tipo, i) => (
              <option key={i} value={tipo}>{tipo}</option>
            ))}
          </select>

          <label className="text-sm font-semibold text-[#BF3952] self-center">
            Fecha específica:
          </label>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm text-[#0D1B2A] shadow"
          />

          <label className="text-sm font-semibold text-[#BF3952] self-center">
            Rango:
          </label>
          <select
            value={rangoSeleccionado}
            onChange={(e) => setRangoSeleccionado(e.target.value)}
            className="border border-[#E9A8E1] text-[#011526] font-medium px-3 py-2 rounded-md text-sm shadow-sm bg-white"
          >
            {rangos.map((r, i) => (
              <option key={i} value={r}>{r}</option>
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
