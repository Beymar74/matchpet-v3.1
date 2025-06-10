"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';
import { 
  Heart, 
  Dog, 
  Cat, 
  Calendar, 
  MapPin, 
  Star,
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  MessageCircle,
  Share2,
  Trash2,
  AlertCircle,
  SortAsc,
  Download
} from 'lucide-react';

const MisFavoritos = () => {
  const router = useRouter();
  const [vistaGrid, setVistaGrid] = useState(true);
  const [filtroEspecie, setFiltroEspecie] = useState('todos');
  const [filtroEdad, setFiltroEdad] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('reciente');
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  // Datos simulados de mascotas favoritas
  const mascotasFavoritas = [
    {
      id: 1,
      nombre: "Luna",
      tipo: "Gato",
      edad: "2 años",
      tamaño: "Mediano",
      sexo: "Hembra",
      imagen: "/api/placeholder/300/250",
      refugio: "Refugio Esperanza",
      ubicacion: "Santa Cruz, Las Palmas",
      descripcion: "Gata muy cariñosa y tranquila, perfecta para familias.",
      fechaGuardado: "2024-06-05",
      compatibilidad: 92,
      caracteristicas: ["Sociable", "Tranquila", "Castrada"],
      estado: "Disponible"
    },
    {
      id: 2,
      nombre: "Max",
      tipo: "Perro",
      edad: "3 años",
      tamaño: "Grande",
      sexo: "Macho",
      imagen: "/api/placeholder/300/250",
      refugio: "Fundación Animal Care",
      ubicacion: "Santa Cruz, Zona Norte",
      descripcion: "Perro muy activo y leal, ideal para familias con experiencia.",
      fechaGuardado: "2024-06-03",
      compatibilidad: 88,
      caracteristicas: ["Activo", "Leal", "Entrenado"],
      estado: "Disponible"
    },
    {
      id: 3,
      nombre: "Mimi",
      tipo: "Gato",
      edad: "1 año",
      tamaño: "Pequeño",
      sexo: "Hembra",
      imagen: "/api/placeholder/300/250",
      refugio: "Hogar Felino",
      ubicacion: "Santa Cruz, Plan 3000",
      descripcion: "Gatita joven muy juguetona y cariñosa.",
      fechaGuardado: "2024-06-01",
      compatibilidad: 85,
      caracteristicas: ["Juguetona", "Joven", "Cariñosa"],
      estado: "En proceso"
    },
    {
      id: 4,
      nombre: "Rocky",
      tipo: "Perro",
      edad: "5 años",
      tamaño: "Mediano",
      sexo: "Macho",
      imagen: "/api/placeholder/300/250",
      refugio: "Refugio Esperanza",
      ubicacion: "Santa Cruz, Las Palmas",
      descripcion: "Perro adulto muy equilibrado, perfecto para cualquier familia.",
      fechaGuardado: "2024-05-28",
      compatibilidad: 90,
      caracteristicas: ["Equilibrado", "Adulto", "Socializado"],
      estado: "Disponible"
    },
    {
      id: 5,
      nombre: "Bella",
      tipo: "Perro",
      edad: "6 meses",
      tamaño: "Pequeño",
      sexo: "Hembra",
      imagen: "/api/placeholder/300/250",
      refugio: "Fundación Patitas",
      ubicacion: "Santa Cruz, Centro",
      descripcion: "Cachorra muy dulce que busca su primera familia.",
      fechaGuardado: "2024-05-25",
      compatibilidad: 78,
      caracteristicas: ["Cachorra", "Dulce", "Primera familia"],
      estado: "Adoptada"
    }
  ];

  const eliminarDeFavoritos = (id) => {
    console.log(`Eliminar mascota ${id} de favoritos`);
    // Aquí iría la lógica para eliminar de favoritos
  };

  const solicitarAdopcion = (mascota) => {
    console.log(`Solicitar adopción de ${mascota.nombre}`);
    router.push(`/solicitar-adopcion/${mascota.id}`);
  };

  const verDetalles = (mascota) => {
    setMascotaSeleccionada(mascota);
  };

  const compartirMascota = (mascota) => {
    console.log(`Compartir ${mascota.nombre}`);
    // Lógica para compartir
  };

  const filtrarMascotas = () => {
    let mascotasFiltradas = [...mascotasFavoritas];

    // Filtro por especie
    if (filtroEspecie !== 'todos') {
      mascotasFiltradas = mascotasFiltradas.filter(m => 
        m.tipo.toLowerCase() === filtroEspecie
      );
    }

    // Filtro por edad
    if (filtroEdad !== 'todos') {
      mascotasFiltradas = mascotasFiltradas.filter(m => {
        if (filtroEdad === 'joven') return m.edad.includes('mes') || parseInt(m.edad) <= 2;
        if (filtroEdad === 'adulto') return parseInt(m.edad) >= 2 && parseInt(m.edad) <= 7;
        if (filtroEdad === 'senior') return parseInt(m.edad) > 7;
        return true;
      });
    }

    // Búsqueda por nombre
    if (busqueda) {
      mascotasFiltradas = mascotasFiltradas.filter(m =>
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.refugio.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Ordenamiento
    mascotasFiltradas.sort((a, b) => {
      switch (ordenamiento) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'compatibilidad':
          return b.compatibilidad - a.compatibilidad;
        case 'reciente':
        default:
          return new Date(b.fechaGuardado) - new Date(a.fechaGuardado);
      }
    });

    return mascotasFiltradas;
  };

  const mascotasFiltradas = filtrarMascotas();

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800 border-green-200';
      case 'En proceso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Adoptada': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <HeaderUsuario />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-[#BF3952]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#011526]">Mis Favoritos</h1>
                <p className="text-[#254559] text-lg">Mascotas guardadas ({mascotasFavoritas.length})</p>
              </div>
            </div>
          </div>

          {/* Filtros y controles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o refugio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6093BF] focus:border-transparent"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#254559]" />
                  <select
                    value={filtroEspecie}
                    onChange={(e) => setFiltroEspecie(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                  >
                    <option value="todos">Todas las especies</option>
                    <option value="perro">Perros</option>
                    <option value="gato">Gatos</option>
                  </select>
                </div>

                <select
                  value={filtroEdad}
                  onChange={(e) => setFiltroEdad(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                >
                  <option value="todos">Todas las edades</option>
                  <option value="joven">Joven (0-2 años)</option>
                  <option value="adulto">Adulto (2-7 años)</option>
                  <option value="senior">Senior (7+ años)</option>
                </select>

                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-[#254559]" />
                  <select
                    value={ordenamiento}
                    onChange={(e) => setOrdenamiento(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                  >
                    <option value="reciente">Más recientes</option>
                    <option value="nombre">Por nombre</option>
                    <option value="compatibilidad">Por compatibilidad</option>
                  </select>
                </div>

                {/* Vista toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setVistaGrid(true)}
                    className={`p-2 rounded-md transition-colors ${vistaGrid ? 'bg-white shadow-sm text-[#30588C]' : 'text-gray-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setVistaGrid(false)}
                    className={`p-2 rounded-md transition-colors ${!vistaGrid ? 'bg-white shadow-sm text-[#30588C]' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <button className="flex items-center space-x-2 bg-[#30588C] text-white px-4 py-2 rounded-lg hover:bg-[#254559] transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lista/Grid de mascotas */}
          {mascotasFiltradas.length > 0 ? (
            <div className={vistaGrid 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {mascotasFiltradas.map((mascota) => (
                vistaGrid ? (
                  // Vista Grid
                  <div key={mascota.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={mascota.imagen} 
                        alt={mascota.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => eliminarDeFavoritos(mascota.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart className="w-5 h-5 text-[#BF3952] fill-current" />
                      </button>
                      <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(mascota.estado)}`}>
                        {mascota.estado}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-[#011526]">{mascota.nombre}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{mascota.compatibilidad}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-[#254559] mb-2">
                        {mascota.tipo === 'Perro' ? 
                          <Dog className="w-4 h-4 mr-1" /> : 
                          <Cat className="w-4 h-4 mr-1" />
                        }
                        <span>{mascota.tipo} • {mascota.edad} • {mascota.sexo}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{mascota.refugio}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{mascota.descripcion}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {mascota.caracteristicas.slice(0, 2).map((caracteristica, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {caracteristica}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => verDetalles(mascota)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-[#6093BF] text-white px-3 py-2 rounded-lg hover:bg-[#30588C] transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver</span>
                        </button>
                        {mascota.estado === 'Disponible' && (
                          <button
                            onClick={() => solicitarAdopcion(mascota)}
                            className="flex-1 bg-[#BF3952] text-white px-3 py-2 rounded-lg hover:bg-[#a32e45] transition-colors text-sm"
                          >
                            Adoptar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Vista Lista
                  <div key={mascota.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={mascota.imagen} 
                          alt={mascota.nombre}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <span className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(mascota.estado)}`}>
                          {mascota.estado}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-[#011526]">{mascota.nombre}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{mascota.compatibilidad}% compatible</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-[#254559] mb-1">
                          {mascota.tipo === 'Perro' ? 
                            <Dog className="w-4 h-4 mr-1" /> : 
                            <Cat className="w-4 h-4 mr-1" />
                          }
                          <span>{mascota.tipo} • {mascota.edad} • {mascota.sexo} • {mascota.tamaño}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{mascota.refugio} - {mascota.ubicacion}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{mascota.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {mascota.caracteristicas.map((caracteristica, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {caracteristica}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => verDetalles(mascota)}
                          className="flex items-center space-x-1 bg-[#6093BF] text-white px-3 py-2 rounded-lg hover:bg-[#30588C] transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver detalles</span>
                        </button>
                        {mascota.estado === 'Disponible' && (
                          <button
                            onClick={() => solicitarAdopcion(mascota)}
                            className="bg-[#BF3952] text-white px-3 py-2 rounded-lg hover:bg-[#a32e45] transition-colors text-sm"
                          >
                            Adoptar
                          </button>
                        )}
                        <div className="flex space-x-1">
                          <button
                            onClick={() => compartirMascota(mascota)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => eliminarDeFavoritos(mascota.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            // Estado vacío
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {busqueda || filtroEspecie !== 'todos' || filtroEdad !== 'todos' 
                  ? 'No se encontraron mascotas' 
                  : 'Aún no tienes mascotas favoritas'
                }
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {busqueda || filtroEspecie !== 'todos' || filtroEdad !== 'todos'
                  ? 'Intenta cambiar los filtros de búsqueda para encontrar más resultados.'
                  : 'Explora nuestras mascotas disponibles y guarda tus favoritas para encontrarlas fácilmente aquí.'
                }
              </p>
              <button
                onClick={() => router.push('/explorar')}
                className="bg-[#BF3952] text-white px-6 py-3 rounded-lg hover:bg-[#a32e45] transition-colors"
              >
                Explorar mascotas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#011526]">
                  {mascotaSeleccionada.nombre}
                </h2>
                <button 
                  onClick={() => setMascotaSeleccionada(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <img 
                  src={mascotaSeleccionada.imagen} 
                  alt={mascotaSeleccionada.nombre}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Información básica</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Tipo:</span> {mascotaSeleccionada.tipo}</div>
                      <div><span className="font-medium">Edad:</span> {mascotaSeleccionada.edad}</div>
                      <div><span className="font-medium">Tamaño:</span> {mascotaSeleccionada.tamaño}</div>
                      <div><span className="font-medium">Sexo:</span> {mascotaSeleccionada.sexo}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Refugio</h4>
                    <div className="space-y-1 text-sm">
                      <div>{mascotaSeleccionada.refugio}</div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {mascotaSeleccionada.ubicacion}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Descripción</h4>
                  <p className="text-gray-700">{mascotaSeleccionada.descripcion}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Características</h4>
                  <div className="flex flex-wrap gap-2">
                    {mascotaSeleccionada.caracteristicas.map((caracteristica, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {caracteristica}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{mascotaSeleccionada.compatibilidad}% compatible contigo</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(mascotaSeleccionada.estado)}`}>
                    {mascotaSeleccionada.estado}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setMascotaSeleccionada(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                {mascotaSeleccionada.estado === 'Disponible' && (
                  <button 
                    onClick={() => solicitarAdopcion(mascotaSeleccionada)}
                    className="px-4 py-2 bg-[#BF3952] text-white rounded-lg hover:bg-[#a32e45] transition-colors"
                  >
                    Solicitar adopción
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MisFavoritos;