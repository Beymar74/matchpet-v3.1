"use client";

import React, { useState, useEffect } from 'react';

const HistorialSolicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  useEffect(() => {
    const simulatedData = [
      { id: 1, petName: 'Max', requestDate: '2023-10-26', status: 'Pendiente' },
      { id: 2, petName: 'Bella', requestDate: '2023-10-20', status: 'Aprobada' },
      { id: 3, petName: 'Rocky', requestDate: '2023-10-15', status: 'Rechazada' },
    ];

    const timer = setTimeout(() => {
      setSolicitudes(simulatedData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const statusStyles: Record<string, string> = {
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Aprobada: 'bg-green-100 text-green-800',
    Rechazada: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold text-[#30588C] mb-6">Historial de Solicitudes de Adopción</h1>

      {solicitudes.length === 0 ? (
        <p className="text-gray-600">Cargando historial de solicitudes...</p>
      ) : (
        <div className="space-y-4">
          {solicitudes.map((solicitud) => (
            <div
              key={solicitud.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-gray-600">Mascota</p>
                <p className="font-semibold text-gray-800">{solicitud.petName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Solicitud</p>
                <p className="text-gray-700">{solicitud.requestDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${statusStyles[solicitud.status]}`}
                >
                  {solicitud.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialSolicitudes;
