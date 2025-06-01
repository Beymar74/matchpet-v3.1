'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const VerPerfilPage = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    correo: '',
    rol: '',
    fotoPerfil: '/Perfil/Usuario1.jpeg',
    fechaRegistro: '',
  });

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario') || 'Usuario';
    const correo = localStorage.getItem('email') || 'correo@ejemplo.com';
    const rol = localStorage.getItem('rol') || 'Adoptante';
    const foto = localStorage.getItem('fotoPerfil') || '/Perfil/Usuario1.jpeg';
    const fecha = localStorage.getItem('fechaRegistro') || '01/06/2025';

    setPerfil({ nombre, correo, rol, fotoPerfil: foto, fechaRegistro: fecha });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-16">
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
          <p className="text-sm text-[#BF3952] font-medium">Rol: {perfil.rol}</p>
          <p className="text-sm text-gray-500">Registrado desde: {perfil.fechaRegistro}</p>
        </div>

        <Link href="/EdicionPerfilAdoptante">
          <button className="mt-6 bg-[#30588C] hover:bg-[#254559] text-white px-6 py-2 rounded-xl text-sm font-medium transition">
            Editar Perfil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerPerfilPage;
