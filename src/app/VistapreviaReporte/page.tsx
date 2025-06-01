// src/app/Modulo7/VistapreviaReporte/page.tsx
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
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    autoTable(doc, {
      head: [Object.keys(datosEjemplo[0])],
      body: datosEjemplo.map((obj) => Object.values(obj)),
      startY: 25,
    });

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setUrlPDF(url);
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Mascotas Favoritas", 14, 16);

    autoTable(doc, {
      head: [Object.keys(datosEjemplo[0])],
      body: datosEjemplo.map((obj) => Object.values(obj)),
      startY: 25,
    });

    doc.save("ReporteFavoritas.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center text-[#A672E3] mb-6">
          Vista Previa de Reporte
        </h2>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={generarVistaPrevia}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generar Vista Previa
          </button>

          <button
            onClick={descargarPDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Descargar PDF
          </button>
        </div>

        {urlPDF && (
          <iframe
            src={urlPDF}
            width="100%"
            height="600px"
            className="border border-gray-300 rounded-lg shadow-md bg-white"
          />
        )}
      </div>
    </div>
  );
}
