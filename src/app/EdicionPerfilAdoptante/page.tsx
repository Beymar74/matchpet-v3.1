'use client';

import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage.ts'; // función auxiliar para extraer imagen recortada

const EdicionPerfilAdoptante: React.FC = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    fullName: '',
    dateOfBirth: null as Date | null,
    address: '',
    phoneNumber: '',
    lifestyleInfo: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string>('/Perfil/Usuario1.jpeg');
  const [modalOpen, setModalOpen] = useState(false);

  // Estados para crop
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    const storedPhoto = localStorage.getItem('fotoPerfil');
    if (storedPhoto) setProfilePhoto(storedPhoto);
  }, []);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setProfilePhoto(croppedImage);
      localStorage.setItem('fotoPerfil', croppedImage);
      setShowCropper(false);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setShowCropper(true);
    }
  };

  // Función auxiliar para leer archivo como base64
  function readFile(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setProfileData(prev => ({ ...prev, dateOfBirth: date }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    localStorage.setItem('nombreUsuario', profileData.fullName);
    if (profileData.dateOfBirth) {
      localStorage.setItem('fechaNacimiento', profileData.dateOfBirth.toISOString());
    }
    localStorage.setItem('direccion', profileData.address);
    localStorage.setItem('telefono', profileData.phoneNumber);
    localStorage.setItem('infoEstiloVida', profileData.lifestyleInfo);

    setModalOpen(true);
  };

  const closeModalAndRedirect = () => {
    setModalOpen(false);
    router.push('/verperfil');
  };

  const handleCancel = () => {
    router.push('/verperfil');
  };

  return (
    <>
      <HeaderUsuario />
      <div className="min-h-screen bg-white flex justify-center items-center px-6 py-12 pt-24">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-center text-[#30588C] mb-8">
            Edición de Perfil del Adoptante
          </h2>

          {/* Foto de perfil y crop */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={profilePhoto}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#30588C]"
            />
            <label
              htmlFor="photoUpload"
              className="mt-4 cursor-pointer bg-[#30588C] hover:bg-[#254559] text-white font-semibold px-5 py-2 rounded-xl transition"
            >
              Cambiar Foto de Perfil
            </label>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {showCropper && imageSrc && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4">
              <div className="relative w-full max-w-lg h-96 bg-white rounded-lg">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={() => setShowCropper(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={showCroppedImage}
                    className="bg-[#BF3952] text-white px-4 py-2 rounded"
                  >
                    Recortar
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                placeholder="Ej. Juan Pérez"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-800 mb-1">
                Fecha de Nacimiento
              </label>
              <DatePicker
                id="dateOfBirth"
                locale={es}
                selected={profileData.dateOfBirth}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
              />
            </div>

            {/* Dirección */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Ej. Calle Falsa 123, La Paz"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800 mb-1">
                Número de Teléfono
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Ej. 71234567"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
              />
            </div>

            {/* Estilo de vida */}
            <div>
              <label htmlFor="lifestyleInfo" className="block text-sm font-medium text-gray-800 mb-1">
                Información del Estilo de Vida
              </label>
              <textarea
                id="lifestyleInfo"
                name="lifestyleInfo"
                value={profileData.lifestyleInfo}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe tu rutina, tiempo disponible, si tienes patio, etc."
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-6">
              <button
                type="submit"
                className="bg-[#BF3952] hover:bg-[#a32e45] text-white font-semibold px-8 py-3 rounded-xl transition duration-200"
              >
                Guardar Perfil
              </button>
              <button
                type="button"
                onClick={() => router.push('/verperfil')}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-8 py-3 rounded-xl transition duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmación */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">¡Perfil Guardado!</h2>
            <p className="mb-6 text-gray-800">
              Tu perfil y foto han sido guardados correctamente.
            </p>
            <button
              onClick={closeModalAndRedirect}
              className="bg-[#BF3952] hover:bg-[#a32e45] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EdicionPerfilAdoptante;