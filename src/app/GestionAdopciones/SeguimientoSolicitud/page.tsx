'use client';
import React from 'react';

const solicitudes = [
  {
    nombre: 'Luna',
    estado: 'Visita Programada',
    fecha: '2025-06-01',
    notas: 'Tiene jardín grande',
  },
  {
    nombre: 'Max',
    estado: 'Evaluación Inicial',
    fecha: '2025-05-29',
    notas: 'Buen perfil, vive solo',
  },
];

export default function SeguimientoSolicitud() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Seguimiento de Solicitudes</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2">Mascota</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Notas</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{s.nombre}</td>
              <td className="p-2">{s.estado}</td>
              <td className="p-2">{s.fecha}</td>
              <td className="p-2">{s.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}