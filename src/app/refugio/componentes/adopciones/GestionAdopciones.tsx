'use client';
import React from 'react';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Datos de ejemplo para las solicitudes
const solicitudes = [
  { estado: 'Pendiente', cantidad: 5 },
  { estado: 'Aceptada', cantidad: 8 },
  { estado: 'Rechazada', cantidad: 3 },
];

const GestionAdopciones: React.FC = () => {
  const router = useRouter();
  
  // Cálculos para porcentajes de progreso
  const totalSolicitudes = solicitudes.reduce((acc, sol) => acc + sol.cantidad, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-80">
        <img
          src="/Perros y Gatos/bannerprincipaladopciones.jpg"
          alt="Banner Adopciones"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
            Centro de Adopciones y Seguimiento
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
            Gestiona solicitudes, visitas y seguimientos post-adopción para asegurar que cada mascota
            encuentre un hogar responsable, amoroso y permanente.
          </p>
        </div>
      </div>

      {/* Título de la sección */}
      <div className="max-w-6xl mx-auto p-6 text-center mt-6">
        <Users className="h-16 w-16 text-[#6093BF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#011526] mb-2">Gestión de Adopciones</h2>
        <p className="text-gray-600 mb-4">
          Administra las solicitudes de adopción y el seguimiento post-adopción
        </p>
      </div>

      {/* Estadísticas de Solicitudes */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {solicitudes.map((sol, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-[#6093BF] rounded-full text-white text-lg font-semibold">
              {sol.estado.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{sol.estado}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">{sol.cantidad} Solicitudes</div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-[#30588C] rounded-full"
                  style={{ width: `${Math.round((sol.cantidad / totalSolicitudes) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opciones */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <button
          onClick={() => router.push('/PantallaAdopciones')}
          className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]"
        >
          Unirse
        </button>
      </div>
    </div>
  );
};

export default GestionAdopciones;
