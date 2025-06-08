'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Send,
  Calendar,
  Clock,
  Search
} from 'lucide-react';

interface Campana {
  id: number;
  nombre: string;
  asunto: string;
  mensaje: string;
  fecha_envio: string;
  estado: 'Programada' | 'Enviada';
}

export default function CampanaEmail() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [fechaEnvio, setFechaEnvio] = useState('');
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [estado, setEstado] = useState<'success' | 'error' | null>(null);
  const [campanaAEliminar, setCampanaAEliminar] = useState<number | null>(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Simulamos algunas campañas de email
  useEffect(() => {
    const simuladas: Campana[] = [
      {
        id: 101,
        nombre: 'Bienvenida a MatchPet',
        asunto: 'Gracias por registrarte 🐾',
        mensaje: 'Hola, gracias por unirte a nuestra comunidad. ¡Explora las opciones de adopción cerca de ti!',
        fecha_envio: '2025-06-09 03:26',
        estado: 'Programada'
      },
      {
        id: 102,
        nombre: 'Adopciones destacadas de la semana',
        asunto: 'Conoce a los peluditos que esperan por ti 🐶',
        mensaje: 'Te presentamos mascotas adorables que buscan hogar esta semana. ¿Te animas a adoptar?',
        fecha_envio: '2025-06-07 03:26',
        estado: 'Enviada'
      },
      {
        id: 103,
        nombre: 'Ofertas Especiales en Adopción',
        asunto: '¡No te pierdas las ofertas especiales de adopción!',
        mensaje: '¡Adopta ahora y recibe un descuento especial! Ven a conocer a nuestros adorables animales.',
        fecha_envio: '2025-06-10 10:00',
        estado: 'Programada'
      },
      {
        id: 104,
        nombre: 'Recordatorio de Cita Veterinaria',
        asunto: 'Recordatorio de tu cita veterinaria 🐾',
        mensaje: 'Recuerda que tienes una cita veterinaria programada para tu mascota. ¡Nos vemos pronto!',
        fecha_envio: '2025-06-11 09:30',
        estado: 'Programada'
      }
    ];

    setCampanas(simuladas);
  }, []);

  const handleEnviar = () => {
    const fechaLimite = new Date().toISOString().slice(0, 16); // Limita la fecha a solo futuras fechas
    if (!nombre || !asunto || !mensaje || !fechaEnvio || fechaEnvio < fechaLimite) {
      setEstado('error');
      return;
    }

    const nuevaCampana: Campana = {
      id: Date.now(),
      nombre,
      asunto,
      mensaje,
      fecha_envio: fechaEnvio,
      estado: 'Programada'
    };

    setCampanas([nuevaCampana, ...campanas]);
    setNombre('');
    setAsunto('');
    setMensaje('');
    setFechaEnvio('');
    setEstado('success');
    setTimeout(() => setEstado(null), 3000);
  };

  const eliminarCampana = () => {
    if (campanaAEliminar !== null) {
      setCampanas(campanas.filter((campana) => campana.id !== campanaAEliminar));
      setModalEliminarVisible(false);
      setCampanaAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminarVisible(false);
    setCampanaAEliminar(null);
  };

  // Cambiar estado de la campaña a "Enviada"
  const enviarCampana = (id: number) => {
    setCampanas(
      campanas.map((campana) =>
        campana.id === id ? { ...campana, estado: 'Enviada' } : campana
      )
    );
  };

  // Filtro de búsqueda
  const campanasFiltradas = campanas.filter((campana) =>
    campana.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    campana.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
    campana.estado.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Volver
      </button>

      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-2xl">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaña de Email</h1>
          <p className="text-gray-600">Crea y administra campañas de correos masivos</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre de la Campaña</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Bienvenida a MatchPet"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Asunto del Email</label>
          <input
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Ej: Gracias por registrarte 🐾"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe el mensaje aquí..."
            rows={4}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Fecha y Hora de Envío</label>
          <input
            type="datetime-local"
            value={fechaEnvio}
            onChange={(e) => setFechaEnvio(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
            min={new Date().toISOString().slice(0, 16)} // Limita las fechas a solo futuras
          />
        </div>

        {estado === 'success' && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            Campaña enviada correctamente.
          </div>
        )}
        {estado === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4" />
            Todos los campos son obligatorios y la fecha debe ser futura.
          </div>
        )}

        <button
          onClick={handleEnviar}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
          Programar Campaña
        </button>
      </div>

      {/* Filtro de Búsqueda */}
      <div className="mt-6">
        <div className="flex items-center space-x-3">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, asunto o estado"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Campañas existentes */}
      {campanasFiltradas.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Campañas Programadas</h2>
          <div className="space-y-3">
            {campanasFiltradas.map((campana) => (
              <div
                key={campana.id}
                className="flex justify-between items-center p-4 border border-gray-200 bg-gray-50 rounded-md"
              >
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{campana.nombre}</p>
                    <p className="text-sm text-gray-600">{campana.asunto}</p>
                    <p className="text-xs text-gray-400 mt-1">{campana.fecha_envio}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => enviarCampana(campana.id)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Enviar
                  </button>
                  <button
                    onClick={() => {
                      setCampanaAEliminar(campana.id);
                      setModalEliminarVisible(true);
                    }}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    campana.estado === 'Programada'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {campana.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Confirmación Eliminar */}
      {modalEliminarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-md space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Eliminar Campaña</h3>
              <button onClick={cancelarEliminacion}>
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600">¿Estás seguro de eliminar esta campaña programada?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={cancelarEliminacion}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarCampana}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
