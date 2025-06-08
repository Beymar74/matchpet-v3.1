import React, { useState, useEffect } from 'react';
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
  TestTube,
  X,
  Save,
  Play,
  Pause,
  Trash2,
  ChevronDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const GestionCompatibilidad = () => {
  // Estados principales
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [modalEditarCaracteristica, setModalEditarCaracteristica] = useState(null);
  const [modalNuevoTest, setModalNuevoTest] = useState(false);
  const [modalConfiguracion, setModalConfiguracion] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  // Estados de datos
  const [estadisticas, setEstadisticas] = useState([
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
  ]);

  const [caracteristicas, setCaracteristicas] = useState([
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
  ]);

  const [testsAB, setTestsAB] = useState([
    {
      id: 1,
      nombre: 'Peso Experiencia vs Tamaño',
      descripcion: 'Comparar importancia de experiencia previa vs preferencia de tamaño',
      estado: 'En Progreso',
      usuarios: 234,
      mejora: '+2.1%',
      fechaInicio: '2024-05-15',
      fechaFin: null,
      variantes: ['Control: Exp 20%, Tamaño 25%', 'Variante: Exp 30%, Tamaño 15%']
    },
    {
      id: 2,
      nombre: 'Algoritmo ML vs Reglas',
      descripcion: 'Machine Learning vs sistema basado en reglas',
      estado: 'Completado',
      usuarios: 500,
      mejora: '+5.3%',
      fechaInicio: '2024-04-20',
      fechaFin: '2024-05-20',
      variantes: ['Control: Reglas', 'Variante: ML']
    },
    {
      id: 3,
      nombre: 'Factor Ubicación',
      descripcion: 'Incluir distancia geográfica en el matching',
      estado: 'En Progreso',
      usuarios: 178,
      mejora: '+0.8%',
      fechaInicio: '2024-06-01',
      fechaFin: null,
      variantes: ['Control: Sin ubicación', 'Variante: Con ubicación']
    }
  ]);

  const [configuracion, setConfiguracion] = useState({
    umbralCompatibilidad: 75,
    tiempoRespuesta: 1200,
    algoritmoML: true,
    factorUbicacion: false,
    reentrenamiento: 'semanal'
  });

  // Datos para formularios
  const [formCaracteristica, setFormCaracteristica] = useState({
    peso: 0,
    estado: 'Activo',
    descripcion: ''
  });

  const [formTest, setFormTest] = useState({
    nombre: '',
    descripcion: '',
    duracion: 30,
    porcentajeUsuarios: 50,
    variantes: ['Control', 'Variante A']
  });

  const accionesRapidas = [
    {
      titulo: 'Ajustar Pesos',
      descripcion: 'Configurar algoritmo',
      icon: Sliders,
      color: 'blue',
      badge: caracteristicas.filter(c => c.estado === 'Testing').length.toString(),
      action: () => setModalConfiguracion(true)
    },
    {
      titulo: 'Nuevo Test A/B',
      descripcion: 'Probar variaciones',
      icon: TestTube,
      color: 'purple',
      action: () => setModalNuevoTest(true)
    },
    {
      titulo: 'Análisis ML',
      descripcion: 'Machine Learning',
      icon: Brain,
      color: 'green',
      action: () => ejecutarAnalisisML()
    },
    {
      titulo: 'Reportes',
      descripcion: 'Métricas detalladas',
      icon: BarChart3,
      color: 'orange',
      action: () => generarReporte()
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos', count: caracteristicas.length },
    { id: 'alta', label: 'Alto Impacto', count: caracteristicas.filter(c => c.impacto === 'Alto').length },
    { id: 'media', label: 'Medio Impacto', count: caracteristicas.filter(c => c.impacto === 'Medio').length },
    { id: 'baja', label: 'Bajo Impacto', count: caracteristicas.filter(c => c.impacto === 'Bajo').length },
    { id: 'testing', label: 'En Testing', count: caracteristicas.filter(c => c.estado === 'Testing').length }
  ];

  // Funciones utilitarias
  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const getImpactoColor = (impacto) => {
    switch (impacto) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Testing': return 'bg-blue-100 text-blue-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Pausado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Funciones de acciones
  const editarCaracteristica = (caracteristica) => {
    setFormCaracteristica({
      peso: caracteristica.peso,
      estado: caracteristica.estado,
      descripcion: caracteristica.descripcion
    });
    setModalEditarCaracteristica(caracteristica);
  };

  const guardarCaracteristica = () => {
    setCaracteristicas(prev => prev.map(c => 
      c.id === modalEditarCaracteristica.id 
        ? { ...c, ...formCaracteristica }
        : c
    ));
    setModalEditarCaracteristica(null);
    mostrarNotificacion('Característica actualizada correctamente');
    
    // Simular actualización de estadísticas
    setTimeout(() => {
      setEstadisticas(prev => prev.map(stat => 
        stat.titulo === 'Precisión del Algoritmo'
          ? { ...stat, valor: stat.valor + 0.1 }
          : stat
      ));
    }, 1000);
  };

  const crearTestAB = () => {
    const nuevoTest = {
      id: testsAB.length + 1,
      nombre: formTest.nombre,
      descripcion: formTest.descripcion,
      estado: 'En Progreso',
      usuarios: 0,
      mejora: '0%',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: null,
      variantes: formTest.variantes
    };

    setTestsAB(prev => [...prev, nuevoTest]);
    setModalNuevoTest(false);
    setFormTest({
      nombre: '',
      descripcion: '',
      duracion: 30,
      porcentajeUsuarios: 50,
      variantes: ['Control', 'Variante A']
    });
    mostrarNotificacion('Test A/B creado exitosamente');

    // Actualizar estadística de tests activos
    setEstadisticas(prev => prev.map(stat => 
      stat.titulo === 'Tests A/B Activos'
        ? { ...stat, valor: stat.valor + 1 }
        : stat
    ));
  };

  const pausarTest = (testId) => {
    setTestsAB(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, estado: test.estado === 'Pausado' ? 'En Progreso' : 'Pausado' }
        : test
    ));
    mostrarNotificacion('Estado del test actualizado');
  };

  const eliminarTest = (testId) => {
    setTestsAB(prev => prev.filter(test => test.id !== testId));
    mostrarNotificacion('Test eliminado correctamente');
    
    // Actualizar estadística
    setEstadisticas(prev => prev.map(stat => 
      stat.titulo === 'Tests A/B Activos'
        ? { ...stat, valor: Math.max(0, stat.valor - 1) }
        : stat
    ));
  };

  const ejecutarAnalisisML = () => {
    mostrarNotificacion('Iniciando análisis de Machine Learning...', 'info');
    
    // Simular análisis
    setTimeout(() => {
      setEstadisticas(prev => prev.map(stat => 
        stat.titulo === 'Precisión del Algoritmo'
          ? { ...stat, valor: 93.2, cambio: '+0.7% con ML' }
          : stat
      ));
      mostrarNotificacion('Análisis ML completado. Precisión mejorada');
    }, 3000);
  };

  const generarReporte = () => {
    mostrarNotificacion('Generando reporte de métricas...', 'info');
    
    // Simular generación de reporte
    setTimeout(() => {
      const blob = new Blob(['Reporte de Compatibilidad - ' + new Date().toLocaleDateString()], 
        { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte-compatibilidad.txt';
      a.click();
      mostrarNotificacion('Reporte descargado exitosamente');
    }, 2000);
  };

  // Filtrar características
  const caracteristicasFiltradas = caracteristicas.filter(caracteristica => {
    const cumpleFiltro = filtroActivo === 'todos' || 
      (filtroActivo === 'alta' && caracteristica.impacto === 'Alto') ||
      (filtroActivo === 'media' && caracteristica.impacto === 'Medio') ||
      (filtroActivo === 'baja' && caracteristica.impacto === 'Bajo') ||
      (filtroActivo === 'testing' && caracteristica.estado === 'Testing');
    
    const cumpleBusqueda = caracteristica.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      caracteristica.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltro && cumpleBusqueda;
  });

  // Simulación de actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setEstadisticas(prev => prev.map(stat => {
        if (stat.titulo === 'Usuarios Evaluados') {
          return { ...stat, valor: stat.valor + Math.floor(Math.random() * 3) };
        }
        return stat;
      }));
    }, 10000); // Actualizar cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Notificación */}
      {notificacion && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notificacion.tipo === 'success' ? 'bg-green-100 text-green-800' :
          notificacion.tipo === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notificacion.tipo === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{notificacion.mensaje}</span>
          </div>
        </div>
      )}

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
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Sistema Activo</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setModalNuevoTest(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Test</span>
            </button>
            <button 
              onClick={generarReporte}
              className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.titulo}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
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
                onClick={accion.action}
                className={`flex flex-col items-center p-4 bg-${accion.color}-50 rounded-lg hover:bg-${accion.color}-100 transition-all group relative transform hover:scale-105`}
              >
                {accion.badge && parseInt(accion.badge) > 0 && (
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

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
            {filtros.map(filtro => (
              <button
                key={filtro.id}
                onClick={() => setFiltroActivo(filtro.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filtroActivo === filtro.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filtro.label} ({filtro.count})
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar características..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Configuración de Características */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Pesos de Características ({caracteristicasFiltradas.length})
          </h2>
          <button 
            onClick={() => setModalConfiguracion(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Sliders className="h-4 w-4" />
            <span>Configuración Global</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caracteristicasFiltradas.map((caracteristica, index) => (
            <div
              key={caracteristica.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
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
                    <button 
                      onClick={() => editarCaracteristica(caracteristica)}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors">
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
          <button 
            onClick={() => setModalNuevoTest(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TestTube className="h-4 w-4" />
            <span>Nuevo Test</span>
          </button>
        </div>

        <div className="space-y-4">
          {testsAB.map((test, index) => (
            <div
              key={test.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
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
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-2">
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
                  <div className="text-xs text-gray-500">
                    <strong>Variantes:</strong> {test.variantes.join(' | ')}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => pausarTest(test.id)}
                    className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                    title={test.estado === 'Pausado' ? 'Reanudar' : 'Pausar'}
                  >
                    {test.estado === 'Pausado' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => eliminarTest(test.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
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
            <p className="text-2xl font-bold text-blue-600">
              {estadisticas.find(s => s.titulo === 'Precisión del Algoritmo')?.valor}%
            </p>
            <p className="text-sm text-gray-500">+1.3% vs mes anterior</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Tiempo de Respuesta</h3>
            <p className="text-2xl font-bold text-green-600">{configuracion.tiempoRespuesta}ms</p>
            <p className="text-sm text-gray-500">-300ms mejora</p>
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

      {/* Modal Editar Característica */}
      {modalEditarCaracteristica && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Editar: {modalEditarCaracteristica.nombre}
              </h3>
              <button
                onClick={() => setModalEditarCaracteristica(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso ({formCaracteristica.peso}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formCaracteristica.peso}
                  onChange={(e) => setFormCaracteristica(prev => ({ ...prev, peso: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={formCaracteristica.estado}
                  onChange={(e) => setFormCaracteristica(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="Testing">Testing</option>
                  <option value="Pausado">Pausado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formCaracteristica.descripcion}
                  onChange={(e) => setFormCaracteristica(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={guardarCaracteristica}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Guardar</span>
              </button>
              <button
                onClick={() => setModalEditarCaracteristica(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nuevo Test A/B */}
      {modalNuevoTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Crear Nuevo Test A/B</h3>
              <button
                onClick={() => setModalNuevoTest(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Test</label>
                <input
                  type="text"
                  value={formTest.nombre}
                  onChange={(e) => setFormTest(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Optimización de Factor Edad"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formTest.descripcion}
                  onChange={(e) => setFormTest(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe el objetivo del test..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (días)
                  </label>
                  <input
                    type="number"
                    value={formTest.duracion}
                    onChange={(e) => setFormTest(prev => ({ ...prev, duracion: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="7"
                    max="90"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    % Usuarios
                  </label>
                  <input
                    type="number"
                    value={formTest.porcentajeUsuarios}
                    onChange={(e) => setFormTest(prev => ({ ...prev, porcentajeUsuarios: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="10"
                    max="100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variantes</label>
                {formTest.variantes.map((variante, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={variante}
                      onChange={(e) => {
                        const nuevasVariantes = [...formTest.variantes];
                        nuevasVariantes[index] = e.target.value;
                        setFormTest(prev => ({ ...prev, variantes: nuevasVariantes }));
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={`Variante ${index + 1}`}
                    />
                    {formTest.variantes.length > 2 && (
                      <button
                        onClick={() => {
                          const nuevasVariantes = formTest.variantes.filter((_, i) => i !== index);
                          setFormTest(prev => ({ ...prev, variantes: nuevasVariantes }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setFormTest(prev => ({ 
                    ...prev, 
                    variantes: [...prev.variantes, `Variante ${prev.variantes.length + 1}`] 
                  }))}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Variante</span>
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={crearTestAB}
                disabled={!formTest.nombre || !formTest.descripcion}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>Crear Test</span>
              </button>
              <button
                onClick={() => setModalNuevoTest(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Configuración Global */}
      {modalConfiguracion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Configuración Avanzada</h3>
              <button
                onClick={() => setModalConfiguracion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Parámetros del Algoritmo</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Umbral de Compatibilidad ({configuracion.umbralCompatibilidad}%)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={configuracion.umbralCompatibilidad}
                      onChange={(e) => setConfiguracion(prev => ({ 
                        ...prev, 
                        umbralCompatibilidad: parseInt(e.target.value) 
                      }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo Máximo de Respuesta ({configuracion.tiempoRespuesta}ms)
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="3000"
                      step="100"
                      value={configuracion.tiempoRespuesta}
                      onChange={(e) => setConfiguracion(prev => ({ 
                        ...prev, 
                        tiempoRespuesta: parseInt(e.target.value) 
                      }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Funcionalidades</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Machine Learning</span>
                      <p className="text-xs text-gray-500">Usar algoritmos de aprendizaje automático</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={configuracion.algoritmoML}
                        onChange={(e) => setConfiguracion(prev => ({ 
                          ...prev, 
                          algoritmoML: e.target.checked 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Factor Ubicación</span>
                      <p className="text-xs text-gray-500">Incluir distancia geográfica</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={configuracion.factorUbicacion}
                        onChange={(e) => setConfiguracion(prev => ({ 
                          ...prev, 
                          factorUbicacion: e.target.checked 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Mantenimiento</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frecuencia de Reentrenamiento
                  </label>
                  <select
                    value={configuracion.reentrenamiento}
                    onChange={(e) => setConfiguracion(prev => ({ 
                      ...prev, 
                      reentrenamiento: e.target.value 
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="diario">Diario</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => {
                  setModalConfiguracion(false);
                  mostrarNotificacion('Configuración guardada exitosamente');
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Guardar Configuración</span>
              </button>
              <button
                onClick={() => setModalConfiguracion(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCompatibilidad;