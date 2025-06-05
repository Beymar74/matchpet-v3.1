"use client";

import React, { useState, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, Upload, AlertTriangle, Check, X, Crop } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('usuario');
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);
  
  // Validaciones en tiempo real
  const [validations, setValidations] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    image: false
  });

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\+?[\d\s\-\(\)]{8,15}$/.test(value);
      case 'password':
        return value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
      case 'confirmPassword':
        return value === formData.password && value.length > 0;
      default:
        return false;
    }
  };

  const getFieldErrorMessage = (field, value) => {
    if (!value) return `${getFieldLabel(field)} es obligatorio`;
    
    switch (field) {
      case 'name':
        return 'Mínimo 2 caracteres, solo letras y espacios';
      case 'email':
        return 'Formato de email inválido';
      case 'phone':
        return 'Número de teléfono inválido (8-15 dígitos)';
      case 'password':
        return 'Mínimo 8 caracteres, incluye mayúscula, minúscula y número';
      case 'confirmPassword':
        return 'Las contraseñas no coinciden';
      default:
        return 'Campo inválido';
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña'
    };
    return labels[field] || field;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const isValid = validateField(field, value);
    setValidations(prev => ({ ...prev, [field]: isValid }));
    
    // Limpiar error de campo específico
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Validar confirmPassword cuando password cambia
    if (field === 'password') {
      const confirmValid = validateField('confirmPassword', formData.confirmPassword);
      setValidations(prev => ({ ...prev, confirmPassword: confirmValid }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('La imagen debe ser menor a 5MB');
        return;
      }
      
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Solo se permiten archivos de imagen');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropAccept = () => {
    // Simular recorte - en implementación real usarías una librería como react-image-crop
    setImage(tempImage);
    setImagePreview(tempImage);
    setValidations(prev => ({ ...prev, image: true }));
    setShowCropModal(false);
    setErrorMessage('');
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setTempImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    return {
      score: strength,
      label: strength < 2 ? 'Débil' : strength < 4 ? 'Media' : 'Fuerte',
      colorClass: strength < 2 ? 'bg-red-500 text-red-500' : strength < 4 ? 'bg-yellow-500 text-yellow-500' : 'bg-green-500 text-green-500'
    };
  };

  const isFormValid = () => {
    return Object.values(validations).every(v => v) && image !== null;
  };

  const validateForm = () => {
    const errors = {};
    const fields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    
    fields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `${getFieldLabel(field)} es obligatorio`;
      } else if (!validations[field]) {
        errors[field] = getFieldErrorMessage(field, formData[field]);
      }
    });
    
    if (!image) {
      errors.image = 'La foto de perfil es obligatoria';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      setErrorMessage('Por favor, completa todos los campos obligatorios correctamente');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      let fotoPerfilUrl = '';
  
      if (image) {
        const formDataImg = new FormData();
        formDataImg.append('file', image);
        formDataImg.append('upload_preset', 'matchpet_preset');
      
        const res = await fetch('https://api.cloudinary.com/v1_1/duqzhng9e/image/upload', {
          method: 'POST',
          body: formDataImg,
        });
      
        const data = await res.json();
        if (!data.secure_url) throw new Error('Error al subir la imagen a Cloudinary');
        fotoPerfilUrl = data.secure_url;
      }
      
  
      const registroData = {
        nombre: formData.name,
        correo: formData.email,
        telefono: formData.phone,
        contrasena: formData.password,
        fotoPerfilUrl,
        rol: activeTab === 'usuario' ? 'Adoptante' : 'Refugio' // 👈 Esto está perfecto
      };
      
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registroData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => {
          window.location.href = activeTab === 'usuario' ? '/compatibilidad' : '/dashboard-refugio';
        }, 2000);
      } else {
        throw new Error(result.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Registro fallido:', error);
      setErrorMessage(error.message || 'Hubo un error durante el registro. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/80 backdrop-blur-sm p-10 md:p-14 rounded-3xl shadow-2xl border border-white/20">

        {/* Columna izquierda */}
        <div className="space-y-6 text-center md:text-left flex flex-col justify-center">
          {/* Tabs de selección */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('usuario')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'usuario'
                  ? 'bg-gradient-to-r from-[#BF3952] to-red-600 text-white shadow-lg'
                  : 'border-2 border-[#30588C] text-[#30588C] hover:bg-blue-50'
              }`}
            >
              👤 Adoptante
            </button>
            <button
              onClick={() => setActiveTab('refugio')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'refugio'
                  ? 'bg-gradient-to-r from-[#BF3952] to-red-600 text-white shadow-lg'
                  : 'border-2 border-[#30588C] text-[#30588C] hover:bg-blue-50'
              }`}
            >
              🏠 Refugio
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-[#011526] flex items-center justify-center md:justify-start gap-3 flex-wrap">
              {activeTab === 'usuario' ? (
                <>Buena decisión <span className="text-3xl animate-bounce">🐶</span><span className="text-3xl animate-bounce delay-75">🐱</span></>
              ) : (
                <>Únete como refugio <span className="text-3xl animate-bounce">🏠</span><span className="text-3xl animate-bounce delay-75">❤️</span></>
              )}
            </h2>
            <p className="text-lg text-[#254559] leading-relaxed">
              {activeTab === 'usuario' 
                ? 'Tu compañero perfecto te está esperando. Completa tu registro para comenzar tu camino de adopción.'
                : 'Ayuda a más mascotas a encontrar un hogar. Regístrate como refugio y conecta con adoptantes responsables.'
              }
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-start mt-6">
            <div className="w-32 h-32 bg-gradient-to-br from-[#BF3952] to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">🐾</span>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="space-y-6">
          <div className="space-y-5">
            
            {/* Campo Nombre */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <User className="text-[#30588C]" size={20} />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 bg-white text-black focus:ring-2 focus:ring-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md ${
                  formData.name ? (validations.name ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                }`}
                placeholder={`Nombre completo ${activeTab === 'refugio' ? 'del refugio' : ''} *`}
              />
              {formData.name && (
                <div className="absolute right-3 top-3">
                  {validations.name ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </div>
              )}
              {fieldErrors.name && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Campo Email */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <Mail className="text-[#30588C]" size={20} />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 bg-white text-black focus:ring-2 focus:ring-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md ${
                  formData.email ? (validations.email ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                }`}
                placeholder="Correo electrónico *"
              />
              {formData.email && (
                <div className="absolute right-3 top-3">
                  {validations.email ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </div>
              )}
              {fieldErrors.email && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Campo Teléfono */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <Phone className="text-[#30588C]" size={20} />
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 bg-white text-black focus:ring-2 focus:ring-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md ${
                  formData.phone ? (validations.phone ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                }`}
                placeholder="Número de teléfono *"
              />
              {formData.phone && (
                <div className="absolute right-3 top-3">
                  {validations.phone ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </div>
              )}
              {fieldErrors.phone && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <Lock className="text-[#30588C]" size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 bg-white text-black focus:ring-2 focus:ring-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md ${
                  formData.password ? (validations.password ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                }`}
                placeholder="Contraseña *"
              />
              <div 
                className="absolute right-3 top-3 cursor-pointer z-10" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
              </div>
              
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${passwordStrength.colorClass.split(' ')[0]}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength.colorClass.split(' ')[1]}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  {!validations.password && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.password || 'Mínimo 8 caracteres, incluye mayúscula, minúscula y número'}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <Lock className="text-[#30588C]" size={20} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 bg-white text-black focus:ring-2 focus:ring-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md ${
                  formData.confirmPassword ? (validations.confirmPassword ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                }`}
                placeholder="Confirmar contraseña *"
              />
              <div 
                className="absolute right-3 top-3 cursor-pointer z-10" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Subida de imagen */}
            <div className="space-y-3">
              <label 
                className={`flex items-center gap-3 cursor-pointer p-4 border-2 border-dashed rounded-xl hover:border-[#30588C] hover:bg-blue-50 transition-all ${
                  fieldErrors.image ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <Upload size={20} className="text-[#30588C]" />
                <span className="text-sm text-[#30588C] font-medium">
                  {image ? 'Cambiar foto de perfil *' : 'Subir foto de perfil *'}
                </span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageChange} 
                  required 
                />
              </label>
              
              {fieldErrors.image && (
                <p className="text-xs text-red-500">{fieldErrors.image}</p>
              )}
              
              {imagePreview && (
                <div className="flex items-center gap-3">
                  <img src={imagePreview} alt="Vista previa" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <Check size={16} />
                    Imagen cargada correctamente
                  </div>
                </div>
              )}
            </div>

            {/* Botón de envío */}
            <button 
              type="submit" 
              disabled={!isFormValid() || isLoading}
              onClick={handleRegister}
              className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
                isFormValid() && !isLoading
                  ? 'bg-gradient-to-r from-[#BF3952] to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Procesando...
                </div>
              ) : (
                `Continuar como ${activeTab === 'usuario' ? 'Usuario' : 'Refugio'}`
              )}
            </button>
          </div>

          {/* Link de inicio de sesión */}
          <div className="text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <span className="text-[#30588C] hover:text-[#254559] font-medium underline cursor-pointer transition-colors">
              Inicia sesión
            </span>
          </div>
        </div>
      </div>

      {/* Modal de recorte de imagen */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#011526]">
              Ajustar foto de perfil
            </h3>
            <p className="text-sm text-[#254559] mb-4 text-center">
              La imagen es demasiado grande. Puedes recortarla o redimensionarla.
            </p>
            
            <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src={tempImage} alt="Imagen a recortar" className="w-full h-full object-contain" />
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-2 rounded-md text-xs flex items-center gap-1">
                <Crop size={14} />
                Vista previa
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCropCancel}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleCropAccept}
                className="px-4 py-2 rounded-lg bg-[#30588C] text-white hover:bg-[#254559] transition-colors font-medium"
              >
                Usar imagen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de carga */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-[#30588C] rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-[#011526] mb-2">
              Procesando registro
            </h3>
            <p className="text-[#254559] mb-6">
              Conectando con la base de datos y validando información...
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-[#254559] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Validando datos del formulario
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Subiendo foto de perfil a Cloudinary
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#30588C] rounded-full animate-pulse"></div>
                Registrando en base de datos Azure SQL
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-[#BF3952]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-[#BF3952] mb-2">
              ¡Ups! Algo salió mal
            </h3>
            <p className="text-[#254559] mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <button 
              onClick={() => setErrorMessage('')} 
              className="bg-[#30588C] text-white hover:bg-[#254559] px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-green-600 mb-2">
              ¡Registro exitoso!
            </h3>
            <p className="text-[#254559] mb-6">
              {successMessage}
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <span className="text-sm">Preparando tu perfil...</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}