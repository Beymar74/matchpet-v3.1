'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  BarChart3,
  Save,
  X,
  Upload,
  Download,
  Bell,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw
} from 'lucide-react';

// Importa tu header
import HeaderRefugio from '@/components/layout/HeaderRefugio';

const VerPerfilRefugioPage = () => {
  // Estados principales
  const [perfil, setPerfil] = useState({
    nombreRefugio: '',
    correo: '',
    telefono: '',
    direccion: '',
    fotoRefugio: '/api/placeholder/140/140',
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
    solicitudesPendientes: 8
  });

  const [logros, setLogros] = useState([
    { id: 1, nombre: 'Refugio Certificado', icono: '🏆', completado: true, fecha: '2024-01-15' },
    { id: 2, nombre: '100+ Adopciones', icono: '❤️', completado: true, fecha: '2024-03-20' },
    { id: 3, nombre: 'Refugio del Mes', icono: '⭐', completado: true, fecha: '2024-05-10' }
  ]);

  // Estados de funcionalidad
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [showStats, setShowStats] = useState(true);
  
  const fileInputRef = useRef(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadProfileData();
    loadStatistics();
    // Simular actualizaciones en tiempo real cada 30 segundos
    const interval = setInterval(() => {
      updateStatistics();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadProfileData = async () => {
    setIsLoadingProfile(true);
    try {
      const idUsuario = localStorage.getItem('ID_Usuario');
      if (!idUsuario) {
        showNotificationMessage('ID de usuario no encontrado', 'error');
        loadDefaultProfileData();
        return;
      }

      const response = await fetch(`/api/refugio-perfil/${idUsuario}`);
      if (response.ok) {
        const data = await response.json();
        setPerfil({
          nombreRefugio: data.NombreRefugio || 'Refugio Esperanza',
          correo: data.Email || 'contacto@refugioesperanza.com',
          telefono: data.Contacto || '+591 2 234 5678',
          direccion: data.Ubicacion || 'Av. 6 de Agosto #123, La Paz',
          fotoRefugio: data.Foto_Perfil || '/api/placeholder/140/140',
          fechaRegistro: localStorage.getItem('fechaRegistro') || '01/01/2024',
          descripcion: data.Descripcion || 'Refugio dedicado al cuidado y bienestar animal con más de 5 años de experiencia rescatando y rehabilitando mascotas en situación de abandono.',
          capacidad: parseInt(localStorage.getItem('capacidad')) || 50,
          ubicacion: 'La Paz, Bolivia',
          licencia: 'REF-LP-2024-001',
          estado: 'Verificado'
        });
        showNotificationMessage('Perfil cargado correctamente');
      } else {
        // Si no existe el refugio en la API, cargar datos por defecto
        loadDefaultProfileData();
        showNotificationMessage('Usando datos locales', 'info');
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
      loadDefaultProfileData();
      showNotificationMessage('Error de conexión. Usando datos locales.', 'error');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const loadDefaultProfileData = () => {
    const savedData = {
      nombreRefugio: localStorage.getItem('nombreRefugio') || 'Refugio Esperanza',
      correo: localStorage.getItem('email') || 'contacto@refugioesperanza.com',
      telefono: localStorage.getItem('telefono') || '+591 2 234 5678',
      direccion: localStorage.getItem('direccion') || 'Av. 6 de Agosto #123, La Paz',
      fotoRefugio: localStorage.getItem('fotoRefugio') || '/api/placeholder/140/140',
      fechaRegistro: localStorage.getItem('fechaRegistro') || '01/01/2024',
      descripcion: localStorage.getItem('descripcionRefugio') || 'Refugio dedicado al cuidado y bienestar animal con más de 5 años de experiencia rescatando y rehabilitando mascotas en situación de abandono.',
      capacidad: parseInt(localStorage.getItem('capacidad')) || 50,
      ubicacion: 'La Paz, Bolivia',
      licencia: 'REF-LP-2024-001',
      estado: 'Verificado'
    };

    setPerfil(savedData);
  };

  const loadStatistics = () => {
    // Cargar estadísticas guardadas
    const savedStats = localStorage.getItem('refugioStats');
    if (savedStats) {
      setEstadisticas(JSON.parse(savedStats));
    }
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleEditMode = async (field) => {
    if (editMode[field]) {
      // Guardar cambios
      if (tempValues[field] !== undefined) {
        setIsLoading(true);
        try {
          const idUsuario = localStorage.getItem('ID_Usuario');
          if (!idUsuario) {
            throw new Error('ID_Usuario no encontrado');
          }

          // Preparar datos para la API
          const updateData = {
            Nombre: field === 'nombreRefugio' ? tempValues[field] : perfil.nombreRefugio,
            Ubicacion: field === 'direccion' ? tempValues[field] : perfil.direccion,
            Contacto: field === 'telefono' ? tempValues[field] : perfil.telefono,
            Descripcion: field === 'descripcion' ? tempValues[field] : perfil.descripcion,
            Email: field === 'correo' ? tempValues[field] : perfil.correo
          };
          

          // Llamar a la API para actualizar
          const response = await fetch(`/api/refugio-perfil/${idUsuario}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
          });

          if (response.ok) {
            // Actualizar estado local
            const newPerfil = { ...perfil, [field]: tempValues[field] };
            setPerfil(newPerfil);
            
            // También guardar en localStorage como respaldo
            saveToLocalStorage(
              field === 'nombreRefugio' ? 'nombreRefugio' : 
              field === 'correo' ? 'email' :
              field === 'telefono' ? 'telefono' :
              field === 'direccion' ? 'direccion' :
              field === 'descripcion' ? 'descripcionRefugio' : field, 
              tempValues[field]
            );
            
            showNotificationMessage(`${field} actualizado correctamente`);
          } else {
            throw new Error('Error al actualizar en la base de datos');
          }
        } catch (error) {
          console.error('Error:', error);
          showNotificationMessage('Error al actualizar. Intentando guardar localmente...', 'error');
          
          // Fallback: guardar solo en localStorage
          const newPerfil = { ...perfil, [field]: tempValues[field] };
          setPerfil(newPerfil);
          saveToLocalStorage(
            field === 'nombreRefugio' ? 'nombreRefugio' : 
            field === 'correo' ? 'email' :
            field === 'telefono' ? 'telefono' :
            field === 'direccion' ? 'direccion' :
            field === 'descripcion' ? 'descripcionRefugio' : field, 
            tempValues[field]
          );
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Entrar en modo edición
      setTempValues({ ...tempValues, [field]: perfil[field] });
    }
    
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const cancelEdit = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setTempValues({ ...tempValues, [field]: perfil[field] });
  };

  const handleInputChange = (field, value) => {
    setTempValues({ ...tempValues, [field]: value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotificationMessage('La imagen debe ser menor a 5MB', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const formDataImg = new FormData();
      formDataImg.append('file', file);
      formDataImg.append('upload_preset', 'matchpetpreset'); // 👈 Asegúrate de que este preset exista en Cloudinary
      formDataImg.append('cloud_name', 'duqzhng9e'); // 👈 Tu nombre de cuenta en Cloudinary

      const res = await fetch('https://api.cloudinary.com/v1_1/duqzhng9e/image/upload', {
        method: 'POST',
        body: formDataImg,
      });

      const data = await res.json();
      const nuevaFoto = data.secure_url;

      const idUsuario = localStorage.getItem('ID_Usuario'); // 👈 Este debe estar guardado al iniciar sesión
      if (!idUsuario) throw new Error('ID_Usuario no encontrado');

      await fetch(`/api/refugio-perfil/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Nombre: perfil.nombreRefugio,
          Ubicacion: perfil.direccion,
          Contacto: perfil.telefono,
          Descripcion: perfil.descripcion,
          Foto_Perfil: nuevaFoto
        }),
      });

      setPerfil(prev => ({ ...prev, fotoRefugio: nuevaFoto }));
      showNotificationMessage('Foto actualizada correctamente');
    } catch (error) {
      console.error(error);
      showNotificationMessage('Error al subir la imagen', 'error');
    } finally {
      setShowImageUpload(false);
      setIsLoading(false);
    }
  };

  const updateStatistics = async () => {
    try {
      const idUsuario = localStorage.getItem('ID_Usuario');
      if (idUsuario) {
        // Aquí podrías hacer una llamada a una API para obtener estadísticas reales
        // Por ahora, simularemos cambios locales
        setEstadisticas(prev => {
          const newStats = {
            mascotasActuales: Math.max(0, prev.mascotasActuales + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
            adopcionesExitosas: prev.adopcionesExitosas + (Math.random() > 0.9 ? 1 : 0),
            solicitudesPendientes: Math.max(0, prev.solicitudesPendientes + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))
          };
          
          // Guardar en localStorage
          localStorage.setItem('refugioStats', JSON.stringify(newStats));
          
          // Verificar logros
          checkAchievements(newStats);
          
          return newStats;
        });
      }
    } catch (error) {
      console.error('Error actualizando estadísticas:', error);
    }
  };

  const checkAchievements = (stats) => {
    setLogros(prev => prev.map(logro => {
      if (logro.id === 2 && !logro.completado && stats.adopcionesExitosas >= 100) {
        showNotificationMessage('¡Nuevo logro desbloqueado: 100+ Adopciones!', 'success');
        return { ...logro, completado: true, fecha: new Date().toLocaleDateString() };
      }
      return logro;
    }));
  };

  const exportData = () => {
    const data = {
      perfil,
      estadisticas,
      logros,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `refugio-${perfil.nombreRefugio.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotificationMessage('Datos exportados correctamente');
  };

  const refreshStats = async () => {
    setIsLoading(true);
    try {
      const idUsuario = localStorage.getItem('ID_Usuario');
      if (idUsuario) {
        // TODO: Implementar API para obtener estadísticas reales
        // const response = await fetch(`/api/refugio-estadisticas/${idUsuario}`);
        // if (response.ok) {
        //   const data = await response.json();
        //   setEstadisticas(data);
        // }
        
        // Por ahora, actualizar estadísticas simuladas
        await updateStatistics();
        showNotificationMessage('Estadísticas actualizadas');
      }
    } catch (error) {
      console.error('Error al actualizar estadísticas:', error);
      showNotificationMessage('Error al actualizar estadísticas', 'error');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const renderEditableField = (field, value, type = 'text', multiline = false) => {
    if (editMode[field]) {
      return (
        <div className="flex items-center gap-2">
          {multiline ? (
            <textarea
              value={tempValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg resize-none"
              rows="3"
              disabled={isLoading}
            />
          ) : (
            <input
              type={type}
              value={tempValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              disabled={isLoading}
            />
          )}
          <button
            onClick={() => toggleEditMode(field)}
            disabled={isLoading}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          </button>
          <button
            onClick={() => cancelEdit(field)}
            disabled={isLoading}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 group">
        <span className="flex-1">{value}</span>
        <button
          onClick={() => toggleEditMode(field)}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-green-600 transition-all"
          disabled={isLoading}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <>
      <HeaderRefugio />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 pt-24 px-4 relative overflow-hidden">
        
        {/* Indicator de carga inicial */}
        {isLoadingProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[#4E9F3D]" />
              <p className="text-lg font-semibold text-gray-800">Cargando perfil del refugio...</p>
            </div>
          </div>
        )}
        
        {/* Notificación */}
        {showNotification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            notificationType === 'success' ? 'bg-green-500 text-white' : 
            notificationType === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              {notificationMessage}
            </div>
          </div>
        )}

        {/* Modal de carga de imagen */}
        {showImageUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Cambiar foto del refugio</h3>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowImageUpload(false)}
                    className="flex-1 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-64 right-20 w-48 h-48 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto py-8 relative z-10">
          {/* Barra de herramientas superior */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Panel de Control del Refugio</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  title={showStats ? 'Ocultar estadísticas' : 'Mostrar estadísticas'}
                >
                  {showStats ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={refreshStats}
                  disabled={isLoading}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  title="Actualizar estadísticas"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={exportData}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title="Exportar datos"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

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
                        <img
                          src={perfil.fotoRefugio}
                          alt="Foto del refugio"
                          className="w-36 h-36 mx-auto rounded-full border-4 border-white shadow-2xl object-cover"
                        />
                        <div 
                          className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-[#4E9F3D] to-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => setShowImageUpload(true)}
                        >
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
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {renderEditableField('nombreRefugio', perfil.nombreRefugio)}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[#4E9F3D] font-semibold mb-2">
                        <Building2 className="w-4 h-4" />
                        Refugio de Animales
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {perfil.ubicacion}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[#30588C] font-medium">
                        <Shield className="w-4 h-4" />
                        Licencia: {perfil.licencia}
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
                  <div className="text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed">
                    {renderEditableField('descripcion', perfil.descripcion, 'text', true)}
                  </div>
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
                        <Mail className="w-5 h-5 text-[#4E9F3D] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600">Email</p>
                          <div className="font-medium text-gray-800">
                            {renderEditableField('correo', perfil.correo, 'email')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-[#4E9F3D] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600">Teléfono</p>
                          <div className="font-medium text-gray-800">
                            {renderEditableField('telefono', perfil.telefono)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-[#4E9F3D] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600">Dirección</p>
                          <div className="font-medium text-gray-800">
                            {renderEditableField('direccion', perfil.direccion)}
                          </div>
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
                    </div>
                  </div>
                </div>

                {/* Botones de acción principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="group w-full bg-gradient-to-r from-[#4E9F3D] to-green-600 hover:from-[#3B7A2B] hover:to-green-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center gap-2">
                      <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Editar Perfil
                    </div>
                  </button>

                  <button className="group w-full bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center gap-2">
                      <PawPrint className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Mis Mascotas
                    </div>
                  </button>

                  <button className="group w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative">
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Solicitudes
                    </div>
                    {estadisticas.solicitudesPendientes > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {estadisticas.solicitudesPendientes}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar con estadísticas y logros */}
            <div className="space-y-6">
              
              {/* Estadísticas del refugio */}
              {showStats && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#4E9F3D] flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Estadísticas del Refugio
                    </h3>
                    <button
                      onClick={refreshStats}
                      disabled={isLoading}
                      className="p-1 text-gray-500 hover:text-[#4E9F3D] transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                         onClick={() => showNotificationMessage(`Tienes ${estadisticas.mascotasActuales} mascotas actualmente`, 'info')}>
                      <div className="text-2xl font-bold text-[#4E9F3D] mb-1">{estadisticas.mascotasActuales}</div>
                      <div className="text-sm text-gray-600">Mascotas Actuales</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                         onClick={() => showNotificationMessage(`¡Excelente! ${estadisticas.adopcionesExitosas} adopciones exitosas`, 'info')}>
                      <div className="text-2xl font-bold text-[#30588C] mb-1">{estadisticas.adopcionesExitosas}</div>
                      <div className="text-sm text-gray-600">Adopciones Exitosas</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                         onClick={() => showNotificationMessage(`Hay ${estadisticas.solicitudesPendientes} solicitudes esperando respuesta`, 'info')}>
                      <div className="text-2xl font-bold text-orange-600 mb-1">{estadisticas.solicitudesPendientes}</div>
                      <div className="text-sm text-gray-600">Solicitudes Pendientes</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Logros del refugio */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-[#4E9F3D] mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Reconocimientos
                </h3>
                
                <div className="space-y-3">
                  {logros.map((logro) => (
                    <div 
                      key={logro.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer hover:shadow-md ${
                        logro.completado 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                          : 'bg-gray-50 opacity-60'
                      }`}
                      onClick={() => logro.completado && showNotificationMessage(`Logro obtenido el ${logro.fecha}`, 'info')}
                    >
                      <div className="text-2xl">{logro.icono}</div>
                      <div className="flex-1">
                        <p className={`font-semibold ${logro.completado ? 'text-gray-800' : 'text-gray-500'}`}>
                          {logro.nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {logro.completado ? `Obtenido: ${logro.fecha}` : 'En progreso'}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerPerfilRefugioPage;