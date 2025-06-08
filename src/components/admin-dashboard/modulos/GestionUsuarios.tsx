import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users,
  UserPlus,
  Settings,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  User,
  UserCheck,
  X
} from 'lucide-react';

// Modal de Confirmación
const ModalConfirmacion = ({ isOpen, onClose, onConfirm, titulo, mensaje, tipo = 'danger' }) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch (tipo) {
      case 'danger':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
          bg: 'bg-red-100',
          confirmBtn: 'bg-red-600 hover:bg-red-700',
          border: 'border-red-200'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
          bg: 'bg-yellow-100',
          confirmBtn: 'bg-yellow-600 hover:bg-yellow-700',
          border: 'border-yellow-200'
        };
      default:
        return {
          icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
          bg: 'bg-blue-100',
          confirmBtn: 'bg-blue-600 hover:bg-blue-700',
          border: 'border-blue-200'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-full ${colors.bg} ${colors.border} border`}>
              {colors.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{mensaje}</p>
          
          <div className="flex space-x-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg transition-colors font-medium ${colors.confirmBtn}`}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de Input
const ModalInput = ({ isOpen, onClose, onConfirm, titulo, placeholder, valor = '', tipo = 'text' }) => {
  const [inputValue, setInputValue] = useState(valor);

  useEffect(() => {
    setInputValue(valor);
  }, [valor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div>
            <div className="mb-6">
              <input
                type={tipo}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    onConfirm(inputValue.trim());
                  }
                }}
              />
            </div>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => inputValue.trim() && onConfirm(inputValue.trim())}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-colors font-medium"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de Formulario para Crear Usuario
