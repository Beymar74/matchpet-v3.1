// src/app/Modulo8/ResultadosCompatibilidad/page.tsx
"use client";

import React from "react";

interface Adoptante {
  nombre: string;
  tipoVivienda: string;
  tiempoDisponible: number;
  experiencia: string;
  edad: number;
  tienePatio: string;
}

interface Mascota {
  nombre: string;
  requiereVivienda: string;
  minTiempo: number;
  requiereExperiencia: string;
  minEdad: number;
  requierePatio: string;
  foto: string;
  descripcion: string;
}

const adoptantes: Adoptante[] = [
  {
    nombre: "Carlos",
    tipoVivienda: "Casa",
    tiempoDisponible: 3,
    experiencia: "Sí",
    edad: 25,
    tienePatio: "Sí",
  },
  {
    nombre: "Lucía",
    tipoVivienda: "Departamento",
    tiempoDisponible: 1,
    experiencia: "No",
    edad: 20,
    tienePatio: "No",
  },
  {
    nombre: "Elena",
    tipoVivienda: "Otro",
    tiempoDisponible: 2,
    experiencia: "Otro",
    edad: 18,
    tienePatio: "No sé",
  },
];

const mascotas: Mascota[] = [
  {
    nombre: "Luna",
    requiereVivienda: "Casa",
    minTiempo: 2,
    requiereExperiencia: "Sí",
    minEdad: 18,
    requierePatio: "Sí",
    foto: "/img/perro1.jpg",
    descripcion: "Una perrita activa que necesita espacio y experiencia.",
  },
  {
    nombre: "Rocky",
    requiereVivienda: "Otro",
    minTiempo: 1,
    requiereExperiencia: "Otro",
    minEdad: 16,
    requierePatio: "No",
    foto: "/img/gato1.jpg",
    descripcion: "Un gato tranquilo que se adapta a cualquier hogar.",
  },
];

function calcularCompatibilidad(adoptante: Adoptante, mascota: Mascota): number {
  let score = 0;
  let totalPeso = 0;

  const pesos = {
    tipoVivienda: 0.25,
    tiempoDisponible: 0.20,
    experiencia: 0.20,
    edad: 0.15,
    tienePatio: 0.20,
  };

  totalPeso += pesos.tipoVivienda;
  if (adoptante.tipoVivienda === mascota.requiereVivienda) {
    score += pesos.tipoVivienda;
  } else if (adoptante.tipoVivienda === "Otro") {
    score += pesos.tipoVivienda * 0.5;
  }

  totalPeso += pesos.tiempoDisponible;
  if (adoptante.tiempoDisponible >= mascota.minTiempo) {
    score += pesos.tiempoDisponible;
  } else if (adoptante.tiempoDisponible >= mascota.minTiempo * 0.7) {
    score += pesos.tiempoDisponible * 0.4;
  }

  totalPeso += pesos.experiencia;
  if (adoptante.experiencia === mascota.requiereExperiencia) {
    score += pesos.experiencia;
  } else if (adoptante.experiencia === "Otro") {
    score += pesos.experiencia * 0.5;
  }

  totalPeso += pesos.edad;
  if (adoptante.edad >= mascota.minEdad) {
    score += pesos.edad;
  } else if (adoptante.edad >= mascota.minEdad - 2) {
    score += pesos.edad * 0.3;
  }

  totalPeso += pesos.tienePatio;
  if (adoptante.tienePatio === mascota.requierePatio) {
    score += pesos.tienePatio;
  } else if (adoptante.tienePatio === "No sé") {
    score += pesos.tienePatio * 0.3;
  }

  return Math.round((score / totalPeso) * 100);
}

export default function ResultadosCompatibilidad() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center text-[#BF3952] mb-8">
        Resultados de Compatibilidad
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mascotas.map((mascota, i) => {
          const resultados = adoptantes.map((a) => calcularCompatibilidad(a, mascota));
          const promedio = Math.round(resultados.reduce((a, b) => a + b, 0) / resultados.length);
          const compatibles = resultados.filter((r) => r >= 70).length;

          return (
            <div
              key={i}
              className="bg-[#F0F0F0] p-4 rounded-xl shadow-md border-l-4 border-[#30588C] hover:shadow-lg transition-all"
            >
              <img
                src={mascota.foto}
                alt={mascota.nombre}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold text-[#254559] mb-1">{mascota.nombre}</h2>
              <p className="text-[#011526] mb-2 italic">{mascota.descripcion}</p>
              <ul className="text-sm text-[#30588C] mb-3 space-y-1">
                <li>🏠 Vivienda requerida: {mascota.requiereVivienda}</li>
                <li>🕒 Tiempo mínimo: {mascota.minTiempo} h/día</li>
                <li>🎓 Experiencia previa: {mascota.requiereExperiencia}</li>
                <li>👤 Edad mínima: {mascota.minEdad} años</li>
                <li>🌳 Patio requerido: {mascota.requierePatio}</li>
              </ul>
              <p className="text-[#011526] font-semibold mb-1">
                Compatibilidad promedio: {promedio}%
              </p>
              <div className="w-full bg-gray-200 h-4 rounded-full mb-2">
                <div
                  className="h-4 rounded-full bg-[#6093BF]"
                  style={{ width: `${promedio}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#30588C]">
                🧍‍♂️ Adoptantes compatibles (≥70%):{' '}
                <span className="font-bold text-[#BF3952]">{compatibles}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
