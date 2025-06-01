'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Importa tu header
import HeaderUsuario from '@/components/layout/HeaderUsuario';

const VerPerfilPage = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    correo: '',
    rol: '',
    telefono: '',
    fotoPerfil: '/Perfil/Usuario1.jpeg',
    fechaRegistro: '',
  });

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario') || 'Usuario';
    const correo = localStorage.getItem('email') || 'correo@ejemplo.com';
    const rol = localStorage.getItem('rol') || 'Adoptante';
    const telefono = localStorage.getItem('telefono') || 'No registrado';
    const foto = localStorage.getItem('fotoPerfil') || '/Perfil/Usuario1.jpeg';
    const fecha = localStorage.getItem('fechaRegistro') || '01/06/2025';

    setPerfil({ nombre, correo, rol, telefono, fotoPerfil: foto, fechaRegistro: fecha });
  }, []);

  return (
    <>
      <HeaderUsuario />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-16 pt-24">
        {/* Ajusta pt-24 según altura de tu header */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-xl text-center">
          <h2 className="text-2xl font-bold text-[#30588C] mb-6">Mi Perfil</h2>

          <Image
            src={perfil.fotoPerfil}
            alt="Foto de perfil"
            width={120}
            height={120}
            className="mx-auto rounded-full border-4 border-[#30588C]"
          />

          <div className="mt-4 space-y-1">
            <p className="text-lg font-semibold text-gray-800">{perfil.nombre}</p>
            <p className="text-sm text-gray-600">{perfil.correo}</p>
            <p className="text-sm text-gray-600">Teléfono: {perfil.telefono}</p>
            <p className="text-sm text-[#BF3952] font-medium">Rol: {perfil.rol}</p>
            <p className="text-sm text-gray-500">Registrado desde: {perfil.fechaRegistro}</p>
          </div>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link href="/EdicionPerfilAdoptante">
              <button className="bg-[#30588C] hover:bg-[#254559] text-white px-6 py-2 rounded-xl text-sm font-medium transition">
                Editar Perfil
              </button>
            </Link>

            <Link href="/ConfiguracionPreferencias">
              <button className="bg-[#BF3952] hover:bg-[#8B2B3B] text-white px-6 py-2 rounded-xl text-sm font-medium transition">
                Preferencias de Adopción
              </button>
            </Link>

            <Link href="/EntornoHogar">
              <button className="bg-[#4E9F3D] hover:bg-[#3B7A2B] text-white px-6 py-2 rounded-xl text-sm font-medium transition">
                Registro Entorno del Hogar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerPerfilPage;
