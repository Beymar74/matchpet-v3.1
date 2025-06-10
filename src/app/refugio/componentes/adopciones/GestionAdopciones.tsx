'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

// Datos de ejemplo para las solicitudes
const opciones = [
  {
    titulo: 'Evaluación de Solicitudes',
    ruta: '/EvaluacionSolicitudesRefugio',
    imagen: '/Perros/perrito_PA_10.png',
  },
  {
    titulo: 'Estado de Solicitudes',
    ruta: '/EstadoSolicitud ',
    imagen: '/Perros/perrito_PA_11.png',
  },
  {
    titulo: 'Seguimiento Post-Adopción',
    ruta: '/SeguimientoPostAdopcion',
    imagen: '/Gatos/gatito_PA_10.png',
  },
];

const GestionAdopciones: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Título de la sección */}
      <div className="max-w-6xl mx-auto p-6 text-center mt-6">
        <Users className="h-16 w-16 text-[#6093BF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#011526] mb-2">Gestión de Adopciones</h2>
        <p className="text-gray-600 mb-4">
          Administra las solicitudes de adopción y el seguimiento post-adopción
        </p>
      </div>

      {/* Opciones compactas */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {opciones.map((op, index) => (
          <div
            key={index}
            onClick={() => router.push(op.ruta)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden text-left p-4 cursor-pointer"
          >
            <img
              src={op.imagen}
              alt={op.titulo}
              width={500}
              height={300}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{op.titulo}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionAdopciones;
