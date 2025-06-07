// src/pages/GestionAdopciones/AdopcionesPipeline.tsx
'use client';
import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, PawPrint, CalendarCheck, User } from 'lucide-react';

const etapas = [
  'Solicitud Recibida',
  'Evaluación Inicial',
  'Visita Programada',
  'Aprobación/Rechazo',
  'Finalizado',
];

const datosSimulados = [
  { id: '1', nombre: 'Luna', especie: 'Perro', edad: '2 años', fecha: '2025-06-01', adoptante: 'María Pérez', etapa: 0 },
  { id: '2', nombre: 'Max', especie: 'Gato', edad: '3 años', fecha: '2025-06-02', adoptante: 'Juan López', etapa: 1 },
  { id: '3', nombre: 'Bella', especie: 'Conejo', edad: '1 año', fecha: '2025-06-03', adoptante: 'Ana García', etapa: 2 },
  { id: '4', nombre: 'Toby', especie: 'Perro', edad: '4 años', fecha: '2025-06-04', adoptante: 'Luis Ramírez', etapa: 3 },
  { id: '5', nombre: 'Rocky', especie: 'Gato', edad: '6 meses', fecha: '2025-06-05', adoptante: 'Sofía Méndez', etapa: 0 },
  { id: '6', nombre: 'Nina', especie: 'Gato', edad: '5 años', fecha: '2025-06-06', adoptante: 'Carla Díaz', etapa: 1 },
  { id: '7', nombre: 'Simba', especie: 'Perro', edad: '3 años', fecha: '2025-06-07', adoptante: 'Jorge Silva', etapa: 2 },
  { id: '8', nombre: 'Kira', especie: 'Conejo', edad: '1.5 años', fecha: '2025-06-08', adoptante: 'Laura Fernández', etapa: 4 },
  { id: '9', nombre: 'Zeus', especie: 'Perro', edad: '2.5 años', fecha: '2025-06-09', adoptante: 'Pablo Ríos', etapa: 3 },
  { id: '10', nombre: 'Daisy', especie: 'Gato', edad: '7 años', fecha: '2025-06-10', adoptante: 'Esteban Torres', etapa: 4 },
];

export default function AdopcionesPipeline() {
  const [mascotas, setMascotas] = useState(datosSimulados);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<any | null>(null);

  const handleVerDetalle = (mascota: any) => {
    setMascotaSeleccionada(mascota);
  };

  const handleCerrarModal = () => {
    setMascotaSeleccionada(null);
  };

  const moverASiguienteEtapa = () => {
    if (!mascotaSeleccionada) return;
    setMascotas(prev =>
      prev.map(m =>
        m.id === mascotaSeleccionada.id && m.etapa < etapas.length - 1
          ? { ...m, etapa: m.etapa + 1 }
          : m
      )
    );
    setMascotaSeleccionada(null);
  };

  const eliminarMascota = () => {
    if (!mascotaSeleccionada) return;
    setMascotas(prev => prev.filter(m => m.id !== mascotaSeleccionada.id));
    setMascotaSeleccionada(null);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-200 mb-12 tracking-tight">
        Gestión Visual de Adopciones
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {etapas.map((etapa, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-xl border border-indigo-100 dark:border-gray-700 flex flex-col"
          >
            <h3 className="text-center font-semibold mb-4 text-indigo-600 dark:text-indigo-300 text-lg uppercase tracking-wide">
              {etapa}
            </h3>
            <div className="flex-1 space-y-3">
              {mascotas.filter(m => m.etapa === index).map(mascota => (
                <div
                  key={mascota.id}
                  className="bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white rounded-lg px-4 py-2 text-center shadow-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                  onClick={() => handleVerDetalle(mascota)}
                >
                  {mascota.nombre}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-200">
              {mascotaSeleccionada.nombre}
            </h2>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2"><User size={16} /> Adoptante: {mascotaSeleccionada.adoptante}</p>
              <p className="flex items-center gap-2"><PawPrint size={16} /> Especie: {mascotaSeleccionada.especie}</p>
              <p className="flex items-center gap-2"><CalendarCheck size={16} /> Edad: {mascotaSeleccionada.edad}</p>
              <p className="flex items-center gap-2"><CalendarCheck size={16} /> Fecha de Solicitud: {mascotaSeleccionada.fecha}</p>
            </div>
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={moverASiguienteEtapa}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition shadow"
              >
                <ArrowRight size={16} /> Siguiente Etapa
              </button>
              <button
                onClick={eliminarMascota}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition shadow"
              >
                <XCircle size={16} /> Eliminar
              </button>
              <button
                onClick={handleCerrarModal}
                className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition shadow"
              >
                <CheckCircle size={16} /> Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
