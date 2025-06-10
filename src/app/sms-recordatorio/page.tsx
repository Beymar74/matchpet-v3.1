// src/app/GestionNotificaciones/sms-recordatorio/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Eye, PlusCircle, Trash2, ArrowLeft, Send, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SmsRecordatorio {
  id: number;
  destinatario: string;
  mensaje: string;
  fecha: string;
  estado: 'Enviado' | 'Programado' | 'Fallido';
  administrador: string;
}

const SmsRecordatorio = () => {
  const router = useRouter();
  const [sms, setSms] = useState<SmsRecordatorio[]>([]);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [smsAEditar, setSmsAEditar] = useState<SmsRecordatorio | null>(null);
  const [nuevoSms, setNuevoSms] = useState({ 
    destinatario: '', 
    mensaje: '', 
    fecha: '', 
    estado: 'Programado' as const, 
    administrador: '' 
  });
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [destinatarioFiltro, setDestinatarioFiltro] = useState('');
  const [smsEliminar, setSmsEliminar] = useState<number | null>(null);
  const [smsReenviar, setSmsReenviar] = useState<number | null>(null);

  useEffect(() => {
    const datos: SmsRecordatorio[] = [
      { 
        id: 1, 
        destinatario: 'Juan Pérez', 
        mensaje: 'Recordatorio de adopción para mañana', 
        fecha: '2025-06-10', 
        estado: 'Programado', 
        administrador: 'Admin Rosa' 
      },
      { 
        id: 2, 
        destinatario: 'Laura Gómez', 
        mensaje: 'Tu cita de adopción es hoy', 
        fecha: '2025-06-08', 
        estado: 'Enviado', 
        administrador: 'Admin Jorge' 
      },
      { 
        id: 3, 
        destinatario: 'Carlos Ruiz', 
        mensaje: 'Reprogramación de visita', 
        fecha: '2025-06-07', 
        estado: 'Fallido', 
        administrador: 'Admin Rosa' 
      }
    ];
    setSms(datos);
  }, []);

  const crearNuevoSms = () => {
    if (!nuevoSms.destinatario || !nuevoSms.mensaje || !nuevoSms.administrador || !nuevoSms.fecha) {
      alert('❗ Completa todos los campos obligatorios.');
      return;
    }
    
    if (new Date(nuevoSms.fecha) < new Date()) {
      alert('❗ La fecha debe ser futura.');
      return;
    }
    
    const nuevo: SmsRecordatorio = { 
      id: Date.now(), 
      ...nuevoSms 
    };
    setSms([...sms, nuevo]);
    setModalCrearAbierto(false);
    setNuevoSms({ 
      destinatario: '', 
      mensaje: '', 
      fecha: '', 
      estado: 'Programado', 
      administrador: '' 
    });
  };

  const editarSmsExistente = () => {
    if (!smsAEditar) return;
    
    if (!smsAEditar.destinatario || !smsAEditar.mensaje || !smsAEditar.administrador || !smsAEditar.fecha) {
      alert('❗ Completa todos los campos obligatorios.');
      return;
    }
    
    setSms(sms.map(s => s.id === smsAEditar.id ? smsAEditar : s));
    setModalEditarAbierto(false);
    setSmsAEditar(null);
  };

  const smsFiltrados = sms.filter((s) => {
    const coincideFecha = fechaFiltro ? s.fecha === fechaFiltro : true;
    const coincideDestinatario = destinatarioFiltro ? 
      s.destinatario.toLowerCase().includes(destinatarioFiltro.toLowerCase()) : true;
    return coincideFecha && coincideDestinatario;
  });

  const reenviarSms = (id: number) => {
    setSms(sms.map(s => 
      s.id === id ? { ...s, estado: 'Programado' as const } : s
    ));
    alert('📩 Mensaje programado para reenvío.');
    setSmsReenviar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">SMS de Recordatorio</h1>
        <p className="text-gray-600 max-w-2xl mt-1">
          Visualiza y gestiona los mensajes SMS programados o enviados a los adoptantes.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button 
          className="flex items-center gap-2 text-gray-600 hover:text-black" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>

        <div className="flex gap-3">
          <input 
            type="date" 
            className="border border-gray-300 rounded px-3 py-1" 
            value={fechaFiltro} 
            onChange={(e) => setFechaFiltro(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Buscar destinatario" 
            className="border border-gray-300 rounded px-3 py-1" 
            value={destinatarioFiltro} 
            onChange={(e) => setDestinatarioFiltro(e.target.value)} 
          />

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setModalCrearAbierto(true)}
          >
            <PlusCircle className="w-5 h-5" /> Crear SMS
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Destinatario</th>
              <th className="px-4 py-2 text-left">Mensaje</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Administrador</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {smsFiltrados.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{s.destinatario}</td>
                <td className="px-4 py-2">{s.mensaje}</td>
                <td className="px-4 py-2">{s.fecha}</td>
                <td className="px-4 py-2">{s.administrador}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    s.estado === 'Enviado' ? 'bg-green-100 text-green-700' :
                    s.estado === 'Programado' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {s.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button 
                    className="text-yellow-600 hover:underline" 
                    title="Editar" 
                    onClick={() => { 
                      setSmsAEditar(s); 
                      setModalEditarAbierto(true); 
                    }}
                  >
                    <Edit className="inline w-5 h-5" />
                  </button>
                  <button 
                    className="text-blue-600 hover:underline" 
                    title="Reenviar" 
                    onClick={() => setSmsReenviar(s.id)}
                  >
                    <Send className="inline w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:underline" 
                    title="Eliminar" 
                    onClick={() => setSmsEliminar(s.id)}
                  >
                    <Trash2 className="inline w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Crear */}
      {modalCrearAbierto && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Nuevo SMS</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Nombre del destinatario" 
                className="w-full border px-3 py-2 rounded" 
                value={nuevoSms.destinatario} 
                onChange={(e) => setNuevoSms({ ...nuevoSms, destinatario: e.target.value })} 
              />
              <textarea 
                placeholder="Mensaje" 
                className="w-full border px-3 py-2 rounded" 
                rows={3}
                value={nuevoSms.mensaje} 
                onChange={(e) => setNuevoSms({ ...nuevoSms, mensaje: e.target.value })} 
              />
              <input 
                type="date" 
                className="w-full border px-3 py-2 rounded" 
                value={nuevoSms.fecha} 
                onChange={(e) => setNuevoSms({ ...nuevoSms, fecha: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Administrador responsable" 
                className="w-full border px-3 py-2 rounded" 
                value={nuevoSms.administrador} 
                onChange={(e) => setNuevoSms({ ...nuevoSms, administrador: e.target.value })} 
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                onClick={() => setModalCrearAbierto(false)} 
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                onClick={crearNuevoSms} 
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {modalEditarAbierto && smsAEditar && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Editar SMS</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Nombre del destinatario"
                className="w-full border px-3 py-2 rounded" 
                value={smsAEditar.destinatario} 
                onChange={(e) => setSmsAEditar({ ...smsAEditar, destinatario: e.target.value })} 
              />
              <textarea 
                placeholder="Mensaje"
                className="w-full border px-3 py-2 rounded" 
                rows={3}
                value={smsAEditar.mensaje} 
                onChange={(e) => setSmsAEditar({ ...smsAEditar, mensaje: e.target.value })} 
              />
              <input 
                type="date" 
                className="w-full border px-3 py-2 rounded" 
                value={smsAEditar.fecha} 
                onChange={(e) => setSmsAEditar({ ...smsAEditar, fecha: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Administrador responsable"
                className="w-full border px-3 py-2 rounded" 
                value={smsAEditar.administrador} 
                onChange={(e) => setSmsAEditar({ ...smsAEditar, administrador: e.target.value })} 
              />
              <select 
                className="w-full border px-3 py-2 rounded" 
                value={smsAEditar.estado} 
                onChange={(e) => setSmsAEditar({ ...smsAEditar, estado: e.target.value as 'Enviado' | 'Programado' | 'Fallido' })}
              >
                <option value="Programado">Programado</option>
                <option value="Enviado">Enviado</option>
                <option value="Fallido">Fallido</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                onClick={() => setModalEditarAbierto(false)} 
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                onClick={editarSmsExistente} 
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación Reenviar */}
      {smsReenviar !== null && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
            <p className="mb-4">¿Estás seguro de reenviar este mensaje?</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setSmsReenviar(null)} 
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                onClick={() => reenviarSms(smsReenviar)} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Reenviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación Eliminar */}
      {smsEliminar !== null && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
            <p className="mb-4">¿Estás seguro de eliminar este mensaje?</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setSmsEliminar(null)} 
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setSms(sms.filter(s => s.id !== smsEliminar));
                  setSmsEliminar(null);
                }} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmsRecordatorio;