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
  Building2, 
  Shield, 
  Award, 
  Camera,
  Settings,
  MapPin,
  Clock,
  Star,
  Trophy,
  PawPrint,
  Users,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

// Importa tu header
import HeaderRefugio from '@/components/layout/HeaderRefugio';

const VerPerfilRefugioPage = () => {
  const [perfil, setPerfil] = useState({
    nombreRefugio: '',
    correo: '',
    telefono: '',
    direccion: '',
    fotoRefugio: '/Refugio/refugio1.jpeg',
    fechaRegistro: '',
    ubicacion: 'La Paz, Bolivia',
    licencia: 'REF-LP-2024-001',
    estado: 'Verificado',
    capacidad: 50,
    descripcion: ''
  });

  const [estadisticas, setEstadisticas] = useState({
    mascotasActuales: 32,
    adopcionesExitosas: 145,
    solicitudesPendientes: 8,
    voluntarios: 12
  });

  const [logros, setLogros] = useState([
    { nombre: 'Refugio Certificado', icono: '🏆', completado: true },
    { nombre: '100+ Adopciones', icono: '❤️', completado: true },
    { nombre: 'Refugio del Mes', icono: '⭐', completado: true },
    { nombre: 'Refugio Premium', icono: '👑', completado: false }
  ]);

  useEffect(() => {
    const nombreRefugio = localStorage.getItem('nombreRefugio') || 'Mi Refugio';
    const correo = localStorage.getItem('email') || 'refugio@ejemplo.com';
    const telefono = localStorage.getItem('telefono') || 'No registrado';
    const direccion = localStorage.getItem('direccion') || 'Dirección no registrada';
    const foto = localStorage.getItem('fotoRefugio') || '/Refugio/refugio1.jpeg';
    const fecha = localStorage.getItem('fechaRegistro') || '01/01/2024';
    const descripcion = localStorage.getItem('descripcionRefugio') || 'Refugio dedicado al cuidado y bienestar animal';

    setPerfil({ 
      nombreRefugio, 
      correo, 
      telefono, 
      direccion,
      fotoRefugio: foto, 
      fechaRegistro: fecha,
      ubicacion: 'La Paz, Bolivia',
      licencia: 'REF-LP-2024-001',
      estado: 'Verificado',
      capacidad: 50,
      descripcion
    });
  }, []);

  return (
    <>
      <HeaderRefugio />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 pt-24 px-4 relative overflow-hidden">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-64 right-20 w-48 h-48 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tarjeta principal del refugio */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
                
                {/* Header de la tarjeta */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4E9F3D] to-[#30588C] rounded-2xl opacity-10"></div>
                  <div className="relative p-6 text-center">
                    
                    {/* Foto del refugio con overlay */}
                    <div className="relative inline-block">
                      <div className="relative">
                        <Image
                          src={perfil.fotoRefugio}
                          alt="Foto del refugio"
                          width={140}
                          height={140}
                          className="mx-auto rounded-full border-4 border-white shadow-2xl object-cover"
                        />
                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-[#4E9F3D] to-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Badge de estado */}
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {perfil.estado}
                      </div>
                    </div>

                    {/* Información básica */}
                    <div className="mt-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{perfil.nombreRefugio}</h2>
                      <div className="flex items-center justify-center gap-2 text-[#4E9F3D] font-semibold mb-2">
                        <Building2 className="w-4 h-4" />
                        Refugio de Animales
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {perfil.ubicacion}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[#30588C] font-medium mb-2">
                        <Shield className="w-4 h-4" />
                        Licencia: {perfil.licencia}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                        <Home className="w-4 h-4" />
                        Capacidad: {perfil.capacidad} mascotas
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción del refugio */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#4E9F3D]" />
                    Sobre Nuestro Refugio
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed">
                    {perfil.descripcion}
                  </p>
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#4E9F3D]" />
                      Información de Contacto
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-[#4E9F3D]" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-800">{perfil.correo}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-[#4E9F3D]" />
                        <div>
                          <p className="text-sm text-gray-600">Teléfono</p>
                          <p className="font-medium text-gray-800">{perfil.telefono}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-[#4E9F3D]" />
                        <div>
                          <p className="text-sm text-gray-600">Dirección</p>
                          <p className="font-medium text-gray-800">{perfil.direccion}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#4E9F3D]" />
                      Información del Refugio
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#4E9F3D]" />
                        <div>
                          <p className="text-sm text-gray-600">Registrado desde</p>
                          <p className="font-medium text-gray-800">{perfil.fechaRegistro}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">Estado</p>
                          <p className="font-medium text-green-700">Refugio Verificado</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-600">Ocupación</p>
                          <p className="font-medium text-blue-700">{estadisticas.mascotasActuales}/{perfil.capacidad} mascotas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link href="/EdicionPerfilRefugio" className="group">
                    <button className="w-full bg-gradient-to-r from-[#4E9F3D] to-green-600 hover:from-[#3B7A2B] hover:to-green-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Editar Perfil
                      </div>
                    </button>
                  </Link>

                  <Link href="/PantallaGestionMascotas" className="group">
                    <button className="w-full bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <PawPrint className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Mis Mascotas
                      </div>
                    </button>
                  </Link>

                  <Link href="/SolicitudesAdopcion" className="group">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Solicitudes
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar con estadísticas y logros */}
            <div className="space-y-6">
              
              {/* Estadísticas del refugio */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#4E9F3D] mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Estadísticas del Refugio
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl">
                    <div className="text-2xl font-bold text-[#4E9F3D] mb-1">{estadisticas.mascotasActuales}</div>
                    <div className="text-sm text-gray-600">Mascotas Actuales</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-[#30588C] mb-1">{estadisticas.adopcionesExitosas}</div>
                    <div className="text-sm text-gray-600">Adopciones Exitosas</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{estadisticas.solicitudesPendientes}</div>
                    <div className="text-sm text-gray-600">Solicitudes Pendientes</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{estadisticas.voluntarios}</div>
                    <div className="text-sm text-gray-600">Voluntarios Activos</div>
                  </div>
                </div>
              </div>

              {/* Logros del refugio */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#4E9F3D] mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Reconocimientos
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
                          {logro.completado ? 'Obtenido' : 'En progreso'}
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

              {/* Estado de ocupación */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#4E9F3D] mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Estado del Refugio
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Ocupación</span>
                      <span>{Math.round((estadisticas.mascotasActuales / perfil.capacidad) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-[#4E9F3D] to-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(estadisticas.mascotasActuales / perfil.capacidad) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {estadisticas.mascotasActuales} de {perfil.capacidad} espacios ocupados
                    </p>
                  </div>
                  
                  {estadisticas.mascotasActuales >= perfil.capacidad * 0.9 && (
                    <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <p className="text-sm text-orange-700">Refugio cerca de su capacidad máxima</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#4E9F3D] mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Acciones Rápidas
                </h3>
                
                <div className="space-y-3">
                  <Link href="/voluntarios" className="block">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 group">
                      <Users className="w-5 h-5 text-[#30588C] group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-800">Gestionar Voluntarios</span>
                    </button>
                  </Link>
                  
                  <Link href="/reportes" className="block">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 group">
                      <FileText className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-800">Ver Reportes</span>
                    </button>
                  </Link>
                  
                  <Link href="/configuracion-refugio" className="block">
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

export default VerPerfilRefugioPage;