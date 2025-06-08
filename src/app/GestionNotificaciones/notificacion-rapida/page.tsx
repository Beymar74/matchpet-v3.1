'use client';
import React, { useState, useEffect } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  CheckCircle,
  XCircle,
  Trash2,
  X,
  Pencil,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Tipo = 'Email' | 'SMS' | 'Push';

interface Envio {
  id: number;
  tipo: Tipo;
  asunto: string;
  mensaje: string;
  fecha: string;
}

const iconos: Record<Tipo, React.ReactNode> = {
  Email: <Mail className="h-5 w-5 text-blue-600" />,
  SMS: <MessageSquare className="h-5 w-5 text-green-600" />,
  Push: <Smartphone className="h-5 w-5 text-purple-600" />
};

export default function NotificacionRapida() {
  const router = useRouter();
  const [tipo, setTipo] = useState<Tipo>('Email');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviados, setEnviados] = useState<Envio[]>([]);
  const [estado, setEstado] = useState<'success' | 'error' | null>(null);
  const [envioAEliminar, setEnvioAEliminar] = useState<Envio | null>(null);
  const [envioAEditar, setEnvioAEditar] = useState<Envio | null>(null);
  const [nuevoAsunto, setNuevoAsunto] = useState('');
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  useEffect(() => {
    // Simular 3 mensajes enviados
    const simulados: Envio[] = [
      {
        id: 1,
        tipo: 'Push',
        asunto: 'Recordatorio de vacunación',
        mensaje: 'Estimado usuario, recuerda que tu mascota tiene una cita de vacunación este viernes.',
        fecha: '2025-06-07 03:23:32'
      },
      {
        id: 2,
        tipo: 'Email',
        asunto: 'Adopción exitosa',
        mensaje: '¡Felicidades! Tu proceso de adopción fue completado con éxito.',
        fecha: '2025-06-06 03:23:32'
      },
      {
        id: 3,
        tipo: 'SMS',
        asunto: 'Nuevo refugio asociado',
        mensaje: 'Un nuevo refugio se ha unido a nuestra red para ayudarte a encontrar tu mascota ideal.',
        fecha: '2025-06-05 03:23:32'
      }
    ];
    setEnviados(simulados);
  }, []);

  const handleEnviar = () => {
    if (!asunto || !mensaje) {
      setEstado('error');
      return;
    }

    const nuevoEnvio: Envio = {
      id: Date.now(),
      tipo,
      asunto,
      mensaje,
      fecha: new Date().toLocaleString()
    };

    setEnviados([nuevoEnvio, ...enviados]);
    setAsunto('');
    setMensaje('');
    setEstado('success');
    setTimeout(() => setEstado(null), 3000);
  };

  const confirmarEliminacion = () => {
    if (envioAEliminar) {
      setEnviados((prev) => prev.filter((e) => e.id !== envioAEliminar.id));
      setEnvioAEliminar(null);
    }
  };

  const confirmarEdicion = () => {
    if (envioAEditar) {
      const actualizados = enviados.map((e) =>
        e.id === envioAEditar.id
          ? { ...e, asunto: nuevoAsunto, mensaje: nuevoMensaje }
          : e
      );
      setEnviados(actualizados);
      setEnvioAEditar(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <button
        onClick={() => router.back()}
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Volver
      </button>

      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-2xl">
          <Bell className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificación Rápida</h1>
          <p className="text-gray-600">Envía mensajes inmediatos a los usuarios</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as Tipo)}
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
            >
              <option>Email</option>
              <option>SMS</option>
              <option>Push</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Asunto</label>
            <input
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {estado === 'success' && (
          <div className="text-green-600 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Notificación enviada.
          </div>
        )}
        {estado === 'error' && (
          <div className="text-red-600 text-sm flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Por favor completa todos los campos.
          </div>
        )}

        <button
          onClick={handleEnviar}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
          Enviar Notificación
        </button>
      </div>

      {enviados.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Envíos Recientes</h2>
          <div className="space-y-3">
            {enviados.map((e) => (
              <div
                key={e.id}
                className="flex justify-between items-start p-4 border border-gray-200 bg-gray-50 rounded-md"
              >
                <div className="flex gap-3">
                  {iconos[e.tipo]}
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-gray-800">{e.asunto}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">{e.tipo}</span>
                    </div>
                    <p className="text-sm text-gray-600">{e.mensaje}</p>
                    <p className="text-xs text-gray-400 mt-1">{e.fecha}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => {
                      setEnvioAEditar(e);
                      setNuevoAsunto(e.asunto);
                      setNuevoMensaje(e.mensaje);
                    }}
                    className="text-blue-600 text-xs flex items-center gap-1 hover:underline"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => setEnvioAEliminar(e)}
                    className="text-red-500 text-xs flex items-center gap-1 hover:underline"
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

      {/* Modal Eliminar */}
      {envioAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-md space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">¿Eliminar notificación?</h3>
              <button onClick={() => setEnvioAEliminar(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              ¿Estás seguro de eliminar "<strong>{envioAEliminar.asunto}</strong>"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEnvioAEliminar(null)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {envioAEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-md space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Editar Notificación</h3>
              <button onClick={() => setEnvioAEditar(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div>
              <label className="text-sm font-medium">Asunto</label>
              <input
                value={nuevoAsunto}
                onChange={(e) => setNuevoAsunto(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Mensaje</label>
              <textarea
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                rows={4}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEnvioAEditar(null)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEdicion}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
