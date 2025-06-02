'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, PawPrint, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ResultadoPage() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    fotoPerfil: '/Perfil/Usuario1.jpeg', // imagen por defecto
  });

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario') || '';
    const foto = localStorage.getItem('fotoPerfil');
    setUsuario({
      nombre,
      fotoPerfil: foto && foto.trim() !== '' ? foto : '/Perfil/Usuario1.jpeg',
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfdfd] to-[#eaf3fb] px-6 py-12 text-black">
      <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-xl space-y-8 animate-fade-in text-center">
        <CheckCircle className="text-[#30588C] mx-auto" size={48} />
        <h1 className="text-4xl font-extrabold text-[#30588C]">¡Gracias por completar el test! 🐾</h1>
        <p className="text-gray-600 text-base max-w-xl mx-auto">
          Según tus respuestas, estamos preparando las mejores opciones para ti. Mientras tanto, aquí tienes un resumen de tus preferencias:
        </p>

        <div className="flex flex-col items-center">
          <Image
            src={usuario.fotoPerfil}
            alt="Foto perfil"
            width={80}
            height={80}
            className="rounded-full mb-2"
          />
          <p className="text-lg font-semibold text-[#30588C]">{usuario.nombre}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            ['Tipo de vivienda', 'Casa Propia'],
            ['Espacio exterior', 'Sí, patio grande'],
            ['Tiempo fuera de casa', '6 horas'],
            ['Preferencia de mascota', 'Ambos'],
            ['Experiencia previa', 'He cuidado gatos durante 3 años.'],
            ['Personalidad esperada', 'Tranquilo y cariñoso'],
            ['Otras mascotas', 'Sí, perros'],
            ['Alergias o restricciones', 'Ninguna'],
            ['Tamaño de mascota', 'Mediano'],
            ['Motivo de adopción', 'Quiero darle un hogar a un animal necesitado'],
          ].map(([titulo, descripcion], index) => (
            <div key={index} className="bg-[#f1f6fc] rounded-xl p-5 shadow">
              <h3 className="font-semibold text-[#30588C]">{titulo}</h3>
              <p className="text-gray-700">{descripcion}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <Link href="/compatibilidad">
            <Button className="bg-[#BF3952] text-white hover:bg-[#a53044] flex gap-2 items-center">
              <RefreshCw size={18} /> Repetir test
            </Button>
          </Link>
          <Link href="/Match">
            <Button className="bg-[#30588C] text-white hover:bg-[#254559] flex gap-2 items-center">
              <PawPrint size={18} /> Ver mis coincidencias
            </Button>
          </Link>
        </div>

        <div className="pt-6">
          <Image
            src="/Logo/logo1.png"
            alt="Logo MatchPet"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
