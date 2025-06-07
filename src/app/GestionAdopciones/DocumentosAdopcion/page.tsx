'use client';
import React from 'react';

const documentos = [
  { mascota: 'Luna', tipo: 'Contrato', estado: 'Pendiente', fecha: '2025-05-28' },
  { mascota: 'Max', tipo: 'Comprobante Domicilio', estado: 'Aprobado', fecha: '2025-05-29' },
];

export default function DocumentosAdopcion() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Documentos</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2">Mascota</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((d, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{d.mascota}</td>
              <td className="p-2">{d.tipo}</td>
              <td className="p-2">{d.estado}</td>
              <td className="p-2">{d.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
