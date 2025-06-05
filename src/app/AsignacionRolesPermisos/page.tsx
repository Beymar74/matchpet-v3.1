'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Crown, 
  Shield, 
  Heart, 
  Home,
  Settings,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Check,
  X,
  AlertTriangle,
  UserPlus,
  ChevronDown,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Activity,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: 'Administrador' | 'Refugio' | 'Adoptante';
  estado: 'Activo' | 'Inactivo' | 'Suspendido';
  fechaRegistro: string;
  ultimaActividad: string;
  fotoPerfil: string;
  ubicacion: string;
}

const AsignacionRoles = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    rol: 'Todos',
    estado: 'Todos',
    ubicacion: 'Todos'
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    rol: '',
    estado: '',
    contrasena: ''
  });

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        console.log('🔄 Cargando usuarios...');
        const res = await fetch('/api/usuarios/todos');
        console.log('📡 Respuesta del servidor:', res.status, res.statusText);
        
        const data = await res.json();
        console.log('📊 Datos recibidos:', data);
        
        if (res.ok && Array.isArray(data)) {
          setUsuarios(data);
          console.log('✅ Usuarios cargados:', data.length);
        } else {
          console.error('❌ Error en la respuesta:', data);
          setUsuarios([]);
        }
      } catch (error) {
        console.error('❌ Error al cargar usuarios:', error);
        setUsuarios([]);
      }
    };

    obtenerUsuarios();
  }, []);


  const handleSubmitNuevoUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/usuarios/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      const data = await res.json();

      if (data.success) {
        alert('Usuario creado con éxito');
        setShowModal(false);
        // Limpiar formulario
        setNuevoUsuario({
          nombre: '',
          email: '',
          telefono: '',
          ubicacion: '',
          rol: '',
          estado: '',
          contrasena: ''
        });
        // Recargar usuarios
        const resUsuarios = await fetch('/api/usuarios/todos');
        const nuevosUsuarios = await resUsuarios.json();
        setUsuarios(Array.isArray(nuevosUsuarios) ? nuevosUsuarios : []);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error inesperado al crear el usuario');
    }
  };
  
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState<'rol' | 'estado' | 'eliminar'>('rol');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { 
      value: 'Administrador', 
      label: 'Administrador', 
      icon: Crown, 
      color: 'from-purple-500 to-violet-600',
      description: 'Control total del sistema'
    },
    { 
      value: 'Refugio', 
      label: 'Refugio', 
      icon: Home, 
      color: 'from-blue-500 to-indigo-600',
      description: 'Gestión de mascotas y adopciones'
    },
    { 
      value: 'Adoptante', 
      label: 'Adoptante', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-600',
      description: 'Búsqueda y adopción de mascotas'
    }
  ];

  const estados = [
    { value: 'Activo', label: 'Activo', color: 'text-green-600 bg-green-100' },
    { value: 'Inactivo', label: 'Inactivo', color: 'text-gray-600 bg-gray-100' },
    { value: 'Suspendido', label: 'Suspendido', color: 'text-red-600 bg-red-100' }
  ];

  const ubicaciones = ['Todos', 'La Paz', 'Santa Cruz', 'Cochabamba', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando'];

  // Filtrar usuarios - Verificar que usuarios sea un array
  const usuariosFiltrados = Array.isArray(usuarios) ? usuarios.filter(usuario => {
    const matchBusqueda = usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchRol = filtros.rol === 'Todos' || usuario.rol === filtros.rol;
    const matchEstado = filtros.estado === 'Todos' || usuario.estado === filtros.estado;
    const matchUbicacion = filtros.ubicacion === 'Todos' || usuario.ubicacion === filtros.ubicacion;
    
    return matchBusqueda && matchRol && matchEstado && matchUbicacion;
  }) : [];

  const handleChangRole = (usuario: Usuario, nuevoRol: string) => {
    setSelectedUser(usuario);
    setNewRole(nuevoRol);
    setActionType('rol');
    setShowConfirmModal(true);
  };

  const handleChangeStatus = (usuario: Usuario, nuevoEstado: string) => {
    setSelectedUser(usuario);
    setNewStatus(nuevoEstado);
    setActionType('estado');
    setShowConfirmModal(true);
  };

  const handleDeleteUser = (usuario: Usuario) => {
    setSelectedUser(usuario);
    setActionType('eliminar');
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    if (!selectedUser) return;
  
    setLoading(true);
  
    try {
      if (actionType === 'eliminar') {
        // Llamar API de eliminar
        const res = await fetch('/api/usuarios/eliminar', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idUsuario: selectedUser.id })
        });
        
        const data = await res.json();
        
        if (data.success) {
          // Eliminar localmente de la lista
          setUsuarios(prevUsuarios => 
            prevUsuarios.filter(usuario => usuario.id !== selectedUser.id)
          );
          alert('Usuario eliminado exitosamente');
        } else {
          alert('Error al eliminar: ' + (data.error || 'Error desconocido'));
        }
      } else {
        // Llamar API de actualizar (rol o estado)
        const res = await fetch('/api/usuarios/actualizar', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idUsuario: selectedUser.id,
            nuevoRol: actionType === 'rol' ? newRole : undefined,
            nuevoEstado: actionType === 'estado' ? newStatus : undefined
          })
        });
    
        const data = await res.json();
    
        if (data.success) {
          // Actualizar localmente la lista de usuarios
          setUsuarios(prevUsuarios => {
            return prevUsuarios.map(usuario => {
              if (usuario.id === selectedUser.id) {
                if (actionType === 'rol') {
                  return { ...usuario, rol: newRole as Usuario['rol'] };
                } else if (actionType === 'estado') {
                  return { ...usuario, estado: newStatus as Usuario['estado'] };
                }
              }
              return usuario;
            });
          });
          alert(`${actionType === 'rol' ? 'Rol' : 'Estado'} actualizado exitosamente`);
        } else {
          alert('Error al actualizar: ' + (data.error || 'Error desconocido'));
        }
      }
      
      setShowConfirmModal(false);
      setSelectedUser(null);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error inesperado al realizar la operación');
    } finally {
      setLoading(false);
    }
  };
  
    
  
  const getRoleIcon = (rol: string) => {
    const roleData = roles.find(r => r.value === rol);
    return roleData ? roleData.icon : Shield;
  };

  const getRoleColor = (rol: string) => {
    const roleData = roles.find(r => r.value === rol);
    return roleData ? roleData.color : 'from-gray-500 to-slate-600';
  };

  const getStatusColor = (estado: string) => {
    const statusData = estados.find(e => e.value === estado);
    return statusData ? statusData.color : 'text-gray-600 bg-gray-100';
  };

  const estadisticas = {
    total: Array.isArray(usuarios) ? usuarios.length : 0,
    administradores: Array.isArray(usuarios) ? usuarios.filter(u => u.rol === 'Administrador').length : 0,
    refugios: Array.isArray(usuarios) ? usuarios.filter(u => u.rol === 'Refugio').length : 0,
    adoptantes: Array.isArray(usuarios) ? usuarios.filter(u => u.rol === 'Adoptante').length : 0,
    activos: Array.isArray(usuarios) ? usuarios.filter(u => u.estado === 'Activo').length : 0
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-[#30588C] to-[#BF3952] bg-clip-text text-transparent mb-2">
                    Gestión de Roles de Usuario
                  </h1>
                  <p className="text-gray-600">Administra roles y permisos de los usuarios del sistema</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Nuevo Usuario
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Usuarios</p>
                  <p className="text-3xl font-bold text-gray-800">{estadisticas.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Administradores</p>
                  <p className="text-3xl font-bold text-purple-600">{estadisticas.administradores}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Refugios</p>
                  <p className="text-3xl font-bold text-blue-600">{estadisticas.refugios}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Adoptantes</p>
                  <p className="text-3xl font-bold text-pink-600">{estadisticas.adoptantes}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Usuarios Activos</p>
                  <p className="text-3xl font-bold text-green-600">{estadisticas.activos}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                />
              </div>

              {/* Filtro por Rol */}
              <div className="relative">
                <select
                  value={filtros.rol}
                  onChange={(e) => setFiltros(prev => ({ ...prev, rol: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none appearance-none bg-white transition-all"
                >
                  <option value="Todos">Todos los roles</option>
                  {roles.map(rol => (
                    <option key={rol.value} value={rol.value}>{rol.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Filtro por Estado */}
              <div className="relative">
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none appearance-none bg-white transition-all"
                >
                  <option value="Todos">Todos los estados</option>
                  {estados.map(estado => (
                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Filtro por Ubicación */}
              <div className="relative">
                <select
                  value={filtros.ubicacion}
                  onChange={(e) => setFiltros(prev => ({ ...prev, ubicacion: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none appearance-none bg-white transition-all"
                >
                  {ubicaciones.map(ubicacion => (
                    <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Mostrando {usuariosFiltrados.length} de {Array.isArray(usuarios) ? usuarios.length : 0} usuarios
              </p>
              <Button
                onClick={() => setFiltros({ busqueda: '', rol: 'Todos', estado: 'Todos', ubicacion: 'Todos' })}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Limpiar filtros</span>
              </Button>
            </div>
          </div>

          {/* Lista de Usuarios */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Usuario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Contacto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Rol</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Registro</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Última Actividad</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {usuariosFiltrados.map((usuario) => {
                    const RoleIcon = getRoleIcon(usuario.rol);
                    return (
                      <tr key={usuario.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Image
                                src={usuario.fotoPerfil}
                                alt={usuario.nombre}
                                width={48}
                                height={48}
                                className="rounded-full border-2 border-gray-200"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                usuario.estado === 'Activo' ? 'bg-green-500' : 
                                usuario.estado === 'Inactivo' ? 'bg-gray-400' : 'bg-red-500'
                              }`}></div>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{usuario.nombre}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MapPin size={14} />
                                <span>{usuario.ubicacion}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail size={14} className="text-gray-400" />
                              <span className="text-gray-800">{usuario.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone size={14} className="text-gray-400" />
                              <span className="text-gray-600">{usuario.telefono}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r ${getRoleColor(usuario.rol)} text-white text-sm font-medium`}>
                            <RoleIcon size={16} />
                            <span>{usuario.rol}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(usuario.estado)}`}>
                            {usuario.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>{new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Activity size={14} />
                            <span>{new Date(usuario.ultimaActividad).toLocaleDateString('es-ES')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {/* Dropdown para cambiar rol */}
                            <div className="relative group">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center space-x-1 hover:bg-blue-50 border-blue-200"
                              >
                                <Shield size={14} />
                                <ChevronDown size={14} />
                              </Button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="p-2">
                                  <p className="text-xs font-medium text-gray-500 px-3 py-2">Cambiar Rol</p>
                                  {roles.map(rol => {
                                    const IconComponent = rol.icon;
                                    return (
                                      <button
                                        key={rol.value}
                                        onClick={() => handleChangRole(usuario, rol.value)}
                                        disabled={usuario.rol === rol.value}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                          usuario.rol === rol.value 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                      >
                                        <IconComponent size={16} />
                                        <span>{rol.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Dropdown para cambiar estado */}
                            <div className="relative group">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center space-x-1 hover:bg-green-50 border-green-200"
                              >
                                <UserCheck size={14} />
                                <ChevronDown size={14} />
                              </Button>
                              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="p-2">
                                  <p className="text-xs font-medium text-gray-500 px-3 py-2">Cambiar Estado</p>
                                  {estados.map(estado => (
                                    <button
                                      key={estado.value}
                                      onClick={() => handleChangeStatus(usuario, estado.value)}
                                      disabled={usuario.estado === estado.value}
                                      className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                        usuario.estado === estado.value 
                                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                          : 'hover:bg-gray-50 text-gray-700'
                                      }`}
                                    >
                                      {estado.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Botón eliminar */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteUser(usuario)}
                              className="text-red-600 hover:bg-red-50 border-red-200"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {usuariosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No se encontraron usuarios</h3>
                <p className="text-gray-500">Ajusta los filtros para ver más resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showConfirmModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                actionType === 'eliminar' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {actionType === 'eliminar' ? (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                ) : (
                  <UserCheck className="w-8 h-8 text-blue-600" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {actionType === 'rol' && 'Cambiar Rol de Usuario'}
                {actionType === 'estado' && 'Cambiar Estado de Usuario'}
                {actionType === 'eliminar' && '¿Eliminar Usuario?'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {actionType === 'rol' && `¿Estás seguro de cambiar el rol de ${selectedUser.nombre} a ${newRole}?`}
                {actionType === 'estado' && `¿Estás seguro de cambiar el estado de ${selectedUser.nombre} a ${newStatus}?`}
                {actionType === 'eliminar' && `Esta acción eliminará permanentemente a ${selectedUser.nombre} del sistema.`}
              </p>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmAction}
                  className={`flex-1 ${
                    actionType === 'eliminar' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-[#30588C] hover:bg-[#254559]'
                  } text-white`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Nuevo Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Nuevo Usuario</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmitNuevoUsuario}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={nuevoUsuario.nombre}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                    placeholder="Ej. Juan Pérez"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={nuevoUsuario.email}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                    placeholder="juan@ejemplo.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={nuevoUsuario.telefono}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                    placeholder="71234567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <select 
                    value={nuevoUsuario.ubicacion}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, ubicacion: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                  >
                    <option value="">Seleccionar ubicación</option>
                    {ubicaciones.slice(1).map(ubicacion => (
                      <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol *
                  </label>
                  <select 
                    value={nuevoUsuario.rol}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                    required
                  >
                    <option value="">Seleccionar rol</option>
                    {roles.map(rol => (
                      <option key={rol.value} value={rol.value}>{rol.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado Inicial
                  </label>
                  <select 
                    value={nuevoUsuario.estado}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, estado: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                  >
                    {estados.map(estado => (
                      <option key={estado.value} value={estado.value}>{estado.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña Temporal *
                </label>
                <input
                  type="password"
                  value={nuevoUsuario.contrasena}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contrasena: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none transition-all"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  El usuario deberá cambiar esta contraseña en su primer inicio de sesión
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-medium text-blue-800 mb-2">Permisos por Rol:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Administrador:</span>
                    <span className="text-purple-700">Control total del sistema</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Refugio:</span>
                    <span className="text-blue-700">Gestión de mascotas y adopciones</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="font-medium text-pink-800">Adoptante:</span>
                    <span className="text-pink-700">Búsqueda y adopción de mascotas</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#30588C] hover:bg-[#254559] text-white"
                >
                  Crear Usuario
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AsignacionRoles;