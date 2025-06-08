'use client';
import React, { useState } from 'react';
import { Plus, Clock, Trash2, Edit, X } from 'lucide-react';

interface Programacion {
  id: number;
  titulo: string;
  canal: 'Email' | 'SMS' | 'Push';
  fecha: string;
  hora: string;
  estado: 'Programada' | 'Enviada';
}

const inicial: Programacion[] = [
  {
    id: 1,
    titulo: 'Recordatorio de Adopción',
    canal: 'Email',
    fecha: '2025-06-10',
    hora: '09:00',
    estado: 'Programada',
  },
  {
    id: 2,
    titulo: 'Vacunación Anual',
    canal: 'Push',
    fecha: '2025-06-12',
    hora: '14:30',
    estado: 'Programada',
  },
];

export default function ProgramacionNotificaciones() {
  const [programaciones, setProgramaciones] = useState<Programacion[]>(inicial);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null);
  const [errorFecha, setErrorFecha] = useState('');

  const [nueva, setNueva] = useState<Programacion>({
    id: 0,
    titulo: '',
    canal: 'Email',
    fecha: '',
    hora: '',
    estado: 'Programada',
  });

  const abrirModal = () => {
    setNueva({ id: Date.now(), titulo: '', canal: 'Email', fecha: '', hora: '', estado: 'Programada' });
    setErrorFecha('');
    setModalAbierto(true);
  };

  const editarProgramacion = (p: Programacion) => {
    setNueva(p);
    setErrorFecha('');
    setModalAbierto(true);
  };

  const eliminarProgramacion = (id: number) => {
    setConfirmarEliminar(id);
  };

  const confirmarEliminacion = () => {
    if (confirmarEliminar !== null) {
      setProgramaciones(programaciones.filter(p => p.id !== confirmarEliminar));
      setConfirmarEliminar(null);
    }
  };

  const guardar = () => {
    if (nueva.fecha && nueva.hora) {
      const fechaHora = new Date(`${nueva.fecha}T${nueva.hora}`);
      const ahora = new Date();
      if (fechaHora <= ahora) {
        setErrorFecha('La fecha y hora deben ser posteriores al momento actual.');
        return;
      }

      setProgramaciones(prev => {
        const existente = prev.find(p => p.id === nueva.id);
        if (existente) {
          return prev.map(p => (p.id === nueva.id ? nueva : p));
        } else {
          return [...prev, nueva];
        }
      });
      setModalAbierto(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#30588C] dark:text-[#7FB9C2]">Programación de Notificaciones</h2>
        <button onClick={abrirModal} className="flex items-center gap-2 bg-[#30588C] hover:bg-[#27446d] text-white px-4 py-2 rounded">
          <Plus size={18} /> Nueva Programación
        </button>
      </div>

      <table className="w-full table-auto border rounded overflow-hidden text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th className="p-2">Título</th>
            <th className="p-2">Canal</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Hora</th>
            <th className="p-2">Estado</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {programaciones.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="p-2">{item.titulo}</td>
              <td className="p-2">{item.canal}</td>
              <td className="p-2">{item.fecha}</td>
              <td className="p-2">{item.hora}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.estado === 'Programada' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                }`}>
                  {item.estado}
                </span>
              </td>
              <td className="p-2 flex gap-2 justify-center">
                <button onClick={() => editarProgramacion(item)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => eliminarProgramacion(item.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de creación/edición */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setModalAbierto(false)}>
              <X />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2]">
              {programaciones.some(p => p.id === nueva.id) ? 'Editar Programación' : 'Nueva Programación'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={nueva.titulo}
                onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
              />
              <select
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={nueva.canal}
                onChange={(e) => setNueva({ ...nueva, canal: e.target.value as Programacion['canal'] })}
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push">Push</option>
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={nueva.fecha}
                onChange={(e) => setNueva({ ...nueva, fecha: e.target.value })}
              />
              <input
                type="time"
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={nueva.hora}
                onChange={(e) => setNueva({ ...nueva, hora: e.target.value })}
              />
              {errorFecha && <p className="text-red-600 text-sm">{errorFecha}</p>}
              <button
                onClick={guardar}
                className="w-full bg-[#30588C] text-white py-2 rounded hover:bg-[#27446d]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {confirmarEliminar !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <p className="text-center text-lg mb-4 text-gray-800 dark:text-gray-200">
              ¿Estás seguro de que deseas eliminar esta programación?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmarEliminar(null)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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
