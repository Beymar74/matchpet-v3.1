'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Edit3, 
  Heart, 
  Home, 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Shield, 
  Award, 
  Camera,
  Settings,
  MapPin,
  Clock,
  Star,
  Trophy,
  PawPrint
} from 'lucide-react';

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
    ubicacion: 'La Paz, Bolivia',
    miembro: 'Premium',
    puntos: 1250
  });

  const [estadisticas, setEstadisticas] = useState({
    matches: 12,
    favoritos: 8,
    visitas: 45,
    adopciones: 2
  });

  const [logros, setLogros] = useState([
    { nombre: 'Primer Match', icono: '🎯', completado: true },
    { nombre: 'Amante de Mascotas', icono: '❤️', completado: true },
    { nombre: 'Explorador', icono: '🔍', completado: true },
    { nombre: 'Adopción Exitosa', icono: '🏆', completado: false }
  ]);

  useEffect(() => {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) return;
  
    fetch(`/api/usuario/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        setPerfil({
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono ?? 'No registrado',
          fotoPerfil: data.fotoPerfil ?? '/Perfil/Usuario1.jpeg',
          fechaRegistro: data.fechaRegistro ?? '01/06/2025',
          rol: data.rol,
          ubicacion: 'La Paz, Bolivia',
          miembro: 'Premium',
          puntos: 1250
        });
      })
      .catch(error => console.error('Error al cargar perfil:', error));
  }, []);
  
  if (!perfil || !perfil.nombre) {
    return <p className="text-center mt-20">Cargando perfil...</p>;
  }
  
  return (
    <>
      <HeaderUsuario />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-24 px-4 relative overflow-hidden">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-64 right-20 w-48 h-48 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto py-8 relative z-10">
          
          {/* Header de la página */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#30588C] to-[#BF3952] bg-clip-text text-transparent mb-2">
              Mi Perfil
            </h1>
            <p className="text-gray-600">Gestiona tu información y preferencias</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tarjeta principal del perfil */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
                
                {/* Header de la tarjeta */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#30588C] to-[#BF3952] rounded-2xl opacity-10"></div>
                  <div className="relative p-6 text-center">
                    
                    {/* Foto de perfil con overlay */}
                    <div className="relative inline-block">
                      <div className="relative">
                        <Image
                          src={perfil.fotoPerfil}
                          alt="Foto de perfil"
                          width={140}
                          height={140}
                          className="mx-auto rounded-full border-4 border-white shadow-2xl"
                        />
                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-[#BF3952] to-pink-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Badge de estado */}
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {perfil.miembro}
                      </div>
                    </div>

                    {/* Información básica */}
                    <div className="mt-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{perfil.nombre}</h2>
                      <div className="flex items-center justify-center gap-2 text-[#BF3952] font-semibold mb-2">
                        <Shield className="w-4 h-4" />
                        {perfil.rol}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {perfil.ubicacion}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[#30588C] font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        {perfil.puntos} puntos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#30588C]" />
                      Información Personal
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-[#30588C]" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-800">{perfil.correo}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-[#30588C]" />
                        <div>
                          <p className="text-sm text-gray-600">Teléfono</p>
                          <p className="font-medium text-gray-800">{perfil.telefono}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#30588C]" />
                      Información de Cuenta
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#30588C]" />
                        <div>
                          <p className="text-sm text-gray-600">Miembro desde</p>
                          <p className="font-medium text-gray-800">{perfil.fechaRegistro}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <Trophy className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">Estado</p>
                          <p className="font-medium text-green-700">Cuenta Verificada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/EdicionPerfilAdoptante" className="group">
                    <button className="w-full bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Editar Perfil
                      </div>
                    </button>
                  </Link>

                  <Link href="/ConfiguracionPreferencias" className="group">
                    <button className="w-full bg-gradient-to-r from-[#BF3952] to-pink-600 hover:from-[#8B2B3B] hover:to-pink-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Preferencias
                      </div>
                    </button>
                  </Link>

                  <Link href="/EntornoHogar" className="group">
                    <button className="w-full bg-gradient-to-r from-[#4E9F3D] to-green-600 hover:from-[#3B7A2B] hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Mi Hogar
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar con estadísticas y logros */}
            <div className="space-y-6">
              
              {/* Estadísticas */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#30588C] mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Mis Estadísticas
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-[#30588C] mb-1">{estadisticas.matches}</div>
                    <div className="text-sm text-gray-600">Matches</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl">
                    <div className="text-2xl font-bold text-[#BF3952] mb-1">{estadisticas.favoritos}</div>
                    <div className="text-sm text-gray-600">Favoritos</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">{estadisticas.visitas}</div>
                    <div className="text-sm text-gray-600">Visitas</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{estadisticas.adopciones}</div>
                    <div className="text-sm text-gray-600">Adopciones</div>
                  </div>
                </div>
              </div>

              {/* Logros */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#30588C] mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Mis Logros
                </h3>
                
                <div className="space-y-3">
                  {logros.map((logro, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        logro.completado 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                          : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-2xl">{logro.icono}</div>
                      <div className="flex-1">
                        <p className={`font-semibold ${logro.completado ? 'text-gray-800' : 'text-gray-500'}`}>
                          {logro.nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {logro.completado ? 'Completado' : 'En progreso'}
                        </p>
                      </div>
                      {logro.completado && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#30588C] mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Acciones Rápidas
                </h3>
                
                <div className="space-y-3">
                  <Link href="/match" className="block">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-300 group">
                      <PawPrint className="w-5 h-5 text-[#30588C] group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-800">Buscar Mascotas</span>
                    </button>
                  </Link>
                  
                  <Link href="/favoritos" className="block">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 rounded-xl transition-all duration-300 group">
                      <Heart className="w-5 h-5 text-[#BF3952] group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-800">Ver Favoritos</span>
                    </button>
                  </Link>
                  
                  <Link href="/configuracion" className="block">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 rounded-xl transition-all duration-300 group">
                      <Settings className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-800">Configuración</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerPerfilPage;