'use client'; // Aseguramos que sea un componente de cliente

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Usamos next/navigation para el enrutamiento
import { UserCheck, Calendar, Phone, CheckCircle, XCircle } from 'lucide-react';

const NuevoAdopcion = () => {
  const [adoptante, setAdoptante] = useState('');
  const [mascota, setMascota] = useState('');
  const [telefono, setTelefono] = useState('');
  const [refugio, setRefugio] = useState('');
  const [fecha, setFecha] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);  // Estado para la ventana emergente
  const [error, setError] = useState('');  // Error de validación
  const [isValid, setIsValid] = useState(false);  // Habilitar/deshabilitar el botón
  const router = useRouter();  // Hook para redirigir

  // Validar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!adoptante || !mascota || !telefono || !refugio || !fecha) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación de la fecha (no permitir fecha pasada)
    const selectedDate = new Date(fecha);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setError('La fecha de adopción no puede ser una fecha pasada.');
      return;
    }

    // Si todos los campos son válidos, mostrar confirmación
    setShowConfirmation(true);
    console.log('Adopción registrada:', { adoptante, mascota, telefono, refugio, fecha });

    // Después de 2 segundos, redirigir a la página de gestión de adopciones
    setTimeout(() => {
      setShowConfirmation(false);
      router.push('/GestionAdopciones'); // Redirigir a la página de gestión de adopciones
    }, 2000); // La ventana emergente se cierra después de 2 segundos
  };

  // Verificar si todos los campos son válidos
  const handleInputChange = () => {
    if (adoptante && mascota && telefono && refugio && fecha) {
      setIsValid(true);  // Habilitar botón
      setError('');  // Limpiar mensaje de error
    } else {
      setIsValid(false);  // Deshabilitar botón
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nuevo Proceso de Adopción</h1>
              <p className="text-gray-600 mt-1">Registrar un nuevo proceso de adopción</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de Nuevo Proceso de Adopción */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Mostrar mensaje de error si existe */}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Adoptante */}
          <div>
            <label className="text-gray-600 font-medium">Adoptante</label>
            <input
              type="text"
              value={adoptante}
              onChange={(e) => {
                setAdoptante(e.target.value);
                handleInputChange(); // Actualizar validación
              }}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Nombre del adoptante"
            />
            {adoptante === '' && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
          </div>

          {/* Campo Mascota */}
          <div>
            <label className="text-gray-600 font-medium">Mascota</label>
            <input
              type="text"
              value={mascota}
              onChange={(e) => {
                setMascota(e.target.value);
                handleInputChange(); // Actualizar validación
              }}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Nombre de la mascota"
            />
            {mascota === '' && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
          </div>

          {/* Campo Teléfono */}
          <div>
            <label className="text-gray-600 font-medium">Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                handleInputChange(); // Actualizar validación
              }}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Teléfono del adoptante"
            />
            {telefono === '' && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
          </div>

          {/* Campo Refugio */}
          <div>
            <label className="text-gray-600 font-medium">Refugio</label>
            <input
              type="text"
              value={refugio}
              onChange={(e) => {
                setRefugio(e.target.value);
                handleInputChange(); // Actualizar validación
              }}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Refugio de la mascota"
            />
            {refugio === '' && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
          </div>

          {/* Campo Fecha de Adopción */}
          <div>
            <label className="text-gray-600 font-medium">Fecha de Adopción</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => {
                setFecha(e.target.value);
                handleInputChange(); // Actualizar validación
              }}
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            {fecha === '' && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
          </div>

          {/* Botón de Registro */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isValid}  // Deshabilitar el botón si los campos no son válidos
              className={`px-6 py-2 ${isValid ? 'bg-green-600' : 'bg-gray-300'} text-white rounded-lg hover:bg-green-700`}
            >
              Registrar Adopción
            </button>
          </div>
        </form>
      </div>

      {/* Ventana de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">¡Adopción Registrada!</h2>
            <p className="text-gray-600 mt-2">La adopción se ha registrado exitosamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NuevoAdopcion;
