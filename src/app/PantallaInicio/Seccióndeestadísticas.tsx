'use client';

import React from 'react';
import { Heart, Home, Users, Target } from 'lucide-react';

const stats = [
  {
    value: '1,200+',
    label: 'Mascotas Adoptadas',
    icon: Heart,
    description: "Cada mascota adoptada significa una vida transformada.",
    percentage: 80,
    progressColor: '#BF3952',
  },
  {
    value: '50+',
    label: 'Refugios Asociados',
    icon: Home,
    description: "Más de 50 refugios que nos ayudan a encontrar hogares para las mascotas.",
    percentage: 65,
    progressColor: '#30588C',
  },
  {
    value: '5,000+',
    label: 'Miembros de la Comunidad',
    icon: Users,
    description: "Una comunidad comprometida que crece cada día.",
    percentage: 90,
    progressColor: '#6093BF',
  },
  {
    value: '1,000+',
    label: 'Historias de Éxito',
    icon: Target,
    description: "Miles de historias felices gracias a nuestros esfuerzos conjuntos.",
    percentage: 75,
    progressColor: '#254559',
  },
];

export default function StatsSection() {
  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-24 bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12">
          Cifras que llenan el corazón
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#30588C] p-6 transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-14 h-14 sm:w-16 sm:h-16 text-gray-800 transition-transform transform hover:scale-110" strokeWidth={1.5} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1 text-gray-900">{stat.value}</div>
              <div className="text-base sm:text-lg font-medium text-gray-700 mb-2">{stat.label}</div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{stat.description}</p>

              {/* Barra de progreso con porcentaje */}
              <div className="relative w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-1000"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.progressColor,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                  {stat.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
