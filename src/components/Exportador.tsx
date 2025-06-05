"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const datosOriginales = [
  { nombre: "Luna", tipo: "Perro", favoritos: 82 },
  { nombre: "Max", tipo: "Gato", favoritos: 75 },
  { nombre: "Bella", tipo: "Perro", favoritos: 68 },
];

export default function Exportador() {
  const [orden, setOrden] = useState("nombre");
  const [datos, setDatos] = useState([...datosOriginales]);

  const ordenarPor = (criterio: string) => {
    const datosOrdenados = [...datos].sort((a, b) => {
      if (criterio === "favoritos") return b.favoritos - a.favoritos;
      return a[criterio].localeCompare(b[criterio]);
    });
    setOrden(criterio);
    setDatos(datosOrdenados);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    // @ts-ignore
    autoTable(doc, {
      head: [Object.keys(datos[0])],
      body: datos.map((obj) => Object.values(obj)),
      startY: 25,
      headStyles: { fillColor: [191, 57, 82] }, // Dingy Dungeon
      alternateRowStyles: { fillColor: [201, 214, 223] }, // Silver Blue
    });

    doc.save("ReporteFavoritas.pdf");
  };

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reporte");
    XLSX.writeFile(libro, "ReporteFavoritas.xlsx");
  };

  return (
    <main className="bg-white min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-[#264653]">
        <h2 className="text-2xl font-bold text-center text-[#BF3952] mb-6">
          Exportación de Reporte
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => ordenarPor("nombre")}
            className={`px-4 py-2 rounded text-white ${
              orden === "nombre" ? "bg-[#30588C]" : "bg-[#C9D6DF] text-[#0D1B2A]"
            } hover:bg-[#30588C] transition`}
          >
            Ordenar por Nombre
          </button>
          <button
            onClick={() => ordenarPor("tipo")}
            className={`px-4 py-2 rounded text-white ${
              orden === "tipo" ? "bg-[#30588C]" : "bg-[#C9D6DF] text-[#0D1B2A]"
            } hover:bg-[#30588C] transition`}
          >
            Ordenar por Tipo
          </button>
          <button
            onClick={() => ordenarPor("favoritos")}
            className={`px-4 py-2 rounded text-white ${
              orden === "favoritos" ? "bg-[#30588C]" : "bg-[#C9D6DF] text-[#0D1B2A]"
            } hover:bg-[#30588C] transition`}
          >
            Ordenar por Favoritos
          </button>
        </div>

        <table className="w-full text-sm text-left border border-[#264653] mb-6 rounded-lg overflow-hidden">
          <thead className="bg-[#BF3952] text-white font-semibold">
            <tr>
              <th className="px-4 py-2 border border-[#264653]">Nombre</th>
              <th className="px-4 py-2 border border-[#264653]">Tipo</th>
              <th className="px-4 py-2 border border-[#264653]">Favoritos</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? "bg-[#C9D6DF]" : "bg-white"} hover:bg-[#F0F4F8]`}
              >
                <td className="px-4 py-2 border border-[#264653] text-[#0D1B2A]">{fila.nombre}</td>
                <td className="px-4 py-2 border border-[#264653] text-[#0D1B2A]">{fila.tipo}</td>
                <td className="px-4 py-2 border border-[#264653] text-[#0D1B2A]">{fila.favoritos}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4">
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Exportar Excel
          </button>
          <button
            onClick={exportarPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </main>
  );
}
