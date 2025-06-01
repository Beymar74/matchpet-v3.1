"use client";

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const datos = [
  { nombre: "Luna", tipo: "Perro", favoritos: 82 },
  { nombre: "Max", tipo: "Gato", favoritos: 75 },
  { nombre: "Bella", tipo: "Perro", favoritos: 68 },
];

export default function Exportador() {
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    // @ts-ignore
    autoTable(doc, {
      head: [Object.keys(datos[0])],
      body: datos.map((obj) => Object.values(obj)),
      startY: 25,
      headStyles: { fillColor: [254, 203, 250] },
      alternateRowStyles: { fillColor: [240, 248, 255] },
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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#A672E3] mb-6">
          Exportación de Reporte
        </h2>

        <table className="w-full table-auto text-sm text-left border border-gray-300 mb-6">
          <thead className="bg-[#FDCBFA] text-black font-semibold">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Favoritos</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3 py-2 border text-gray-700">{fila.nombre}</td>
                <td className="px-4 py-2 border text-gray-700">{fila.tipo}</td>
                <td className="px-4 py-2 border text-gray-700">{fila.favoritos}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4">
          <button
            onClick={exportarExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Exportar Excel
          </button>
          <button
            onClick={exportarPDF}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </main>
  );
}
