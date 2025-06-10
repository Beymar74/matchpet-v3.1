import React, { useState, useEffect } from 'react';
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
  X,
  Save,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Activity,
  Heart,
  Home,
  RefreshCw
} from 'lucide-react';

// Componente de carga animado
const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="relative">
        {/* Círculo exterior giratorio */}
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
        {/* Círculo interior giratorio en sentido contrario */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        {/* Punto central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
      </div>
      
      {/* Texto animado */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 animate-pulse">Cargando usuarios</h3>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Barras laterales animadas */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-indigo-400 rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Modal para crear/editar usuario
const ModalUsuario = ({ usuario, isOpen, onClose, onSave, isCreating }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
    fotoPerfil: '',
    rol: 'Adoptante',
    estado: 'Activo'
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (usuario && !isCreating) {
      setFormData({
        nombre: usuario.Nombre || '',
        correo: usuario.Correo || '',
        telefono: usuario.Telefono || '',
        contrasena: '',
        fotoPerfil: usuario.Foto_Perfil || '',
        rol: usuario.NombreRol || 'Adoptante',
        estado: usuario.Estado || 'Activo'
      });
      setPreviewImage(usuario.Foto_Perfil || '');
    } else {
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        contrasena: '',
        fotoPerfil: '',
        rol: 'Adoptante',
        estado: 'Activo'
      });
      setPreviewImage('');
    }
    setErrors({});
    setSelectedImage(null);
  }, [usuario, isCreating, isOpen]);

  // Función para manejar la selección de imagen
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('La imagen no puede ser mayor a 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona solo archivos de imagen');
        return;
      }

      setSelectedImage(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para subir imagen a Cloudinary
  const uploadImageToCloudinary = async (image) => {
    const formDataImg = new FormData();
    formDataImg.append('file', image);
    formDataImg.append('upload_preset', 'matchpet_preset');

    const res = await fetch('https://api.cloudinary.com/v1_1/duqzhng9e/image/upload', {
      method: 'POST',
      body: formDataImg,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'El formato del correo no es válido';
    }
    
    if (isCreating && !formData.contrasena.trim()) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    } else if (formData.contrasena && formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let finalFormData = { ...formData };

      // Si hay una imagen seleccionada, subirla primero
      if (selectedImage) {
        setUploadingImage(true);
        try {
          const imageUrl = await uploadImageToCloudinary(selectedImage);
          finalFormData.fotoPerfil = imageUrl;
        } catch (error) {
          console.error('Error al subir imagen:', error);
          alert('Error al subir la imagen. Inténtalo de nuevo.');
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      if (isCreating) {
        await onSave(finalFormData);
      } else {
        await onSave({ ...finalFormData, idUsuario: usuario.ID_Usuario });
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isCreating ? 'Crear Usuario' : 'Editar Usuario'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese el nombre completo"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.correo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="usuario@ejemplo.com"
              />
              {errors.correo && (
                <p className="text-red-500 text-xs mt-1">{errors.correo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+591 12345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isCreating ? 'Contraseña *' : 'Nueva contraseña (opcional)'}
              </label>
              <input
                type="password"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.contrasena ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.contrasena && (
                <p className="text-red-500 text-xs mt-1">{errors.contrasena}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de perfil
              </label>
              <div className="space-y-3">
                {/* Preview de la imagen */}
                {previewImage && (
                  <div className="flex justify-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Input de archivo */}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingImage ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="mt-2 text-sm text-gray-500">Subiendo imagen...</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Adoptante">Adoptante</option>
                  <option value="Refugio">Refugio</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Verificado">Verificado</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Suspendido">Suspendido</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || uploadingImage}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading || uploadingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{uploadingImage ? 'Subiendo imagen...' : 'Guardando...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{isCreating ? 'Crear' : 'Guardar'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal para ver detalles del usuario
const ModalDetalles = ({ usuario, isOpen, onClose }) => {
  if (!isOpen || !usuario) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Detalles del Usuario</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-indigo-100 text-indigo-600 font-semibold text-lg">
                {usuario.Foto_Perfil ? (
                  <img
                    src={usuario.Foto_Perfil}
                    alt={usuario.Nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  usuario.Nombre?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{usuario.Nombre}</h3>
                <p className="text-sm text-gray-600">{usuario.NombreRol}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{usuario.Correo}</span>
              </div>
              
              {usuario.Telefono && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{usuario.Telefono}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Registrado: {new Date(usuario.Fecha_Registro).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  usuario.Estado === 'Activo' ? 'bg-green-100 text-green-800' :
                  usuario.Estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  usuario.Estado === 'Verificado' ? 'bg-blue-100 text-blue-800' :
                  usuario.Estado === 'Suspendido' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {usuario.Estado}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">ID:</span>
                <span className="text-sm text-gray-600">#{usuario.ID_Usuario}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de confirmación para cambios de rol/estado
const ModalConfirmacion = ({ isOpen, onClose, onConfirm, loading, actionType, selectedUser, newValue }) => {
  if (!isOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
        <div className="p-8">
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              actionType === 'eliminar' ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              {actionType === 'eliminar' ? (
                <AlertTriangle className="w-10 h-10 text-red-600" />
              ) : (
                <UserCheck className="w-10 h-10 text-blue-600" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {actionType === 'rol' && 'Cambiar Rol de Usuario'}
              {actionType === 'estado' && 'Cambiar Estado de Usuario'}
              {actionType === 'eliminar' && '¿Eliminar Usuario?'}
            </h3>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {actionType === 'rol' && `¿Estás seguro de cambiar el rol de ${selectedUser.Nombre} a ${newValue}?`}
              {actionType === 'estado' && `¿Estás seguro de cambiar el estado de ${selectedUser.Nombre} a ${newValue}?`}
              {actionType === 'eliminar' && `Esta acción eliminará permanentemente a ${selectedUser.Nombre} del sistema.`}
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-xl font-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center ${
                  actionType === 'eliminar' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GestionUsuarios = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [usuariosRecientes, setUsuariosRecientes] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalUsuario, setModalUsuario] = useState({ isOpen: false, usuario: null, isCreating: false });
  const [modalDetalles, setModalDetalles] = useState({ isOpen: false, usuario: null });
  const [modalConfirmacion, setModalConfirmacion] = useState({ 
    isOpen: false, 
    actionType: '', 
    selectedUser: null, 
    newValue: '' 
  });
  const [loadingAction, setLoadingAction] = useState(false);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // Definición de roles y estados
  const roles = [
    { 
      value: 'Administrador', 
      label: 'Administrador', 
      icon: Crown, 
      color: 'from-purple-500 to-violet-600'
    },
    { 
      value: 'Refugio', 
      label: 'Refugio', 
      icon: Home, 
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      value: 'Adoptante', 
      label: 'Adoptante', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const estados = [
    { value: 'Activo', label: 'Activo', color: 'text-green-600 bg-green-100' },
    { value: 'Pendiente', label: 'Pendiente', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'Verificado', label: 'Verificado', color: 'text-blue-600 bg-blue-100' },
    { value: 'Inactivo', label: 'Inactivo', color: 'text-gray-600 bg-gray-100' },
    { value: 'Suspendido', label: 'Suspendido', color: 'text-red-600 bg-red-100' }
  ];

  // Cargar usuarios desde la API
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/usuarios-ad/get');
      const data = await res.json();
      setUsuariosRecientes(data);
      
      // Mostrar mensaje de éxito brevemente
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity';
      toast.textContent = 'Lista de usuarios actualizada';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
      
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      
      // Mostrar mensaje de error
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Error al actualizar la lista';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar usuarios
  useEffect(() => {
    let filtrados = [...usuariosRecientes];

    // Aplicar filtro por categoría
    if (filtroActivo !== 'todos') {
      if (filtroActivo === 'adoptante') {
        filtrados = filtrados.filter(u => u.NombreRol === 'Adoptante');
      } else if (filtroActivo === 'refugio') {
        filtrados = filtrados.filter(u => u.NombreRol === 'Refugio');
      } else if (filtroActivo === 'administrador') {
        filtrados = filtrados.filter(u => u.NombreRol === 'Administrador');
      } else if (filtroActivo === 'pendientes') {
        filtrados = filtrados.filter(u => u.Estado === 'Pendiente');
      }
    }

    // Aplicar búsqueda
    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase();
      filtrados = filtrados.filter(u => 
        u.Nombre.toLowerCase().includes(busquedaLower) ||
        u.Correo.toLowerCase().includes(busquedaLower) ||
        u.NombreRol.toLowerCase().includes(busquedaLower)
      );
    }

    setUsuariosFiltrados(filtrados);
    setPaginaActual(1);
  }, [usuariosRecientes, filtroActivo, busqueda]);

  // Función para eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch('/api/usuarios-ad/delete', {
        method: 'POST',
        body: JSON.stringify({ idUsuario: id }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        setUsuariosRecientes(usuariosRecientes.filter(u => u.ID_Usuario !== id));
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  // Función para crear usuario
  const crearUsuario = async (formData) => {
    try {
      const res = await fetch('/api/usuarios-ad/create', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        await cargarUsuarios();
      } else {
        throw new Error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
    }
  };

  // Función para editar usuario
  const editarUsuario = async (formData) => {
    try {
      const res = await fetch('/api/usuarios-ad/edit', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        await cargarUsuarios();
      } else {
        throw new Error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
      alert('Error al editar usuario');
    }
  };

  // Funciones para cambiar rol y estado
  const handleChangRole = (usuario, nuevoRol) => {
    setModalConfirmacion({
      isOpen: true,
      actionType: 'rol',
      selectedUser: usuario,
      newValue: nuevoRol
    });
  };

  const handleChangeStatus = (usuario, nuevoEstado) => {
    setModalConfirmacion({
      isOpen: true,
      actionType: 'estado',
      selectedUser: usuario,
      newValue: nuevoEstado
    });
  };

  const handleDeleteUser = (usuario) => {
    setModalConfirmacion({
      isOpen: true,
      actionType: 'eliminar',
      selectedUser: usuario,
      newValue: ''
    });
  };

  const confirmAction = async () => {
    const { actionType, selectedUser, newValue } = modalConfirmacion;
    if (!selectedUser) return;
  
    setLoadingAction(true);
  
    try {
      if (actionType === 'eliminar') {
        await eliminarUsuario(selectedUser.ID_Usuario);
      } else {
        // Actualizar rol o estado usando la API de edición existente
        const updateData = {
          idUsuario: selectedUser.ID_Usuario,
          nombre: selectedUser.Nombre,
          correo: selectedUser.Correo,
          telefono: selectedUser.Telefono,
          fotoPerfil: selectedUser.Foto_Perfil,
          rol: actionType === 'rol' ? newValue : selectedUser.NombreRol,
          estado: actionType === 'estado' ? newValue : selectedUser.Estado
        };

        await editarUsuario(updateData);
      }
      
      setModalConfirmacion({ isOpen: false, actionType: '', selectedUser: null, newValue: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Error inesperado al realizar la operación');
    } finally {
      setLoadingAction(false);
    }
  };

  // Función para exportar datos
  const exportarDatos = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Nombre,Correo,Teléfono,Rol,Estado,Fecha Registro\n" +
      usuariosFiltrados.map(u => 
        `${u.ID_Usuario},"${u.Nombre}","${u.Correo}","${u.Telefono || ''}","${u.NombreRol}","${u.Estado}","${new Date(u.Fecha_Registro).toLocaleDateString()}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calcular estadísticas dinámicas
  const calcularEstadisticas = () => {
    const total = usuariosRecientes.length;
    const activos = usuariosRecientes.filter(u => u.Estado === 'Activo').length;
    const administradores = usuariosRecientes.filter(u => u.NombreRol === 'Administrador').length;
    const refugios = usuariosRecientes.filter(u => u.NombreRol === 'Refugio').length;
    const adoptantes = usuariosRecientes.filter(u => u.NombreRol === 'Adoptante').length;

    return [
      {
        titulo: 'Total Usuarios',
        valor: total,
        cambio: `Sistema completo`,
        color: 'blue',
        icon: Users
      },
      {
        titulo: 'Administradores',
        valor: administradores,
        cambio: 'Control total',
        color: 'purple',
        icon: Crown
      },
      {
        titulo: 'Refugios',
        valor: refugios,
        cambio: 'Gestión mascotas',
        color: 'blue',
        icon: Home
      },
      {
        titulo: 'Adoptantes',
        valor: adoptantes,
        cambio: 'Búsqueda adopción',
        color: 'pink',
        icon: Heart
      }
    ];
  };

  // Calcular filtros dinámicos
  const calcularFiltros = () => {
    const total = usuariosRecientes.length;
    const adoptantes = usuariosRecientes.filter(u => u.NombreRol === 'Adoptante').length;
    const refugios = usuariosRecientes.filter(u => u.NombreRol === 'Refugio').length;
    const administradores = usuariosRecientes.filter(u => u.NombreRol === 'Administrador').length;
    const pendientes = usuariosRecientes.filter(u => u.Estado === 'Pendiente').length;

    return [
      { id: 'todos', label: 'Todos', count: total },
      { id: 'adoptante', label: 'Adoptantes', count: adoptantes },
      { id: 'refugio', label: 'Refugios', count: refugios },
      { id: 'administrador', label: 'Administradores', count: administradores },
      { id: 'pendientes', label: 'Pendientes', count: pendientes }
    ];
  };

  // Paginación
  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = usuariosFiltrados.slice(indicePrimerUsuario, indiceUltimoUsuario);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  const estadisticasUsuarios = calcularEstadisticas();
  const filtros = calcularFiltros();

  const getEstadoColor = (estado) => {
    const estadoData = estados.find(e => e.value === estado);
    return estadoData ? estadoData.color : 'text-gray-600 bg-gray-100';
  };

  const getRolIcon = (rol) => {
    const rolData = roles.find(r => r.value === rol);
    return rolData ? rolData.icon : User;
  };

  const getRolColor = (rol) => {
    const rolData = roles.find(r => r.value === rol);
    return rolData ? rolData.color : 'from-gray-500 to-slate-600';
  };

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
      <div className="space-y-6">
        {/* Header del Módulo mientras carga */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <p className="text-gray-600 mt-1">Administrar usuarios, roles y permisos del sistema</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Componente de carga animado */}
        <div className="bg-white rounded-xl shadow-md">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                  <span className="text-sm text-gray-500">Control completo</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setModalUsuario({ isOpen: true, usuario: null, isCreating: true })}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
            </button>
            <button 
              onClick={cargarUsuarios}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Actualizar lista de usuarios"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
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
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.titulo}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.valor.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.cambio}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color === 'purple' ? 'from-purple-500 to-violet-600' : stat.color === 'pink' ? 'from-pink-500 to-rose-600' : 'from-blue-500 to-indigo-600'}`}>
                  <Icon className="h-5 w-5 text-white" />
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
              {usuariosFiltrados.length} resultados
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
            <button 
              onClick={exportarDatos}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </button>
            <button 
              onClick={cargarUsuarios}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
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
              {usuariosActuales.map((usuario, index) => {
                const RoleIcon = getRolIcon(usuario.NombreRol);
                return (
                  <tr
                    key={usuario.ID_Usuario}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
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
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r ${getRolColor(usuario.NombreRol)} text-white text-sm font-medium`}>
                        <RoleIcon className="h-4 w-4" />
                        <span>{usuario.NombreRol}</span>
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
                          onClick={() => setModalDetalles({ isOpen: true, usuario })}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setModalUsuario({ isOpen: true, usuario, isCreating: false })}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        {/* Dropdown para cambiar rol */}
                        <div className="relative group">
                          <button className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                            <Crown className="h-4 w-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="p-2">
                              <p className="text-xs font-medium text-gray-500 px-3 py-2">Cambiar Rol</p>
                              {roles.map(rol => {
                                const IconComponent = rol.icon;
                                return (
                                  <button
                                    key={rol.value}
                                    onClick={() => handleChangRole(usuario, rol.value)}
                                    disabled={usuario.NombreRol === rol.value}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                      usuario.NombreRol === rol.value 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                  >
                                    <IconComponent className="h-4 w-4" />
                                    <span>{rol.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Dropdown para cambiar estado */}
                        <div className="relative group">
                          <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                            <UserCheck className="h-4 w-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="p-2">
                              <p className="text-xs font-medium text-gray-500 px-3 py-2">Cambiar Estado</p>
                              {estados.map(estado => (
                                <button
                                  key={estado.value}
                                  onClick={() => handleChangeStatus(usuario, estado.value)}
                                  disabled={usuario.Estado === estado.value}
                                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                    usuario.Estado === estado.value 
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

                        <button 
                          onClick={() => handleDeleteUser(usuario)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mensaje si no hay usuarios */}
        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {busqueda || filtroActivo !== 'todos' 
                ? 'No se encontraron usuarios con los filtros aplicados' 
                : 'No hay usuarios registrados'
              }
            </p>
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Mostrando {indicePrimerUsuario + 1} a {Math.min(indiceUltimoUsuario, usuariosFiltrados.length)} de {usuariosFiltrados.length} usuarios
            </p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className="flex items-center space-x-1 px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </button>
              
              {[...Array(totalPaginas)].map((_, i) => {
                const pagina = i + 1;
                if (
                  pagina === 1 ||
                  pagina === totalPaginas ||
                  (pagina >= paginaActual - 1 && pagina <= paginaActual + 1)
                ) {
                  return (
                    <button
                      key={pagina}
                      onClick={() => setPaginaActual(pagina)}
                      className={`px-3 py-1 rounded text-sm ${
                        paginaActual === pagina
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {pagina}
                    </button>
                  );
                } else if (
                  pagina === paginaActual - 2 ||
                  pagina === paginaActual + 2
                ) {
                  return <span key={pagina} className="px-2">...</span>;
                }
                return null;
              })}
              
              <button 
                onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                className="flex items-center space-x-1 px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      <ModalUsuario
        usuario={modalUsuario.usuario}
        isOpen={modalUsuario.isOpen}
        isCreating={modalUsuario.isCreating}
        onClose={() => setModalUsuario({ isOpen: false, usuario: null, isCreating: false })}
        onSave={modalUsuario.isCreating ? crearUsuario : editarUsuario}
      />

      <ModalDetalles
        usuario={modalDetalles.usuario}
        isOpen={modalDetalles.isOpen}
        onClose={() => setModalDetalles({ isOpen: false, usuario: null })}
      />

      <ModalConfirmacion
        isOpen={modalConfirmacion.isOpen}
        onClose={() => setModalConfirmacion({ isOpen: false, actionType: '', selectedUser: null, newValue: '' })}
        onConfirm={confirmAction}
        loading={loadingAction}
        actionType={modalConfirmacion.actionType}
        selectedUser={modalConfirmacion.selectedUser}
        newValue={modalConfirmacion.newValue}
      />
    </div>
  );
};

export default GestionUsuarios;