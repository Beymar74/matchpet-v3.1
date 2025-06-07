"use client";
import React, { useState } from 'react';
import HeaderRefugio from '@/components/layout/HeaderRefugio';
import { 
  PlusCircle, 
  Heart, 
  Users, 
  FileText, 
  Bell, 
  Search, 
  Filter,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Camera,
  BarChart3,
  Settings,
  Home
} from 'lucide-react';
import Exportador from '@/components/Exportador';

const RefugioDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMascota, setSelectedMascota] = useState(null);

  // Datos de ejemplo
  const refugioInfo = {
    nombre: "Refugio Esperanza Animal",
    ubicacion: "Santa Cruz de la Sierra, Bolivia",
    telefono: "+591 3 123-4567",
    email: "contacto@esperanzaanimal.org",
    capacidad: 150,
    ocupacion: 89
  };

  const estadisticas = {
    mascotasActivas: 42,
    adopcionesPendientes: 8,
    adopcionesCompletadas: 156,
    solicitudesNuevas: 12
  };

  const mascotas = [
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Mestizo",
      edad: "2 años",
      estado: "Disponible",
      compatibilidad: 85,
      foto: "🐕",
      fechaIngreso: "2024-05-15",
      solicitudes: 3
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: "1 año",
      estado: "En proceso",
      compatibilidad: 92,
      foto: "🐱",
      fechaIngreso: "2024-06-01",
      solicitudes: 5
    },
    {
      id: 3,
      nombre: "Toby",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      estado: "Disponible",
      compatibilidad: 78,
      foto: "🦮",
      fechaIngreso: "2024-04-20",
      solicitudes: 2
    }
  ];

  const solicitudesPendientes = [
    {
      id: 1,
      adoptante: "María García",
      mascota: "Max",
      fecha: "2024-06-02",
      compatibilidad: 85,
      estado: "Pendiente"
    },
    {
      id: 2,
      adoptante: "Carlos Mendez",
      mascota: "Luna",
      fecha: "2024-06-01",
      compatibilidad: 92,
      estado: "En evaluación"
    }
  ];

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#BF3952]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mascotas Activas</p>
              <p className="text-3xl font-bold text-[#011526]">{estadisticas.mascotasActivas}</p>
            </div>
            <Heart className="h-12 w-12 text-[#BF3952]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#30588C]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Solicitudes Pendientes</p>
              <p className="text-3xl font-bold text-[#011526]">{estadisticas.adopcionesPendientes}</p>
            </div>
            <FileText className="h-12 w-12 text-[#30588C]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#6093BF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adopciones Exitosas</p>
              <p className="text-3xl font-bold text-[#011526]">{estadisticas.adopcionesCompletadas}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-[#6093BF]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#254559]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Solicitudes Nuevas</p>
              <p className="text-3xl font-bold text-[#011526]">{estadisticas.solicitudesNuevas}</p>
            </div>
            <Bell className="h-12 w-12 text-[#254559]" />
          </div>
        </div>
      </div>

      {/* Gráfico de ocupación */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#011526] mb-4">Ocupación del Refugio</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Capacidad utilizada</span>
              <span className="text-sm font-medium text-[#011526]">{refugioInfo.ocupacion}/{refugioInfo.capacidad}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#BF3952] h-3 rounded-full transition-all duration-300"
                style={{ width: `${(refugioInfo.ocupacion / refugioInfo.capacidad) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#BF3952]">
            {Math.round((refugioInfo.ocupacion / refugioInfo.capacidad) * 100)}%
          </div>
        </div>
      </div>

      {/* Solicitudes recientes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#011526]">Solicitudes Recientes</h3>
          <button className="text-[#30588C] hover:text-[#254559] font-medium text-sm">
            Ver todas
          </button>
        </div>
        <div className="space-y-3">
          {solicitudesPendientes.map((solicitud) => (
            <div key={solicitud.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#6093BF] rounded-full flex items-center justify-center text-white font-semibold">
                  {solicitud.adoptante.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-[#011526]">{solicitud.adoptante}</p>
                  <p className="text-sm text-gray-600">Solicita adoptar a {solicitud.mascota}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-[#30588C] font-medium">{solicitud.compatibilidad}% compatibilidad</span>
                <button className="bg-[#BF3952] text-white px-3 py-1 rounded-md hover:bg-[#254559] text-sm">
                  Evaluar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMascotas = () => (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-[#011526]">Gestión de Mascotas</h2>
        <button className="bg-[#BF3952] text-white px-4 py-2 rounded-lg hover:bg-[#254559] flex items-center space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span>Agregar Mascota</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mascota por nombre, raza..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]">
              <option>Todas las especies</option>
              <option>Perro</option>
              <option>Gato</option>
              <option>Otros</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]">
              <option>Todos los estados</option>
              <option>Disponible</option>
              <option>En proceso</option>
              <option>Adoptado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de mascotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">{mascota.foto}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mascota.estado)}`}>
                  {mascota.estado}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.nombre}</h3>
              
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
                <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
                <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
                <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <span className="text-gray-600">Compatibilidad promedio:</span>
                  <span className="font-bold text-[#30588C] ml-1">{mascota.compatibilidad}%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Solicitudes:</span>
                  <span className="font-bold text-[#BF3952] ml-1">{mascota.solicitudes}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-[#30588C] text-white py-2 px-3 rounded-md hover:bg-[#254559] text-sm flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>Ver</span>
                </button>
                <button className="flex-1 bg-[#6093BF] text-white py-2 px-3 rounded-md hover:bg-[#30588C] text-sm flex items-center justify-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del Refugio */}
      <HeaderRefugio />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-[#011526] text-white">
                <h2 className="font-semibold">Panel de Control</h2>
              </div>
              
              <div className="p-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Home },
                  { id: 'mascotas', label: 'Mis Mascotas', icon: Heart },
                  { id: 'adopciones', label: 'Adopciones', icon: Users },
                  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
                  { id: 'configuracion', label: 'Configuración', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#BF3952] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Info del refugio */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-[#011526] mb-3">Información de Contacto</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{refugioInfo.telefono}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{refugioInfo.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'mascotas' && renderMascotas()}
            {activeTab === 'adopciones' && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="h-16 w-16 text-[#6093BF] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#011526] mb-2">Gestión de Adopciones</h2>
                <p className="text-gray-600 mb-4">Administra las solicitudes de adopción y el seguimiento post-adopción</p>
                <button className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]">
                  Próximamente
                </button>
              </div>
            )}
            {activeTab === 'reportes' && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Exportador />
              </div>
            )}
            {activeTab === 'configuracion' && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Settings className="h-16 w-16 text-[#254559] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#011526] mb-2">Configuración del Refugio</h2>
                <p className="text-gray-600 mb-4">Actualiza la información de tu refugio y preferencias</p>
                <button className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]">
                  Próximamente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefugioDashboard;