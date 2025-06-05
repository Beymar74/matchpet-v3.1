"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const datosEjemplo = [
  { nombre: "Luna", tipo: "Perro", favoritos: 82 },
  { nombre: "Max", tipo: "Gato", favoritos: 75 },
];

export default function VistapreviaReporte() {
  const [urlPDF, setUrlPDF] = useState<string | null>(null);

  const generarVistaPrevia = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    autoTable(doc, {
      head: [Object.keys(datosEjemplo[0])],
      body: datosEjemplo.map((obj) => Object.values(obj)),
      startY: 25,
      headStyles: { fillColor: [191, 57, 82] }, // Dingy Dungeon
      alternateRowStyles: { fillColor: [201, 214, 223] }, // Silver Blue
    });

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setUrlPDF(url);
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    autoTable(doc, {
      head: [Object.keys(datosEjemplo[0])],
      body: datosEjemplo.map((obj) => Object.values(obj)),
      startY: 25,
      headStyles: { fillColor: [191, 57, 82] },
      alternateRowStyles: { fillColor: [201, 214, 223] },
    });

    doc.save("ReporteFavoritas.pdf");
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-2xl rounded-2xl border border-[#264653]">
        <h2 className="text-3xl font-bold text-center text-[#BF3952] mb-8">
          Vista Previa de Reporte
        </h2>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={generarVistaPrevia}
            className="bg-[#30588C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#264653] transition"
          >
            Generar Vista Previa
          </button>

          <button
            onClick={descargarPDF}
            className="bg-[#BF3952] text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Descargar PDF
          </button>
        </div>

        {urlPDF && (
          <iframe
            src={urlPDF}
            width="100%"
            height="600px"
            className="border border-[#C9D6DF] rounded-lg shadow-lg bg-white"
          />
        )}
      </div>
    </div>
  );
}
