'use client';
import React, { useState, useEffect } from 'react';

interface Solicitud {
  id: number;
  petName: string;
  requestDate: string;
  status: string;
}

const HistorialSolicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const res = await fetch('/api/solicitudes');
        const data = await res.json();
        console.log('🔍 Datos recibidos desde API:', data);

        // Validación robusta
        if (Array.isArray(data)) {
          setSolicitudes(data);
        } else if (Array.isArray(data?.recordset)) {
          setSolicitudes(data.recordset);
        } else {
          console.error("❌ Respuesta inesperada:", data);
          setSolicitudes([]);
        }
      } catch (error) {
        console.error('Error cargando solicitudes:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerSolicitudes();
  }, []);

  const statusStyles: Record<string, string> = {
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Aprobada: 'bg-green-100 text-green-800',
    Rechazada: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold text-[#30588C] mb-6">
        Historial de Solicitudes de Adopción
      </h1>

      {cargando ? (
        <p className="text-gray-600">Cargando historial de solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-gray-500">No hay solicitudes registradas.</p>
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
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    statusStyles[solicitud.status] || 'bg-gray-100 text-gray-800'
                  }`}
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