const ModalCrearUsuario = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
    fotoPerfil: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 animate-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Crear Nuevo Usuario</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico *</label>
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => handleChange('correo', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="usuario@ejemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Número de teléfono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña *</label>
                <input
                  type="password"
                  value={formData.contrasena}
                  onChange={(e) => handleChange('contrasena', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Contraseña segura"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Foto de Perfil</label>
                <input
                  type="url"
                  value={formData.fotoPerfil}
                  onChange={(e) => handleChange('fotoPerfil', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/foto.jpg (opcional)"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (formData.nombre && formData.correo && formData.contrasena) {
                    onConfirm(formData);
                    setFormData({ nombre: '', correo: '', telefono: '', contrasena: '', fotoPerfil: '' });
                  }
                }}
                disabled={!formData.nombre || !formData.correo || !formData.contrasena}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-colors font-medium"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de Alerta
const ModalAlerta = ({ isOpen, onClose, titulo, mensaje, tipo = 'error' }) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch (tipo) {
      case 'success':
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          bg: 'bg-green-100',
          border: 'border-green-200',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'error':
        return {
          icon: <XCircle className="h-8 w-8 text-red-600" />,
          bg: 'bg-red-100',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'info':
        return {
          icon: <Eye className="h-8 w-8 text-blue-600" />,
          bg: 'bg-blue-100',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
          bg: 'bg-yellow-100',
          border: 'border-yellow-200',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-full ${colors.bg} ${colors.border} border`}>
              {colors.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
            </div>
          </div>
          
          <div className="mb-6">
            {typeof mensaje === 'string' ? (
              <p className="text-gray-600 leading-relaxed">{mensaje}</p>
            ) : (
              <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg overflow-auto max-h-64">
                {mensaje}
              </pre>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${colors.button}`}
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GestionUsuarios = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [usuariosRecientes, setUsuariosRecientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para modales
  const [modalConfirmacion, setModalConfirmacion] = useState({ isOpen: false, tipo: 'danger', titulo: '', mensaje: '', onConfirm: null });
  const [modalInput, setModalInput] = useState({ isOpen: false, titulo: '', placeholder: '', valor: '', onConfirm: null });
  const [modalCrearUsuario, setModalCrearUsuario] = useState(false);
  const [modalAlerta, setModalAlerta] = useState({ isOpen: false, tipo: 'error', titulo: '', mensaje: '' });

  // Cargar usuarios desde la API
  useEffect(() => {
    fetch('/api/usuarios-ad/get')
      .then(res => res.json())
      .then(data => {
        setUsuariosRecientes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar usuarios:', error);
        setLoading(false);
        setModalAlerta({
          isOpen: true,
          tipo: 'error',
          titulo: 'Error de Conexión',
          mensaje: 'No se pudieron cargar los usuarios. Verifica tu conexión e intenta nuevamente.'
        });
      });
  }, []);

  // Función para eliminar usuario con modal personalizado
  const eliminarUsuario = (usuario) => {
    setModalConfirmacion({
      isOpen: true,
      tipo: 'danger',
      titulo: 'Eliminar Usuario',
      mensaje: `¿Estás seguro de que quieres eliminar a "${usuario.Nombre}"? Esta acción no se puede deshacer.`,
      onConfirm: () => confirmarEliminarUsuario(usuario.ID_Usuario)
    });
  };

  const confirmarEliminarUsuario = async (id) => {
    try {
      const res = await fetch('/api/usuarios-ad/delete', {
        method: 'POST',
        body: JSON.stringify({ idUsuario: id }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        setUsuariosRecientes(prev => prev.filter(u => u.ID_Usuario !== id));
        setModalAlerta({
          isOpen: true,
          tipo: 'success',
          titulo: 'Usuario Eliminado',
          mensaje: 'El usuario ha sido eliminado exitosamente.'
        });
      } else {
        setModalAlerta({
          isOpen: true,
          tipo: 'error',
          titulo: 'Error al Eliminar',
          mensaje: 'Hubo un problema al eliminar el usuario. Por favor, intenta nuevamente.'
        });
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setModalAlerta({
        isOpen: true,
        tipo: 'error',
        titulo: 'Error de Conexión',
        mensaje: 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
      });
    }
    setModalConfirmacion({ ...modalConfirmacion, isOpen: false });
  };

  // Función para editar usuario con modal personalizado
  const editarUsuario = (usuario) => {
    setModalInput({
      isOpen: true,
      titulo: 'Editar Usuario',
      placeholder: 'Ingresa el nuevo nombre',
      valor: usuario.Nombre,
      onConfirm: (nuevoNombre) => confirmarEditarUsuario(usuario, nuevoNombre)
    });
  };

  const confirmarEditarUsuario = async (usuario, nuevoNombre) => {
    if (nuevoNombre !== usuario.Nombre) {
      try {
        const res = await fetch('/api/usuarios-ad/edit', {
          method: 'POST',
          body: JSON.stringify({
            idUsuario: usuario.ID_Usuario,
            nombre: nuevoNombre
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (res.ok) {
          const actualizados = usuariosRecientes.map(u => 
            u.ID_Usuario === usuario.ID_Usuario 
              ? { ...u, Nombre: nuevoNombre } 
              : u
          );
          setUsuariosRecientes(actualizados);
          
          setModalAlerta({
            isOpen: true,
            tipo: 'success',
            titulo: 'Usuario Actualizado',
            mensaje: 'El nombre del usuario ha sido actualizado exitosamente.'
          });
        } else {
          setModalAlerta({
            isOpen: true,
            tipo: 'error',
            titulo: 'Error al Editar',
            mensaje: 'Hubo un problema al actualizar el usuario. Por favor, intenta nuevamente.'
          });
        }
      } catch (error) {
        console.error('Error al editar usuario:', error);
        setModalAlerta({
          isOpen: true,
          tipo: 'error',
          titulo: 'Error de Conexión',
          mensaje: 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
        });
      }
    }
    setModalInput({ ...modalInput, isOpen: false });
  };

  // Función para crear usuario con modal personalizado
  const crearUsuario = () => {
    setModalCrearUsuario(true);
  };

  const confirmarCrearUsuario = async (formData) => {
    try {
      const res = await fetch('/api/usuarios-ad/create', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          contrasena: formData.contrasena,
          fotoPerfil: formData.fotoPerfil
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        setModalCrearUsuario(false);
        
        setModalAlerta({
          isOpen: true,
          tipo: 'success',
          titulo: 'Usuario Creado',
          mensaje: 'El nuevo usuario ha sido creado exitosamente.'
        });
        
        // Recargar la lista de usuarios
        window.location.reload();
      } else {
        setModalAlerta({
          isOpen: true,
          tipo: 'error',
          titulo: 'Error al Crear',
          mensaje: 'Hubo un problema al crear el usuario. Por favor, intenta nuevamente.'
        });
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setModalAlerta({
        isOpen: true,
        tipo: 'error',
        titulo: 'Error de Conexión',
        mensaje: 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
      });
    }
  };

  // Función para ver detalles del usuario
  const verDetallesUsuario = (usuario) => {
    const detalles = JSON.stringify(usuario, null, 2);
    setModalAlerta({
      isOpen: true,
      tipo: 'info',
      titulo: 'Detalles del Usuario',
      mensaje: detalles
    });
  };

  // Calcular estadísticas dinámicas
  const calcularEstadisticas = () => {
    const total = usuariosRecientes.length;
    const activos = usuariosRecientes.filter(u => u.Estado === 'Activo').length;
    const pendientes = usuariosRecientes.filter(u => u.Estado === 'Pendiente').length;
    const nuevos = usuariosRecientes.filter(u => {
      const fechaRegistro = new Date(u.Fecha_Registro);
      const hace7Dias = new Date();
      hace7Dias.setDate(hace7Dias.getDate() - 7);
      return fechaRegistro >= hace7Dias;
    }).length;

    return [
      {
        titulo: 'Total Usuarios',
        valor: total,
        cambio: `+${nuevos} este mes`,
        color: 'blue',
        icon: Users
      },
      {
        titulo: 'Usuarios Activos',
        valor: activos,
        cambio: `${Math.round((activos/total)*100) || 0}% del total`,
        color: 'green',
        icon: UserCheck
      },
      {
        titulo: 'Nuevos Registros',
        valor: nuevos,
        cambio: 'Últimos 7 días',
        color: 'purple',
        icon: UserPlus
      },
      {
        titulo: 'Pendientes Revisión',
        valor: pendientes,
        cambio: 'Requieren aprobación',
        color: 'yellow',
        icon: AlertTriangle
      }
    ];
  };

  const estadisticasUsuarios = calcularEstadisticas();

  // Calcular filtros dinámicos
  const calcularFiltros = () => {
    const total = usuariosRecientes.length;
    const usuarios = usuariosRecientes.filter(u => u.NombreRol === 'Usuario').length;
    const refugios = usuariosRecientes.filter(u => u.NombreRol === 'Refugio').length;
    const moderadores = usuariosRecientes.filter(u => u.NombreRol === 'Moderador').length;
    const pendientes = usuariosRecientes.filter(u => u.Estado === 'Pendiente').length;

    return [
      { id: 'todos', label: 'Todos', count: total },
      { id: 'usuarios', label: 'Usuarios', count: usuarios },
      { id: 'refugios', label: 'Refugios', count: refugios },
      { id: 'moderadores', label: 'Moderadores', count: moderadores },
      { id: 'pendientes', label: 'Pendientes', count: pendientes }
    ];
  };

  const filtros = calcularFiltros();

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Verificado': return 'bg-blue-100 text-blue-800';
      case 'Inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolIcon = (rol) => {
    switch (rol) {
      case 'Usuario': return <User className="h-4 w-4" />;
      case 'Refugio': return <Shield className="h-4 w-4" />;
      case 'Moderador': return <Crown className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  // Generar avatar desde el nombre
  const getAvatar = (nombre) => {
    if (!nombre) return '??';
    const palabras = nombre.split(' ');
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modales */}
      <ModalConfirmacion
        isOpen={modalConfirmacion.isOpen}
        onClose={() => setModalConfirmacion({ ...modalConfirmacion, isOpen: false })}
        onConfirm={modalConfirmacion.onConfirm}
        titulo={modalConfirmacion.titulo}
        mensaje={modalConfirmacion.mensaje}
        tipo={modalConfirmacion.tipo}
      />

      <ModalInput
        isOpen={modalInput.isOpen}
        onClose={() => setModalInput({ ...modalInput, isOpen: false })}
        onConfirm={modalInput.onConfirm}
        titulo={modalInput.titulo}
        placeholder={modalInput.placeholder}
        valor={modalInput.valor}
      />

      <ModalCrearUsuario
        isOpen={modalCrearUsuario}
        onClose={() => setModalCrearUsuario(false)}
        onConfirm={confirmarCrearUsuario}
      />

      <ModalAlerta
        isOpen={modalAlerta.isOpen}
        onClose={() => setModalAlerta({ ...modalAlerta, isOpen: false })}
        titulo={modalAlerta.titulo}
        mensaje={modalAlerta.mensaje}
        tipo={modalAlerta.tipo}
      />

      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <p className="text-gray-600 mt-1">Administrar usuarios, roles y permisos del sistema</p>
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
            <button 
              onClick={crearUsuario}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasUsuarios.map((stat, index) => {
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
                  <p className="text-xl font-bold text-gray-900">{stat.valor.toLocaleString()}</p>
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

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {usuariosRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            
            {/* Botones de acción */}
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </button>
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                filtroActivo === filtro.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
            </button>
          ))}
        </div>

        {/* Tabla de Usuarios */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Usuario</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rol</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha Registro</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosRecientes.map((usuario, index) => (
                <tr
                  key={usuario.ID_Usuario}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-indigo-100 text-indigo-600 font-semibold text-sm">
                        {usuario.Foto_Perfil ? (
                          <img
                            src={usuario.Foto_Perfil}
                            alt={usuario.Nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getAvatar(usuario.Nombre)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{usuario.Nombre}</p>
                        <p className="text-sm text-gray-500">{usuario.Correo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getRolIcon(usuario.NombreRol)}
                      <span className="text-sm text-gray-900">{usuario.NombreRol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(usuario.Estado)}`}>
                      {usuario.Estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(usuario.Fecha_Registro).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => verDetallesUsuario(usuario)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => editarUsuario(usuario)}
                        className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        title="Editar usuario"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(usuario)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mensaje si no hay usuarios */}
        {usuariosRecientes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay usuarios registrados</p>
          </div>
        )}

        {/* Paginación */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Mostrando 1 a {usuariosRecientes.length} de {usuariosRecientes.length} usuarios
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              Anterior
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Configuración del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración Avanzada
          </h2>
          <p className="text-gray-600 mb-6">
            Personaliza las funcionalidades del módulo de gestión de usuarios.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/AsignacionRolesPermisos">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Roles y Permisos</span>
              </button>
            </Link>
            
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Shield className="h-5 w-5" />
              <span>Configurar Seguridad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;