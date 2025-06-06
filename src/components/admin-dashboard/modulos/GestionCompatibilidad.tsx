// src/components/admin-dashboard/modulos/GestionCompatibilidad.tsx
import React, { useState } from 'react';
import { 
  Target,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Settings,
  Shield,
  Brain,
  BarChart3,
  Zap,
  TrendingUp,
  Users,
  Heart,
  Sliders,
  TestTube
} from 'lucide-react';

const GestionCompatibilidad = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasCompatibilidad = [
    {
      titulo: 'Precisión del Algoritmo',
      valor: 92.5,
      cambio: '+1.3% esta semana',
      color: 'blue',
      icon: Target,
      unidad: '%'
    },
    {
      titulo: 'Matches Exitosos',
      valor: 847,
      cambio: '+23 este mes',
      color: 'green',
      icon: Heart
    },
    {
      titulo: 'Tests A/B Activos',
      valor: 3,
      cambio: 'En progreso',
      color: 'purple',
      icon: TestTube
    },
    {
      titulo: 'Usuarios Evaluados',
      valor: 1204,
      cambio: 'Últimas 24h',
      color: 'orange',
      icon: Users
    }
  ];

  const accionesRapidas = [
    {
      titulo: 'Ajustar Pesos',
      descripcion: 'Configurar algoritmo',
      icon: Sliders,
      color: 'blue',
      badge: '5'
    },
    {
      titulo: 'Nuevo Test A/B',
      descripcion: 'Probar variaciones',
      icon: TestTube,
      color: 'purple'
    },
    {
      titulo: 'Análisis ML',
      descripcion: 'Machine Learning',
      icon: Brain,
      color: 'green'
    },
    {
      titulo: 'Reportes',
      descripcion: 'Métricas detalladas',
      icon: BarChart3,
      color: 'orange'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos', count: 1204 },
    { id: 'alta', label: 'Alta Compatibilidad', count: 847 },
    { id: 'media', label: 'Media Compatibilidad', count: 245 },
    { id: 'baja', label: 'Baja Compatibilidad', count: 112 },
    { id: 'testing', label: 'En Testing', count: 67 }
  ];

  const caracteristicas = [
    {
      id: 1,
      nombre: 'Tamaño de Mascota',
      peso: 25,
      impacto: 'Alto',
      estado: 'Activo',
      descripcion: 'Preferencia de tamaño del animal'
    },
    {
      id: 2,
      nombre: 'Experiencia Previa',
      peso: 20,
      impacto: 'Alto',
      estado: 'Activo',
      descripcion: 'Historial con mascotas similares'
    },
    {
      id: 3,
      nombre: 'Tiempo Disponible',
      peso: 18,
      impacto: 'Medio',
      estado: 'Activo',
      descripcion: 'Horas diarias de cuidado'
    },
    {
      id: 4,
      nombre: 'Espacio de Vivienda',
      peso: 15,
      impacto: 'Medio',
      estado: 'Activo',
      descripcion: 'Metros cuadrados disponibles'
    },
    {
      id: 5,
      nombre: 'Presencia de Niños',
      peso: 12,
      impacto: 'Medio',
      estado: 'Testing',
      descripcion: 'Compatibilidad con menores'
    },
    {
      id: 6,
      nombre: 'Otras Mascotas',
      peso: 10,
      impacto: 'Bajo',
      estado: 'Activo',
      descripcion: 'Convivencia con otros animales'
    }
  ];

  const testsAB = [
    {
      id: 1,
      nombre: 'Peso Experiencia vs Tamaño',
      descripcion: 'Comparar importancia de experiencia previa vs preferencia de tamaño',
      estado: 'En Progreso',
      usuarios: 234,
      mejora: '+2.1%',
      fechaInicio: '2024-05-15'
    },
    {
      id: 2,
      nombre: 'Algoritmo ML vs Reglas',
      descripcion: 'Machine Learning vs sistema basado en reglas',
      estado: 'Completado',
      usuarios: 500,
      mejora: '+5.3%',
      fechaInicio: '2024-04-20'
    },
    {
      id: 3,
      nombre: 'Factor Ubicación',
      descripcion: 'Incluir distancia geográfica en el matching',
      estado: 'En Progreso',
      usuarios: 178,
      mejora: '+0.8%',
      fechaInicio: '2024-06-01'
    }
  ];

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Testing': return 'bg-blue-100 text-blue-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Pausado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Compatibilidad</h1>
              <p className="text-gray-600 mt-1">Configurar algoritmo de matching y optimizar precisión</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nuevo Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasCompatibilidad.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.titulo}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.titulo}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.valor.toLocaleString()}{stat.unidad || ''}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.cambio}</p>
                </div>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accionesRapidas.map((accion, index) => {
            const Icon = accion.icon;
            return (
              <button
                key={accion.titulo}
                className={`flex flex-col items-center p-4 bg-${accion.color}-50 rounded-lg hover:bg-${accion.color}-100 transition-colors group relative`}
              >
                {accion.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {accion.badge}
                  </div>
                )}
                <Icon className={`h-8 w-8 text-${accion.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${accion.color}-900`}>{accion.titulo}</span>
                <span className={`text-xs text-${accion.color}-600 mt-1`}>{accion.descripcion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configuración de Características */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Pesos de Características</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <Sliders className="h-4 w-4" />
            <span>Ajustar Pesos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caracteristicas.map((caracteristica, index) => (
            <div
              key={caracteristica.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{caracteristica.nombre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{caracteristica.descripcion}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(caracteristica.estado)}`}>
                  {caracteristica.estado}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Peso</span>
                  <span className="text-sm font-medium">{caracteristica.peso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${caracteristica.peso}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactoColor(caracteristica.impacto)}`}>
                    {caracteristica.impacto} Impacto
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tests A/B */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Tests A/B Activos</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
            <TestTube className="h-4 w-4" />
            <span>Nuevo Test</span>
          </button>
        </div>

        <div className="space-y-4">
          {testsAB.map((test, index) => (
            <div
              key={test.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{test.nombre}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(test.estado)}`}>
                      {test.estado}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{test.descripcion}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{test.usuarios} usuarios</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-green-600 font-medium">{test.mejora}</span>
                    </div>
                    <div>
                      Inicio: {new Date(test.fechaInicio).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Rendimiento */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Rendimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Precisión General</h3>
            <p className="text-2xl font-bold text-blue-600">92.5%</p>
            <p className="text-sm text-gray-500">+1.3% vs mes anterior</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Tiempo de Respuesta</h3>
            <p className="text-2xl font-bold text-green-600">1.2s</p>
            <p className="text-sm text-gray-500">-0.3s mejora</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Score ML</h3>
            <p className="text-2xl font-bold text-purple-600">0.847</p>
            <p className="text-sm text-gray-500">F1-Score</p>
          </div>
        </div>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración Avanzada
          </h2>
          <p className="text-gray-600 mb-6">
            Ajusta los parámetros del algoritmo de compatibilidad y machine learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Configurar Algoritmo</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Brain className="h-5 w-5" />
              <span>Machine Learning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionCompatibilidad;