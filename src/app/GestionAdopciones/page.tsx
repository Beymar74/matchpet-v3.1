// src/pages/GestionAdopciones/index.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, FileText, Users, CalendarCheck, User, BarChart2 } from 'lucide-react';

const cards = [
  {
    icon: <LayoutGrid size={32} className="text-blue-500" />, 
    title: 'Flujo Visual de Solicitudes de Adopción',
    href: '/GestionAdopciones/AdopcionesPipeline',
    description: 'Visualiza y gestiona el flujo de solicitudes.'
  },
  {
    icon: <FileText size={32} className="text-purple-500" />,
    title: 'Seguimiento de Solicitudes',
    href: '/GestionAdopciones/SeguimientoSolicitud',
    description: 'Revisa el historial y estado de cada adopción.'
  },
  {
    icon: <Users size={32} className="text-green-500" />,
    title: 'Gestión de Documentos',
    href: '/GestionAdopciones/DocumentosAdopcion',
    description: 'Sube y valida contratos y comprobantes.'
  },
  {
    icon: <CalendarCheck size={32} className="text-yellow-500" />,
    title: 'Visitas Programadas',
    href: '/GestionAdopciones/VisitasAdopcion',
    description: 'Administra citas de evaluación presencial.'
  },
  {
    icon: <User size={32} className="text-pink-500" />,
    title: 'Información del Adoptante',
    href: '/GestionAdopciones/ContactoAdoptante',
    description: 'Consulta detalles del posible adoptante.'
  },
  {
    icon: <BarChart2 size={32} className="text-indigo-500" />,
    title: 'Dashboard de Métricas',
    href: '/GestionAdopciones/AdopcionesDashboard',
    description: 'Visualiza indicadores de rendimiento.'
  },
];

export default function GestionAdopcionesInicio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-10">
      <header className="mb-10 text-center">
        <div className="relative w-full h-60 mb-8 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/banner-adopciones.jpg"
            alt="Banner Gestión de Adopciones"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold drop-shadow">Panel de Gestión de Adopciones</h1>
            <p className="text-lg mt-2 drop-shadow">Controla todo el flujo de adopciones desde un solo lugar</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Link href={card.href} key={index}>
            <div className="bg-white dark:bg-gray-800 hover:shadow-xl rounded-2xl p-6 border border-transparent hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-xl">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{card.title}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
