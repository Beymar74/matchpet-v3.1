'use client';

import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMain from "@/components/layout/HeaderMain";
import { 
  User, 
  Camera, 
  Save, 
  X, 
  Check, 
  Edit3,
  Upload,
  Crop,
  ArrowLeft,
  AlertCircle,
  Info,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const EdicionPerfilAdoptante: React.FC = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string>('/Perfil/Usuario1.jpeg');
  const [modalOpen, setModalOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para crop (simulado)
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadSavedData = () => {
      const savedData = {
        fullName: localStorage.getItem('nombreUsuario') || '',
        phoneNumber: localStorage.getItem('telefono') || '',
        email: localStorage.getItem('correoElectronico') || '',
        password: '',
        confirmPassword: '',
      };

      setProfileData(prev => ({ ...prev, ...savedData }));

      const storedPhoto = localStorage.getItem('fotoPerfil');
      if (storedPhoto) setProfilePhoto(storedPhoto);
    };

    loadSavedData();
  }, []);

  // Detectar cambios no guardados
  useEffect(() => {
    setUnsavedChanges(true);
  }, [profileData, profilePhoto]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
  
    if (profileData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }
  
    if (profileData.phoneNumber && !/^\d{8,15}$/.test(profileData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Número de teléfono inválido (8-15 dígitos)';
    }
  
    if (profileData.password) {
      if (profileData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
  
      if (profileData.password !== profileData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  // Función simulada para crop
  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc) return;
      
      setProfilePhoto(imageSrc);
      localStorage.setItem('fotoPerfil', imageSrc);
      setShowCropper(false);
      setImageSrc(null);
    } catch (e) {
      console.error('Error al procesar la imagen:', e);
    }
  }, [imageSrc]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        return;
      }

      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setShowCropper(true);
    }
  };

  function readFile(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProfileData(prev => ({ ...prev, [name]: checked }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }

    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      const res = await fetch('/api/usuarios/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: localStorage.getItem('idUsuario'),
          nombre: profileData.fullName,
          correo: profileData.email,
          telefono: profileData.phoneNumber,
          contrasena: profileData.password || null,
          fotoPerfil: profilePhoto
        })
      });
  
      const data = await res.json();
  
      if (data.success) {
        // ✅ Actualizar localStorage
        localStorage.setItem('nombreUsuario', profileData.fullName);
        localStorage.setItem('correoElectronico', profileData.email);
        localStorage.setItem('telefono', profileData.phoneNumber);
        if (profileData.password) localStorage.setItem('password', profileData.password);
        localStorage.setItem('fotoPerfil', profilePhoto);
  
        setModalOpen(true);
        setUnsavedChanges(false);
      } else {
        alert('Hubo un problema al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error inesperado al actualizar el perfil');
    }
  
    setLoading(false);
  };
  
      

  const closeModalAndRedirect = () => {
    setModalOpen(false);
    router.push('/verperfil');
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      setShowExitModal(true);
    } else {
      router.push('/verperfil');
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    router.push('/verperfil');
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <>
      <HeaderMain />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Volver</span>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-[#30588C]">Editar Perfil</h1>
                  <p className="text-gray-600">Actualiza tu información personal</p>
                </div>
              </div>
              {unsavedChanges && (
                <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Cambios sin guardar</span>
                </div>
              )}
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel Izquierdo - Foto de Perfil */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                  <Camera className="text-[#30588C]" />
                  <span>Foto de Perfil</span>
                </h3>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={profilePhoto}
                      alt="Foto de perfil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#30588C]/20 shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 bg-[#30588C] rounded-full p-2 shadow-lg">
                      <Edit3 size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <label
                      htmlFor="photoUpload"
                      className="cursor-pointer inline-flex items-center space-x-2 bg-[#30588C] hover:bg-[#254559] text-white font-medium px-4 py-2 rounded-xl transition-all duration-200"
                    >
                      <Upload size={16} />
                      <span>Cambiar Foto</span>
                    </label>
                    <input
                      type="file"
                      id="photoUpload"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">
                      JPG, PNG o GIF. Máximo 5MB.
                    </p>
                  </div>
                </div>

                {/* Información Adicional */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Consejos para tu foto:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Usa una foto clara de tu rostro</li>
                          <li>• Evita selfies muy cercanos</li>
                          <li>• Sonríe naturalmente</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Derecho - Formulario */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                    <User className="text-[#30588C]" />
                    <span>Información Personal</span>
                  </h3>

                  <div className="space-y-6">
                    {/* Nombre Completo */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ej. Juan Pérez López"
                        className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#30588C]/20 focus:border-[#30588C]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          placeholder="Ej. juan@ejemplo.com"
                          className={`w-full rounded-xl border px-4 py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#30588C]/20 focus:border-[#30588C]'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800 mb-2">
                        Número de Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Ej. 71234567"
                        className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#30588C]/20 focus:border-[#30588C]'
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{errors.phoneNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información de Seguridad */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                    <Lock className="text-[#30588C]" />
                    <span>Seguridad</span>
                  </h3>

                  <div className="space-y-6">
                    {/* Contraseña */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                        Nueva Contraseña (opcional)
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={profileData.password}
                          onChange={handleInputChange}
                          placeholder="Deja en blanco para mantener la actual"
                          className={`w-full rounded-xl border px-4 py-3 pl-11 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#30588C]/20 focus:border-[#30588C]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{errors.password}</span>
                        </p>
                      )}
                    </div>

                    {/* Confirmar Contraseña */}
                    {profileData.password && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-2">
                          Confirmar Nueva Contraseña *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={profileData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirma tu nueva contraseña"
                            className={`w-full rounded-xl border px-4 py-3 pl-11 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                              errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#30588C]/20 focus:border-[#30588C]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                            <AlertCircle size={14} />
                            <span>{errors.confirmPassword}</span>
                          </p>
                        )}
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Consejos de seguridad:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Usa al menos 6 caracteres</li>
                            <li>• Combina letras, números y símbolos</li>
                            <li>• No uses información personal</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center space-x-2 bg-[#BF3952] hover:bg-[#a32e45] text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          <span>Guardar Perfil</span>
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      className="flex items-center space-x-2 px-8 py-3 rounded-xl font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      <X size={18} />
                      <span>Cancelar</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cropper (simulado) */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Crop className="text-[#30588C]" />
              <span>Recortar Imagen</span>
            </h3>
            
            <div className="relative bg-gray-100 rounded-xl h-64 mb-6 flex items-center justify-center">
              <img
                src={imageSrc}
                alt="Vista previa"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowCropper(false)}
                variant="outline"
                className="px-6 py-2"
              >
                Cancelar
              </Button>
              <Button
                onClick={showCroppedImage}
                className="bg-[#BF3952] hover:bg-[#a32e45] text-white px-6 py-2"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Salida */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-amber-600" size={32} />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">¿Estás seguro?</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Los cambios no guardados se perderán si sales ahora.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={confirmExit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
              >
                Sí, salir sin guardar
              </Button>
              
              <Button
                onClick={cancelExit}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200"
              >
                Continuar editando
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">¡Perfil Actualizado!</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Tu información personal ha sido guardada correctamente. Los cambios se reflejarán en tu perfil inmediatamente.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={closeModalAndRedirect}
                className="w-full bg-[#30588C] hover:bg-[#254559] text-white py-3 rounded-xl font-medium transition-all duration-200"
              >
                Ver Mi Perfil
              </Button>
              
              <button
                onClick={() => setModalOpen(false)}
                className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm transition-colors"
              >
                Continuar editando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EdicionPerfilAdoptante;