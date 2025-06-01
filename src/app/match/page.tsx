'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, XCircle, Undo2 } from 'lucide-react';
import HeaderUsuario from '@/components/layout/HeaderUsuario'; // ✅ Encabezado personalizado

const mascotasSimuladas = [
  {
    nombre: 'Luna',
    edad: '2 años',
    especie: 'Perro',
    raza: 'Labrador',
    descripcion: 'Juguetona, cariñosa y ama correr en el parque.',
    refugio: 'Refugio Amigo Fiel',
    compatibilidad: 92,
    imagen: '/Mascotas/perro1.jpg'
  },
  {
    nombre: 'Michi',
    edad: '1 año',
    especie: 'Gato',
    raza: 'Angora',
    descripcion: 'Tranquilo, observador y le encanta dormir al sol.',
    refugio: 'Gatitos La Paz',
    compatibilidad: 88,
    imagen: '/Mascotas/gato1.jpg'
  },
  {
    nombre: 'Toby',
    edad: '3 años',
    especie: 'Perro',
    raza: 'Beagle',
    descripcion: 'Curioso, protector y muy amigable con niños.',
    refugio: 'Huellitas del Sur',
    compatibilidad: 95,
    imagen: '/Mascotas/perro2.jpg'
  }
];

export default function PantallaMatch() {
  const [indice, setIndice] = useState(0);
  const [historial, setHistorial] = useState<string[]>([]);
  const [match, setMatch] = useState<string | null>(null);

  const mascota = mascotasSimuladas[indice];

  const handleLike = () => {
    const nuevos = [...historial, mascota.nombre];
    setHistorial(nuevos);
    if (nuevos.length >= 3) setMatch(mascota.nombre);
    pasar();
  };

  const pasar = () => {
    if (indice < mascotasSimuladas.length - 1) {
      setIndice(indice + 1);
    } else {
      setIndice(0);
      setHistorial([]);
    }
  };

  const deshacer = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  return (
    <>
      <HeaderUsuario /> {/* ✅ Mostrar encabezado con datos del usuario */}

      <main className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#eaf3fb] pt-24 px-4 md:px-12 flex flex-col md:flex-row gap-6 text-black">
        
        {/* Filtros */}
        <aside className="w-full md:w-1/4 space-y-4 hidden md:block">
          <h3 className="text-lg font-bold text-[#30588C]">Filtros</h3>
          <div className="space-y-2 text-sm text-black">
            <label className="block text-black">Especie:</label>
            <select className="w-full border rounded p-2 text-black">
              <option>Todos</option>
              <option>Perros</option>
              <option>Gatos</option>
            </select>

            <label className="block mt-4 text-black">Edad:</label>
            <select className="w-full border rounded p-2 text-black">
              <option>Cualquier edad</option>
              <option>Cachorro</option>
              <option>Adulto</option>
            </select>

            <Button className="mt-4 w-full bg-[#30588C] text-white">Aplicar filtros</Button>
          </div>
        </aside>

        {/* Tarjeta central */}
        <section className="w-full md:w-2/4 bg-white rounded-3xl shadow-2xl p-6 text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#30588C]">Encuentra tu compañero ideal 🐾</h2>

          <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={mascota.imagen}
              alt={mascota.nombre}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-left space-y-2 text-black">
            <h3 className="text-xl font-semibold text-[#BF3952]">{mascota.nombre}</h3>
            <p>{mascota.edad} · {mascota.raza} · {mascota.especie}</p>
            <p className="text-sm italic">{mascota.descripcion}</p>
            <p className="text-sm text-gray-700">📍 {mascota.refugio}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#30588C] h-full rounded-full text-right pr-2 text-white text-xs"
                style={{ width: `${mascota.compatibilidad}%` }}
              >
                {mascota.compatibilidad}%
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={pasar} variant="outline" className="rounded-full p-4"><XCircle className="text-red-500" /></Button>
            <Button onClick={deshacer} variant="outline" className="rounded-full p-4"><Undo2 className="text-gray-600" /></Button>
            <Button onClick={handleLike} className="rounded-full p-4 bg-[#BF3952] hover:bg-[#a53044] text-white"><Heart /></Button>
          </div>

          {match && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-xl animate-fade-in-up">
              <p className="text-green-800 font-semibold">🎉 ¡Has hecho match con <span className="text-[#30588C]">{match}</span>!</p>
            </div>
          )}
        </section>

        {/* Recomendaciones */}
        <aside className="w-full md:w-1/4 space-y-4 hidden md:block">
          <h3 className="text-lg font-bold text-[#30588C]">Recomendaciones</h3>
          <ul className="text-sm list-disc list-inside text-black space-y-1">
            <li>Luna - 92%</li>
            <li>Toby - 90%</li>
            <li>Michi - 88%</li>
          </ul>
          <div className="mt-4 text-xs text-gray-500">* Según tu test de compatibilidad</div>
        </aside>
      </main>
    </>
  );
}
