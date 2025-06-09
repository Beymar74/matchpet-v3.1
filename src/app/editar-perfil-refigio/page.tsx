'use client';

import React, { useState, useEffect, FormEvent, useCallback, useRef } from 'react';
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
  EyeOff,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  Shield,
  Image as ImageIcon,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

const EdicionPerfilAdoptante: React.FC = () => {
  const router = useRouter();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Estados para crop
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showPhotoConfirmation, setShowPhotoConfirmation] = useState(false);
  
  // Estados para el crop real
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalImageDimensions, setOriginalImageDimensions] = useState({ width: 0, height: 0 });

  // Datos originales para comparar cambios
  const [originalData, setOriginalData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    fotoPerfil: '',
  });

  // Historial de cambios para undo/redo
  const [changeHistory, setChangeHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Detectar conectividad
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Toast notifications
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  // Función para comprimir imagen
  const compressImage = useCallback((file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  // Auto-save funcionalidad
  const autoSave = useCallback(async () => {
    if (!autoSaveEnabled || !unsavedChanges || !isOnline) return;

    try {
      const idUsuario = localStorage.getItem('idUsuario');
      if (!idUsuario) return;

      const body: any = { idUsuario: parseInt(idUsuario) };
      let hasChangesToSave = false;

      if (profileData.fullName && profileData.fullName !== originalData.fullName) {
        body.nombre = profileData.fullName;
        hasChangesToSave = true;
      }
      if (profileData.email && profileData.email !== originalData.email) {
        body.correo = profileData.email;
        hasChangesToSave = true;
      }
      if (profileData.phoneNumber && profileData.phoneNumber !== originalData.phoneNumber) {
        body.telefono = profileData.phoneNumber;
        hasChangesToSave = true;
      }

      if (hasChangesToSave) {
        const res = await fetch('/api/usuarios/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          setLastSaved(new Date());
          addToast({
            type: 'info',
            title: 'Autoguardado',
            message: 'Cambios guardados automáticamente'
          });
        }
      }
    } catch (error) {
      console.error('Error en autoguardado:', error);
    }
  }, [profileData, originalData, autoSaveEnabled, unsavedChanges, isOnline, addToast]);

  // Setup auto-save timer
  useEffect(() => {
    if (autoSaveEnabled && unsavedChanges) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(autoSave, 30000); // 30 segundos
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [autoSave, autoSaveEnabled, unsavedChanges]);

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const cargarDatosDesdeBD = async () => {
      const idUsuario = localStorage.getItem('idUsuario');
      if (!idUsuario) return;

      try {
        const res = await fetch(`/api/usuarios/${idUsuario}`);
        const data = await res.json();

        if (data.success) {
          const userData = {
            fullName: data.usuario.Nombre || '',
            phoneNumber: data.usuario.Telefono || '',
            email: data.usuario.Correo || '',
            password: '',
            confirmPassword: '',
          };
          
          const photoUrl = data.usuario.Foto_Perfil || '/Perfil/Usuario1.jpeg';
          
          setProfileData(userData);
          setProfilePhoto(photoUrl);
          
          // Guardar datos originales para comparar
          setOriginalData({
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            fotoPerfil: photoUrl,
          });

          // Actualizar localStorage
          localStorage.setItem('nombreUsuario', userData.fullName);
          localStorage.setItem('correoElectronico', userData.email);
          localStorage.setItem('telefono', userData.phoneNumber);
          localStorage.setItem('fotoPerfil', photoUrl);

          addToast({
            type: 'success',
            title: 'Datos cargados',
            message: 'Información del perfil cargada correctamente'
          });
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
        addToast({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los datos del perfil'
        });
      }
    };

    cargarDatosDesdeBD();
  }, [addToast]);

  // Detectar cambios no guardados
  useEffect(() => {
    const hasChanges = 
      profileData.fullName !== originalData.fullName ||
      profileData.phoneNumber !== originalData.phoneNumber ||
      profileData.email !== originalData.email ||
      profileData.password !== '' ||
      profilePhoto !== originalData.fotoPerfil;
    
    setUnsavedChanges(hasChanges);
  }, [profileData, profilePhoto, originalData]);

  // Validación en tiempo real
  const validateField = useCallback((fieldName: string, value: string) => {
    const newErrors: {[key: string]: string} = { ...errors };

    switch (fieldName) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Formato de correo electrónico inválido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phoneNumber':
        if (value && !/^\d{8,15}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phoneNumber = 'Número de teléfono inválido (8-15 dígitos)';
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (profileData.password && value !== profileData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  }, [errors, profileData.password]);

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

  // Función para subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    // Comprimir imagen antes de subir
    const compressedFile = await compressImage(file);
    
    const formDataImg = new FormData();
    formDataImg.append('file', compressedFile);
    formDataImg.append('upload_preset', 'matchpet_preset');
    
    const res = await fetch('https://api.cloudinary.com/v1_1/duqzhng9e/image/upload', {
      method: 'POST',
      body: formDataImg,
    });
    
    if (!res.ok) {
      throw new Error('Error al subir la imagen');
    }
    
    const data = await res.json();
    return data.secure_url;
  };

  // Función para crear imagen recortada
  const createCroppedImage = useCallback((imageSrc: string, crop: typeof cropData): Promise<File> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Establecer el tamaño del canvas fijo a 320x320
        canvas.width = 320;
        canvas.height = 320;
        
        // Calcular la escala entre la imagen mostrada y la imagen real
        const scaleX = image.naturalWidth / originalImageDimensions.width;
        const scaleY = image.naturalHeight / originalImageDimensions.height;
        
        // Dibujar la porción recortada de la imagen escalada a 320x320
        ctx.drawImage(
          image,
          crop.x * scaleX, // sx
          crop.y * scaleY, // sy
          crop.width * scaleX, // sWidth
          crop.height * scaleY, // sHeight
          0, // dx
          0, // dy
          320, // dWidth - siempre 320px
          320 // dHeight - siempre 320px
        );
        
        // Convertir canvas a blob y luego a File
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], 'cropped-image-320x320.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(croppedFile);
          }
        }, 'image/jpeg', 0.9);
      };
      image.src = imageSrc;
    });
  }, [originalImageDimensions]);

  // Función para crop
  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !imageFile) return;
      
      setUploadingPhoto(true);
      
      // Crear imagen recortada
      const croppedFile = await createCroppedImage(imageSrc, cropData);
      
      // Subir imagen recortada a Cloudinary
      const cloudinaryUrl = await uploadImageToCloudinary(croppedFile);
      
      setProfilePhoto(cloudinaryUrl);
      setShowCropper(false);
      setImageSrc(null);
      setImageFile(null);
      setUploadingPhoto(false);
      
      // Guardar cambio inmediatamente
      const idUsuario = localStorage.getItem('idUsuario');
      if (idUsuario) {
        const res = await fetch('/api/usuarios/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idUsuario: parseInt(idUsuario),
            fotoPerfil: cloudinaryUrl
          })
        });
        
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('fotoPerfil', cloudinaryUrl);
          setOriginalData(prev => ({ ...prev, fotoPerfil: cloudinaryUrl }));
          setLastSaved(new Date());
          
          addToast({
            type: 'success',
            title: 'Foto actualizada',
            message: 'Tu foto de perfil (320×320px) se ha actualizado correctamente'
          });
        }
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Error al subir la imagen. Por favor, intenta de nuevo.'
      });
      setUploadingPhoto(false);
    }
  }, [imageSrc, imageFile, cropData, createCroppedImage, addToast, compressImage]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        addToast({
          type: 'error',
          title: 'Archivo muy grande',
          message: 'La imagen debe ser menor a 5MB'
        });
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        addToast({
          type: 'error',
          title: 'Formato incorrecto',
          message: 'Solo se permiten archivos de imagen'
        });
        return;
      }

      const imageDataUrl = await readFile(file);
      
      // Obtener dimensiones originales de la imagen
      const img = new Image();
      img.onload = () => {
        // Calcular dimensiones para mostrar en el cropper (max 400px)
        const maxDisplaySize = 400;
        let displayWidth = img.width;
        let displayHeight = img.height;
        
        if (img.width > maxDisplaySize || img.height > maxDisplaySize) {
          const ratio = Math.min(maxDisplaySize / img.width, maxDisplaySize / img.height);
          displayWidth = img.width * ratio;
          displayHeight = img.height * ratio;
        }
        
        setOriginalImageDimensions({ width: displayWidth, height: displayHeight });
        
        // Establecer crop inicial (cuadrado centrado)
        const cropSize = Math.min(displayWidth, displayHeight) * 0.8;
        setCropData({
          x: (displayWidth - cropSize) / 2,
          y: (displayHeight - cropSize) / 2,
          width: cropSize,
          height: cropSize
        });
      };
      img.src = imageDataUrl;
      
      setImageSrc(imageDataUrl);
      setImageFile(file);
      setShowCropper(true);
    }
  };

  // Funciones para manejar el crop interactivo
  const handleCropMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDragStart({ x, y });
    
    if (action === 'drag') {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }
  };

  const handleCropMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;
    
    if (isDragging) {
      // Mover el área de crop
      const newX = Math.max(0, Math.min(originalImageDimensions.width - cropData.width, cropData.x + deltaX));
      const newY = Math.max(0, Math.min(originalImageDimensions.height - cropData.height, cropData.y + deltaY));
      
      setCropData(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
    } else if (isResizing) {
      // Redimensionar el área de crop
      const newWidth = Math.max(50, Math.min(originalImageDimensions.width - cropData.x, cropData.width + deltaX));
      const newHeight = newWidth; // Mantener proporción cuadrada
      
      setCropData(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }));
    }
    
    setDragStart({ x, y });
  };

  const handleCropMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
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
      // Validación en tiempo real
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!isOnline) {
      addToast({
        type: 'error',
        title: 'Sin conexión',
        message: 'No hay conexión a internet. Verifica tu conexión e intenta de nuevo.'
      });
      return;
    }

    setLoading(true);

    try {
      const idUsuario = localStorage.getItem('idUsuario');
      if (!idUsuario) {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Usuario no identificado'
        });
        setLoading(false);
        return;
      }

      const body: any = { idUsuario: parseInt(idUsuario) };

      // Solo agregamos campos que hayan cambiado y no estén vacíos
      if (profileData.fullName && profileData.fullName !== originalData.fullName) {
        body.nombre = profileData.fullName;
      }
      if (profileData.email && profileData.email !== originalData.email) {
        body.correo = profileData.email;
      }
      if (profileData.phoneNumber && profileData.phoneNumber !== originalData.phoneNumber) {
        body.telefono = profileData.phoneNumber;
      }
      if (profileData.password) {
        body.contrasena = profileData.password;
      }

      // Si no hay cambios, salimos
      if (Object.keys(body).length === 1) {
        addToast({
          type: 'warning',
          title: 'Sin cambios',
          message: 'No se detectaron cambios para actualizar.'
        });
        setLoading(false);
        return;
      }

      const res = await fetch('/api/usuarios/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (data.success) {
        if (body.nombre) {
          localStorage.setItem('nombreUsuario', body.nombre);
          setOriginalData(prev => ({ ...prev, fullName: body.nombre }));
        }
        if (body.correo) {
          localStorage.setItem('correoElectronico', body.correo);
          setOriginalData(prev => ({ ...prev, email: body.correo }));
        }
        if (body.telefono) {
          localStorage.setItem('telefono', body.telefono);
          setOriginalData(prev => ({ ...prev, phoneNumber: body.telefono }));
        }
        if (body.contrasena) {
          localStorage.setItem('password', body.contrasena);
          setProfileData(prev => ({ 
            ...prev, 
            password: '', 
            confirmPassword: '' 
          }));
        }

        setLastSaved(new Date());
        setModalOpen(true);
        setUnsavedChanges(false);

        addToast({
          type: 'success',
          title: 'Perfil actualizado',
          message: 'Tu información se ha guardado correctamente'
        });
      } else {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Hubo un problema al actualizar el perfil.'
        });
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      addToast({
        type: 'error',
        title: 'Error inesperado',
        message: 'Error inesperado al actualizar el perfil.'
      });
    }

    setLoading(false);
  };

  const resetForm = () => {
    setProfileData({
      fullName: originalData.fullName,
      phoneNumber: originalData.phoneNumber,
      email: originalData.email,
      password: '',
      confirmPassword: '',
    });
    setProfilePhoto(originalData.fotoPerfil);
    setErrors({});
    setUnsavedChanges(false);
    
    addToast({
      type: 'info',
      title: 'Formulario reiniciado',
      message: 'Se han restaurado los valores originales'
    });
  };

  const closeModalAndRedirect = () => {
    setModalOpen(false);
    router.push('/ver-perfil-refugio');
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      setShowExitModal(true);
    } else {
      router.push('/ver-perfil-refugio');
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    router.push('/ver-perfil-refugio');
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  // Toast Component
  const Toast = ({ toast }: { toast: ToastMessage }) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      error: <XCircle className="w-5 h-5 text-red-500" />,
      warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      info: <Info className="w-5 h-5 text-blue-500" />
    };

    const colors = {
      success: 'bg-green-50 border-green-200',
      error: 'bg-red-50 border-red-200',
      warning: 'bg-yellow-50 border-yellow-200',
      info: 'bg-blue-50 border-blue-200'
    };

    return (
      <div className={`${colors[toast.type]} border rounded-lg p-4 shadow-lg max-w-sm`}>
        <div className="flex items-start space-x-3">
          {icons[toast.type]}
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{toast.title}</h4>
            <p className="text-sm text-gray-600">{toast.message}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderMain />
      <div className="min-h-screen bg-gray-50">
        {/* Toast Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} />
          ))}
        </div>

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
              
              <div className="flex items-center space-x-4">
                {/* Indicador de conexión */}
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  isOnline ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
                  <span className="text-sm font-medium">
                    {isOnline ? 'Conectado' : 'Sin conexión'}
                  </span>
                </div>

                {/* Indicador de cambios sin guardar */}
                {unsavedChanges && (
                  <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Cambios sin guardar</span>
                  </div>
                )}

                {/* Último guardado */}
                {lastSaved && (
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Clock size={14} />
                    <span>Guardado: {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Controles adicionales */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="rounded border-gray-300 text-[#30588C] focus:ring-[#30588C]/20"
                  />
                  <span className="text-sm text-gray-700">Autoguardado</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  disabled={!unsavedChanges}
                >
                  <RefreshCw size={14} />
                  <span>Reiniciar</span>
                </Button>
              </div>
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
                    {uploadingPhoto && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-2">
                    <label
                      htmlFor="photoUpload"
                      className={`cursor-pointer inline-flex items-center space-x-2 bg-[#30588C] hover:bg-[#254559] text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                        uploadingPhoto ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload size={16} />
                      <span>{uploadingPhoto ? 'Subiendo...' : 'Cambiar Foto'}</span>
                    </label>
                    <input
                      type="file"
                      id="photoUpload"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      disabled={uploadingPhoto}
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
                          <li>• Las imágenes se optimizan a 320×320px</li>
                          <li>• Usa buena iluminación</li>
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
                        Nombre Completo
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
                        Correo Electrónico
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
                        Número de Teléfono
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
                          Confirmar Nueva Contraseña
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
                        <Shield size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Consejos de seguridad:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Usa al menos 6 caracteres</li>
                            <li>• Combina letras, números y símbolos</li>
                            <li>• No uses información personal</li>
                            <li>• Cambia tu contraseña regularmente</li>
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
                      disabled={loading || !isOnline}
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
                          <span>Guardar Cambios</span>
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

      {/* Modal Cropper Real */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Crop className="text-[#30588C]" />
              <span>Recortar Imagen</span>
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Arrastra para mover el área de recorte. Usa el controlador en la esquina inferior derecha para redimensionar.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>📐 Tamaño final:</strong> La imagen se redimensionará automáticamente a <strong>320 × 320 píxeles</strong> para optimizar el rendimiento.
                </p>
              </div>
            </div>
            
            <div 
              className="relative bg-gray-100 rounded-xl mx-auto overflow-hidden"
              style={{ 
                width: originalImageDimensions.width, 
                height: originalImageDimensions.height,
                maxWidth: '100%',
                maxHeight: '400px'
              }}
              onMouseMove={handleCropMouseMove}
              onMouseUp={handleCropMouseUp}
              onMouseLeave={handleCropMouseUp}
            >
              <img
                src={imageSrc}
                alt="Vista previa"
                className="w-full h-full object-contain select-none"
                draggable={false}
                style={{ 
                  width: originalImageDimensions.width, 
                  height: originalImageDimensions.height 
                }}
              />
              
              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Área de crop */}
              <div
                className="absolute border-2 border-white bg-transparent cursor-move"
                style={{
                  left: cropData.x,
                  top: cropData.y,
                  width: cropData.width,
                  height: cropData.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                }}
                onMouseDown={(e) => handleCropMouseDown(e, 'drag')}
              >
                {/* Vista previa del crop */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="Crop preview"
                    className="select-none"
                    draggable={false}
                    style={{
                      width: originalImageDimensions.width,
                      height: originalImageDimensions.height,
                      marginLeft: -cropData.x,
                      marginTop: -cropData.y,
                    }}
                  />
                </div>
                
                {/* Controlador de redimensionamiento */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-white border-2 border-[#30588C] cursor-se-resize transform translate-x-1 translate-y-1"
                  onMouseDown={(e) => handleCropMouseDown(e, 'resize')}
                  onClick={(e) => e.stopPropagation()}
                ></div>
                
                {/* Líneas de guía */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Líneas verticales */}
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30"></div>
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30"></div>
                  {/* Líneas horizontales */}
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30"></div>
                </div>
              </div>
            </div>
            
            {/* Controles adicionales */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <div>Área: {Math.round(cropData.width)} × {Math.round(cropData.height)}px</div>
                <div className="text-xs text-blue-600 font-medium">Resultado final: 320 × 320px</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // Reset crop to center square
                    const cropSize = Math.min(originalImageDimensions.width, originalImageDimensions.height) * 0.8;
                    setCropData({
                      x: (originalImageDimensions.width - cropSize) / 2,
                      y: (originalImageDimensions.height - cropSize) / 2,
                      width: cropSize,
                      height: cropSize
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Centrar
                </Button>
                
                <Button
                  onClick={() => {
                    // Maximizar el área de crop manteniendo proporción cuadrada
                    const maxSize = Math.min(originalImageDimensions.width, originalImageDimensions.height);
                    setCropData({
                      x: (originalImageDimensions.width - maxSize) / 2,
                      y: (originalImageDimensions.height - maxSize) / 2,
                      width: maxSize,
                      height: maxSize
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  □ Maximizar
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={() => {
                  setShowCropper(false);
                  setImageSrc(null);
                  setImageFile(null);
                }}
                variant="outline"
                className="px-6 py-2"
                disabled={uploadingPhoto}
              >
                Cancelar
              </Button>
              <Button
                onClick={showCroppedImage}
                className="bg-[#BF3952] hover:bg-[#a32e45] text-white px-6 py-2"
                disabled={uploadingPhoto}
              >
                {uploadingPhoto ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <Crop size={16} className="mr-2" />
                    Recortar y Guardar
                  </>
                )}
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