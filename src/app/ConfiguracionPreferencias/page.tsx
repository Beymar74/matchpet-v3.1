'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';
import { 
  Heart, 
  Dog, 
  Cat, 
  Baby, 
  Users, 
  Activity, 
  Ruler, 
  Calendar,
  FileText,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Home,
  Zap
} from 'lucide-react';

const ConfiguracionPreferencias: React.FC = () => {
  const router = useRouter();

  const initialPreferences = {
    species: '',
    ageRange: '',
    size: '',
    energyLevel: '',
    notes: '',
    compatibility: {
      withChildren: false,
      withOtherDogs: false,
      withCats: false,
      withElderly: false,
    },
  };

  const [preferences, setPreferences] = useState(initialPreferences);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!preferences.species) {
      newErrors.species = 'Por favor selecciona una preferencia de especie';
    }
    
    if (!preferences.ageRange) {
      newErrors.ageRange = 'Por favor selecciona un rango de edad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCompatibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      compatibility: {
        ...prev.compatibility,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Guardando preferencias:', preferences);
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    router.push('/verperfil');
  };

  const handleCancel = () => {
    router.push('/verperfil');
  };

  const speciesOptions = [
    { value: '', label: 'Cualquier especie', icon: Heart },
    { value: 'dog', label: 'Solo Perros', icon: Dog },
    { value: 'cat', label: 'Solo Gatos', icon: Cat },
    { value: 'both', label: 'Perros y Gatos', icon: Heart },
  ];

  const ageOptions = [
    { value: '', label: 'Cualquier edad' },
    { value: 'young', label: 'Cachorro / Joven (0-2 años)' },
    { value: 'adult', label: 'Adulto (2-7 años)' },
    { value: 'senior', label: 'Senior (7+ años)' },
  ];

  const sizeOptions = [
    { value: '', label: 'Cualquier tamaño' },
    { value: 'small', label: 'Pequeño (< 10kg)' },
    { value: 'medium', label: 'Mediano (10-25kg)' },
    { value: 'large', label: 'Grande (> 25kg)' },
  ];

  const energyOptions = [
    { value: '', label: 'Cualquier nivel' },
    { value: 'low', label: 'Bajo - Tranquilo y relajado' },
    { value: 'medium', label: 'Medio - Activo moderadamente' },
    { value: 'high', label: 'Alto - Muy activo y juguetón' },
  ];

  const compatibilityOptions = [
    { key: 'withChildren', label: 'Compatible con niños', icon: Baby, description: 'Mascota que se lleva bien con niños pequeños' },
    { key: 'withOtherDogs', label: 'Compatible con otros perros', icon: Dog, description: 'Puede convivir con otros perros' },
    { key: 'withCats', label: 'Compatible con gatos', icon: Cat, description: 'Se adapta a vivir con gatos' },
    { key: 'withElderly', label: 'Compatible con personas mayores', icon: Users, description: 'Ideal para personas de la tercera edad' },
  ];

  return (
    <>
      <HeaderUsuario />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BF3952] rounded-full mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#011526] mb-2">
              Configuración de Preferencias
            </h1>
            <p className="text-lg text-[#254559] max-w-2xl mx-auto">
              Ayúdanos a encontrar la mascota perfecta para ti configurando tus preferencias de adopción
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#30588C] rounded-full flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-[#254559]">Configuración de Preferencias</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Preferencias Básicas */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <Heart className="w-6 h-6 text-[#BF3952] mr-3" />
                <h2 className="text-2xl font-bold text-[#011526]">Preferencias Básicas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Especie */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-[#254559]">
                    <Dog className="w-4 h-4 inline mr-2" />
                    Preferencia de Especie *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {speciesOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            preferences.species === option.value
                              ? 'border-[#30588C] bg-blue-50'
                              : 'border-gray-200 hover:border-[#6093BF]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="species"
                            value={option.value}
                            checked={preferences.species === option.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <IconComponent className={`w-5 h-5 mr-3 ${
                            preferences.species === option.value ? 'text-[#30588C]' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            preferences.species === option.value ? 'text-[#30588C]' : 'text-gray-700'
                          }`}>
                            {option.label}
                          </span>
                          {preferences.species === option.value && (
                            <CheckCircle className="w-5 h-5 text-[#30588C] absolute top-2 right-2" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {errors.species && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.species}
                    </div>
                  )}
                </div>

                {/* Edad */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-[#254559]">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Rango de Edad *
                  </label>
                  <select
                    name="ageRange"
                    value={preferences.ageRange}
                    onChange={handleInputChange}
                    className={`w-full border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#6093BF] transition-colors ${
                      errors.ageRange ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {ageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.ageRange && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.ageRange}
                    </div>
                  )}
                </div>

                {/* Tamaño */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-[#254559]">
                    <Ruler className="w-4 h-4 inline mr-2" />
                    Tamaño Preferido
                  </label>
                  <select
                    name="size"
                    value={preferences.size}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#6093BF] transition-colors"
                  >
                    {sizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nivel de Energía */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-[#254559]">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Nivel de Energía
                  </label>
                  <select
                    name="energyLevel"
                    value={preferences.energyLevel}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#6093BF] transition-colors"
                  >
                    {energyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compatibilidad */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <Home className="w-6 h-6 text-[#BF3952] mr-3" />
                <h2 className="text-2xl font-bold text-[#011526]">Compatibilidad del Hogar</h2>
              </div>
              <p className="text-[#254559] mb-6">
                Selecciona las opciones que mejor describan tu entorno familiar
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibilityOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isChecked = preferences.compatibility[option.key as keyof typeof preferences.compatibility];
                  
                  return (
                    <label
                      key={option.key}
                      className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        isChecked
                          ? 'border-[#30588C] bg-blue-50'
                          : 'border-gray-200 hover:border-[#6093BF]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name={option.key}
                        checked={isChecked}
                        onChange={handleCompatibilityChange}
                        className="sr-only"
                      />
                      <IconComponent className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        isChecked ? 'text-[#30588C]' : 'text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isChecked ? 'text-[#30588C]' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      </div>
                      {isChecked && (
                        <CheckCircle className="w-5 h-5 text-[#30588C] absolute top-3 right-3" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Notas Adicionales */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-[#BF3952] mr-3" />
                <h2 className="text-2xl font-bold text-[#011526]">Notas Adicionales</h2>
              </div>

              <label className="block text-sm font-semibold mb-3 text-[#254559]">
                Cuéntanos más sobre tus preferencias
              </label>
              <textarea
                name="notes"
                value={preferences.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Por ejemplo: Busco una mascota tranquila para un apartamento pequeño, o prefiero un perro entrenado para correr..."
                className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#6093BF] resize-none transition-colors"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center px-8 py-3 bg-[#BF3952] text-white font-semibold rounded-lg hover:bg-[#a32e45] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Guardar Preferencias
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Éxito */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#011526]">¡Preferencias Guardadas!</h2>
            <p className="mb-6 text-[#254559]">
              Tus preferencias han sido guardadas correctamente. Ahora podremos recomendarte mascotas que se adapten perfectamente a tu estilo de vida.
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-[#BF3952] hover:bg-[#a32e45] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Ir a mi Perfil
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfiguracionPreferencias;