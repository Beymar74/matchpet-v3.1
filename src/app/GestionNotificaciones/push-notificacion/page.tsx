'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Send,  // Corregido a Send
  Search,
  Edit2,
  PlusSquare
} from 'lucide-react';

interface MensajeMasivo {
  id: number;
  nombre: string;
  tipo: 'Email' | 'SMS' | 'Push';
  mensaje: string;
  fecha_envio: string;
  estado: 'Programada' | 'Enviada';
}

export default function MensajeMasivo() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState<'Email' | 'SMS' | 'Push'>('Email');
  const [fechaEnvio, setFechaEnvio] = useState('');
  const [mensajes, setMensajes] = useState<MensajeMasivo[]>([]);
  const [estado, setEstado] = useState<'success' | 'error' | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [mensajeAEliminar, setMensajeAEliminar] = useState<number | null>(null);

  // Simulamos algunos mensajes masivos
  useEffect(() => {
    const simulados: MensajeMasivo[] = [
      {
        id: 101,
        nombre: 'Bienvenida a MatchPet',
        tipo: 'Email',
        mensaje: 'Gracias por unirte a nuestra plataforma de adopción. ¡Explora nuestras mascotas disponibles!',
        fecha_envio: '2025-06-10 10:00',
        estado: 'Programada'
      },
      {
        id: 102,
        nombre: 'Adopciones destacadas',
        tipo: 'SMS',
        mensaje: '¡No te pierdas las adopciones destacadas de la semana! Haz clic para ver más.',
        fecha_envio: '2025-06-07 09:30',
        estado: 'Enviada'
      },
      {
        id: 103,
        nombre: 'Promoción de Adopción',
        tipo: 'Push',
        mensaje: '¡Adopta ahora y recibe un descuento en la cuota de adopción!',
        fecha_envio: '2025-06-09 15:00',
        estado: 'Programada'
      }
    ];

    setMensajes(simulados);
  }, []);

  const handleEnviar = () => {
    const fechaLimite = new Date().toISOString().slice(0, 16); // Limita la fecha a solo futuras fechas
    if (!nombre || !mensaje || !fechaEnvio || fechaEnvio < fechaLimite) {
      setEstado('error');
      return;
    }

    const nuevoMensaje: MensajeMasivo = {
      id: Date.now(),
      nombre,
      tipo,
      mensaje,
      fecha_envio: fechaEnvio,
      estado: 'Programada'
    };

    setMensajes([nuevoMensaje, ...mensajes]);
    setNombre('');
    setMensaje('');
    setFechaEnvio('');
    setEstado('success');
    setTimeout(() => setEstado(null), 3000);
  };

  const eliminarMensaje = () => {
    if (mensajeAEliminar !== null) {
      setMensajes(mensajes.filter((mensaje) => mensaje.id !== mensajeAEliminar));
      setModalEliminarVisible(false);
      setMensajeAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminarVisible(false);
    setMensajeAEliminar(null);
  };

  // Cambiar estado de la campaña a "Enviada"
  const enviarCampana = (id: number) => {
    setMensajes(
      mensajes.map((mensaje) =>
        mensaje.id === id ? { ...mensaje, estado: 'Enviada' } : mensaje
      )
    );
  };

  // Filtro de búsqueda
  const mensajesFiltrados = mensajes.filter((mensaje) =>
    mensaje.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    mensaje.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
    mensaje.estado.toLowerCase().includes(busqueda.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Push Notification</h1>
          <p className="text-gray-600">Crea y envía mensajes masivos (Push)</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre del Mensaje</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Bienvenida a MatchPet"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tipo de Mensaje</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'Email' | 'SMS' | 'Push')}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
          </select>
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
            Mensaje programado correctamente.
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
          <Send className="h-5 w-5" /> {/* Aquí usamos el ícono Send */}
          Enviar Mensaje
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
            placeholder="Buscar por nombre, tipo o estado"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Mensajes existentes */}
      {mensajesFiltrados.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mensajes Programados</h2>
          <div className="space-y-3">
            {mensajesFiltrados.map((mensaje) => (
              <div
                key={mensaje.id}
                className="flex justify-between items-center p-4 border border-gray-200 bg-gray-50 rounded-md"
              >
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{mensaje.nombre}</p>
                    <p className="text-sm text-gray-600">{mensaje.tipo}</p>
                    <p className="text-xs text-gray-400 mt-1">{mensaje.fecha_envio}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {mensaje.estado === 'Programada' ? (
                    <button
                      onClick={() => enviarCampana(mensaje.id)}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Enviar
                    </button>
                  ) : (
                    <span
                      className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600"
                    >
                      Enviado
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setMensajeAEliminar(mensaje.id);
                      setModalEliminarVisible(true);
                    }}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
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
              <h3 className="text-lg font-semibold">Eliminar Mensaje</h3>
              <button onClick={cancelarEliminacion}>
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600">¿Estás seguro de eliminar este mensaje programado?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={cancelarEliminacion}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarMensaje}
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
