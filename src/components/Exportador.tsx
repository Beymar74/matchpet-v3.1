"use client";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const colores = ["#BF3952", "#30588C", "#4EDCD8", "#C9D6DF"];

const datosMascotas = [
  { nombre: "Luna", tipo: "Perro", especie: "Canino", favoritos: 82, estado: "Adoptado", fecha: "2025-06-01" },
  { nombre: "Max", tipo: "Gato", especie: "Felino", favoritos: 75, estado: "Disponible", fecha: "2025-06-03" },
  { nombre: "Bella", tipo: "Perro", especie: "Canino", favoritos: 68, estado: "En revisión", fecha: "2025-06-02" },
  { nombre: "Rocky", tipo: "Perro", especie: "Canino", favoritos: 90, estado: "Disponible", fecha: "2025-06-05" },
{ nombre: "Milo", tipo: "Gato", especie: "Felino", favoritos: 55, estado: "Adoptado", fecha: "2025-06-04" },
{ nombre: "Daisy", tipo: "Perro", especie: "Canino", favoritos: 77, estado: "Disponible", fecha: "2025-06-06" },
{ nombre: "Coco", tipo: "Gato", especie: "Felino", favoritos: 64, estado: "En revisión", fecha: "2025-06-07" },
{ nombre: "Toby", tipo: "Perro", especie: "Canino", favoritos: 81, estado: "Disponible", fecha: "2025-06-08" },
{ nombre: "Simba", tipo: "Gato", especie: "Felino", favoritos: 70, estado: "Adoptado", fecha: "2025-06-09" },
{ nombre: "Nala", tipo: "Gato", especie: "Felino", favoritos: 62, estado: "Disponible", fecha: "2025-06-10" },
{ nombre: "Zeus", tipo: "Perro", especie: "Canino", favoritos: 85, estado: "Disponible", fecha: "2025-06-11" },
{ nombre: "Lola", tipo: "Perro", especie: "Canino", favoritos: 73, estado: "En revisión", fecha: "2025-06-12" },
{ nombre: "Mimi", tipo: "Gato", especie: "Felino", favoritos: 58, estado: "Disponible", fecha: "2025-06-13" }

];

export default function ReportesRefugioGraficos() {
  const [filtroTabla, setFiltroTabla] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("");
  const graficoRef = useRef<HTMLDivElement>(null);

  const datosFiltrados = datosMascotas.filter((m) => {
    const coincideEstado = filtroTabla === "todos" || m.estado === filtroTabla;
    const coincideFecha = !filtroFecha || m.fecha === filtroFecha;
    return coincideEstado && coincideFecha;
  });

  const exportarPDF = async () => {
    const input = graficoRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape" });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, width, height);
    pdf.save("GraficasMascotas.pdf");
  };

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(datosFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Mascotas");
    XLSX.writeFile(libro, "ReporteMascotas.xlsx");
  };

  const exportarTablaPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Reporte Detallado de Mascotas", 14, 16);
    autoTable(doc, {
      head: [["Nombre", "Tipo", "Especie", "Favoritos", "Estado", "Fecha"]],
      body: datosFiltrados.map((m) => [m.nombre, m.tipo, m.especie, m.favoritos, m.estado, m.fecha]),
      startY: 25,
      headStyles: { fillColor: [48, 88, 140] },
      alternateRowStyles: { fillColor: [233, 236, 239] },
    });
    doc.save("ReporteMascotas.pdf");
  };

  return (
    <div className="bg-white min-h-screen p-6">
      
      <h2 className="text-3xl font-bold text-center text-[#BF3952] mb-2">
        Reportes y Estadísticas de Mascotas
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Fecha del reporte: {new Date().toLocaleDateString()}
      </p>

      {/* Seccion de Graficas */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-[#30588C] mb-4">Gráficas Generales</h3>
        <div ref={graficoRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
          <div className="h-64 rounded shadow p-4" style={{ backgroundColor: "#ffffff" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosFiltrados}>
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="favoritos" fill="#BF3952" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-64 rounded shadow p-4" style={{ backgroundColor: "#ffffff" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(
                    datosFiltrados.reduce((acc, m) => {
                      acc[m.estado] = (acc[m.estado] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {colores.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-64 rounded shadow p-4" style={{ backgroundColor: "#ffffff" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(
                    datosFiltrados.reduce((acc, m) => {
                      acc[m.especie] = (acc[m.especie] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {colores.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={exportarPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Exportar Gráficas a PDF
          </button>
        </div>
      </section>

      {/* Seccion de Tabla */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-[#30588C] mb-4">Tabla de Mascotas</h3>
        <div className="flex gap-4 flex-wrap mb-4">
          {["todos", "Adoptado", "Disponible", "En revisión"].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroTabla(estado)}
              className={`px-4 py-2 rounded text-white ${
                filtroTabla === estado ? "bg-[#30588C]" : "bg-[#C9D6DF] text-[#0D1B2A]"
              } hover:bg-[#30588C] transition`}
            >
              {estado}
            </button>
          ))}

          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm text-[#0D1B2A] shadow"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#264653] text-sm">
            <thead className="bg-[#BF3952] text-white">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Especie</th>
                <th className="px-4 py-2">Favoritos</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((m, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-[#C9D6DF]" : "bg-white"} text-[#0D1B2A]`}
                >
                  <td className="px-4 py-2">{m.nombre}</td>
                  <td className="px-4 py-2">{m.tipo}</td>
                  <td className="px-4 py-2">{m.especie}</td>
                  <td className="px-4 py-2">{m.favoritos}</td>
                  <td className="px-4 py-2">{m.estado}</td>
                  <td className="px-4 py-2">{m.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Exportar Tabla a Excel
          </button>
          <button
            onClick={exportarTablaPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Exportar Tabla a PDF
          </button>
        </div>
      </section>
    </div>
  );
}