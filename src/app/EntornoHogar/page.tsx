'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

// Tipos mejorados
interface EnvironmentDetails {
  dwellingType: string;
  homeSize: string;
  yardSize: string;
  hasOtherPets: boolean;
  petTypes: string;
  petCount: string;
  hasChildren: boolean;
  childrenAges: string;
  timeAlone: string;
  activityLevel: string;
  previousExperience: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FieldConfig {
  id: keyof EnvironmentDetails;
  label: string;
  type: 'text' | 'select' | 'checkbox' | 'textarea' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  conditional?: {
    dependsOn: keyof EnvironmentDetails;
    value: any;
  };
}

const EntornoHogar: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState(false);

  const [environmentDetails, setEnvironmentDetails] = useState<EnvironmentDetails>({
    dwellingType: '',
    homeSize: '',
    yardSize: '',
    hasOtherPets: false,
    petTypes: '',
    petCount: '',
    hasChildren: false,
    childrenAges: '',
    timeAlone: '',
    activityLevel: '',
    previousExperience: '',
  });

  // Configuración de campos para hacer el formulario más dinámico
  const fieldConfigs: FieldConfig[] = [
    {
      id: 'dwellingType',
      label: 'Tipo de Vivienda',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Seleccione' },
        { value: 'casa', label: 'Casa' },
        { value: 'apartamento', label: 'Apartamento' },
        { value: 'duplex', label: 'Dúplex' },
        { value: 'estudio', label: 'Estudio' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    {
      id: 'homeSize',
      label: 'Tamaño del Hogar (m²)',
      type: 'number',
      required: true,
      placeholder: 'Ej. 90',
    },
    {
      id: 'yardSize',
      label: 'Tamaño del Patio (m²)',
      type: 'number',
      placeholder: 'Ej. 50 (opcional)',
    },
    {
      id: 'hasOtherPets',
      label: '¿Tiene otros animales en casa?',
      type: 'checkbox',
    },
    {
      id: 'petTypes',
      label: 'Tipo(s) y cantidad de mascotas:',
      type: 'text',
      placeholder: 'Ej. 2 perros pequeños, 1 gato',
      conditional: {
        dependsOn: 'hasOtherPets',
        value: true,
      },
    },
    {
      id: 'hasChildren',
      label: '¿Tiene niños en casa?',
      type: 'checkbox',
    },
    {
      id: 'childrenAges',
      label: 'Edades de los niños',
      type: 'text',
      placeholder: 'Ej. 4, 7, 12 años',
      conditional: {
        dependsOn: 'hasChildren',
        value: true,
      },
    },
    {
      id: 'timeAlone',
      label: '¿Cuántas horas estará solo el animal al día?',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Seleccione' },
        { value: '0-2', label: '0-2 horas' },
        { value: '3-4', label: '3-4 horas' },
        { value: '5-6', label: '5-6 horas' },
        { value: '7-8', label: '7-8 horas' },
        { value: '9+', label: 'Más de 9 horas' },
      ],
    },
    {
      id: 'activityLevel',
      label: 'Nivel de Actividad del Hogar',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Seleccione' },
        { value: 'bajo', label: 'Bajo - Ambiente tranquilo y relajado' },
        { value: 'medio', label: 'Medio - Actividad moderada' },
        { value: 'alto', label: 'Alto - Ambiente muy activo y dinámico' },
      ],
    },
    {
      id: 'previousExperience',
      label: 'Experiencia previa con mascotas',
      type: 'textarea',
      placeholder: 'Describe tu experiencia previa con animales, cuidados que has brindado, tipos de mascotas que has tenido, etc.',
      rows: 4,
    },
  ];

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('environmentDetails');
    if (savedData) {
      try {
        setEnvironmentDetails(JSON.parse(savedData));
      } catch (error) {
        console.error('Error al cargar datos guardados:', error);
      }
    }
  }, []);

  // Autoguardado cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.values(environmentDetails).some(value => value !== '' && value !== false)) {
        localStorage.setItem('environmentDetails', JSON.stringify(environmentDetails));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [environmentDetails]);

  // Validación mejorada
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    fieldConfigs.forEach(field => {
      if (field.required) {
        const value = environmentDetails[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = `${field.label} es requerido`;
        }
      }

      // Validaciones específicas
      if (field.id === 'homeSize' && environmentDetails.homeSize) {
        const size = parseInt(environmentDetails.homeSize);
        if (isNaN(size) || size < 10 || size > 10000) {
          newErrors.homeSize = 'Ingrese un tamaño válido entre 10 y 10000 m²';
        }
      }

      if (field.id === 'yardSize' && environmentDetails.yardSize) {
        const size = parseInt(environmentDetails.yardSize);
        if (isNaN(size) || size < 0 || size > 50000) {
          newErrors.yardSize = 'Ingrese un tamaño válido entre 0 y 50000 m²';
        }
      }

      if (environmentDetails.hasOtherPets && !environmentDetails.petTypes.trim()) {
        newErrors.petTypes = 'Especifique qué tipos de mascotas tiene';
      }

      if (environmentDetails.hasChildren && !environmentDetails.childrenAges.trim()) {
        newErrors.childrenAges = 'Especifique las edades de los niños';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setEnvironmentDetails(prev => ({ ...prev, [name]: newValue }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Guardar en localStorage como respaldo
      localStorage.setItem('environmentDetails', JSON.stringify(environmentDetails));
      
      console.log('Guardando detalles del entorno:', environmentDetails);
      
      setIsSaved(true);
      
      // Redireccionar después de un breve delay para mostrar el mensaje de éxito
      setTimeout(() => {
        router.push('/verperfil');
      }, 1500);
      
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrors({ submit: 'Error al guardar los datos. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = Object.values(environmentDetails).some(value => value !== '' && value !== false);
    
    if (hasChanges && !confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
      return;
    }
    
    localStorage.removeItem('environmentDetails');
    router.push('/verperfil');
  };

  const renderField = (config: FieldConfig) => {
    // Verificar si el campo debe mostrarse basado en condiciones
    if (config.conditional) {
      const dependentValue = environmentDetails[config.conditional.dependsOn];
      if (dependentValue !== config.conditional.value) {
        return null;
      }
    }

    const fieldValue = environmentDetails[config.id];
    const hasError = !!errors[config.id];
    const inputClasses = `w-full border rounded-md py-2 px-3 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#BF3952] ${
      hasError 
        ? 'border-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:border-[#BF3952]'
    }`;

    return (
      <div key={config.id} className={config.conditional ? "md:col-span-2" : ""}>
        <label htmlFor={config.id} className="block text-sm font-medium mb-2">
          {config.label}
          {config.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {config.type === 'select' && (
          <select
            id={config.id}
            name={config.id}
            value={fieldValue as string}
            onChange={handleChange}
            className={inputClasses}
            aria-describedby={hasError ? `${config.id}-error` : undefined}
          >
            {config.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {config.type === 'textarea' && (
          <textarea
            id={config.id}
            name={config.id}
            value={fieldValue as string}
            onChange={handleChange}
            rows={config.rows || 3}
            placeholder={config.placeholder}
            className={inputClasses}
            aria-describedby={hasError ? `${config.id}-error` : undefined}
          />
        )}

        {config.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={config.id}
              name={config.id}
              checked={fieldValue as boolean}
              onChange={handleChange}
              className="text-[#BF3952] h-4 w-4 rounded border-gray-300 focus:ring-[#BF3952]"
              aria-describedby={hasError ? `${config.id}-error` : undefined}
            />
            <label htmlFor={config.id} className="text-sm cursor-pointer">
              {config.label}
            </label>
          </div>
        )}

        {(config.type === 'text' || config.type === 'number') && (
          <input
            type={config.type}
            id={config.id}
            name={config.id}
            value={fieldValue as string}
            onChange={handleChange}
            placeholder={config.placeholder}
            className={inputClasses}
            aria-describedby={hasError ? `${config.id}-error` : undefined}
            min={config.type === 'number' ? 0 : undefined}
          />
        )}

        {hasError && (
          <p id={`${config.id}-error`} className="mt-1 text-sm text-red-500" role="alert">
            {errors[config.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <HeaderUsuario />
      <div className="min-h-screen bg-gray-50 py-12 px-6 pt-24 text-black">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg bg-white p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#30588C] mb-4">
              Registro de Entorno del Hogar
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Esta información nos ayudará a encontrar la mascota perfecta que se adapte a tu hogar y estilo de vida.
            </p>
          </div>

          {/* Mensaje de éxito */}
          {isSaved && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              ✅ ¡Información guardada exitosamente! Redirigiendo...
            </div>
          )}

          {/* Error general */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              ❌ {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {fieldConfigs.map(renderField)}

            {/* Indicador de autoguardado */}
            <div className="md:col-span-2 text-sm text-gray-500 text-center">
              💾 Los datos se guardan automáticamente cada 30 segundos
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-500 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#BF3952] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#a32e45] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  'Guardar Detalles del Entorno'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EntornoHogar;