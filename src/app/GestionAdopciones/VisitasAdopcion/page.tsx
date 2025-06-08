// src/pages/GestionAdopciones/VisitasAdopcion.tsx
'use client';
import React, { useState } from 'react';
import { CalendarDays, User, PawPrint, PlusCircle, Filter, Trash2, Edit3 } from 'lucide-react';

interface Visita {
  mascota: string;
  especie: string;
  adoptante: string;
  fecha: string;
  hora: string;
  direccion: string;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}

export default function VisitasAdopcion() {
  const [visitas, setVisitas] = useState<Visita[]>([
    { mascota: 'Luna', especie: 'Perro', adoptante: 'María Pérez', fecha: '2025-06-12', hora: '15:00', direccion: 'Av. Principal #123, La Paz', estado: 'Pendiente' },
    { mascota: 'Max', especie: 'Gato', adoptante: 'Juan López', fecha: '2025-06-13', hora: '10:30', direccion: 'Calle 7, Zona Sur', estado: 'Confirmada' },
    { mascota: 'Simba', especie: 'Perro', adoptante: 'Jorge Silva', fecha: '2025-06-14', hora: '09:00', direccion: 'Villa Fátima, Calle C', estado: 'Pendiente' },
    { mascota: 'Nina', especie: 'Conejo', adoptante: 'Laura Gutiérrez', fecha: '2025-06-15', hora: '11:15', direccion: 'Zona Central #55', estado: 'Cancelada' }
  ]);

  const [nueva, setNueva] = useState<Visita>({
    mascota: '', especie: '', adoptante: '', fecha: '', hora: '', direccion: '', estado: 'Pendiente'
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value });
  };

  const agregarVisita = () => {
    if (!nueva.mascota || !nueva.fecha || !nueva.hora) return;
    if (editIndex !== null) {
      const nuevasVisitas = [...visitas];
      nuevasVisitas[editIndex] = nueva;
      setVisitas(nuevasVisitas);
      setEditIndex(null);
    } else {
      setVisitas([...visitas, nueva]);
    }
    setNueva({ mascota: '', especie: '', adoptante: '', fecha: '', hora: '', direccion: '', estado: 'Pendiente' });
  };

  const editarVisita = (index: number) => {
    setNueva(visitas[index]);
    setEditIndex(index);
  };

  const eliminarVisita = (index: number) => {
    const nuevasVisitas = visitas.filter((_, i) => i !== index);
    setVisitas(nuevasVisitas);
  };

  const visitasFiltradas = visitas
    .filter(v => filtroEstado === 'Todos' || v.estado === filtroEstado)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-green-700 dark:text-green-200 mb-8">
        Visitas Programadas para Adopción
      </h2>

      <div className="max-w-5xl mx-auto mb-12 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-green-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-green-600 dark:text-green-300 mb-4 flex items-center gap-2">
          <PlusCircle /> {editIndex !== null ? 'Editar Visita' : 'Añadir Nueva Visita'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input className="p-2 rounded border" placeholder="Mascota" name="mascota" value={nueva.mascota} onChange={handleChange} />
          <input className="p-2 rounded border" placeholder="Especie" name="especie" value={nueva.especie} onChange={handleChange} />
          <input className="p-2 rounded border" placeholder="Adoptante" name="adoptante" value={nueva.adoptante} onChange={handleChange} />
          <input className="p-2 rounded border" type="date" name="fecha" value={nueva.fecha} onChange={handleChange} />
          <input className="p-2 rounded border" type="time" name="hora" value={nueva.hora} onChange={handleChange} />
          <input className="p-2 rounded border" placeholder="Dirección" name="direccion" value={nueva.direccion} onChange={handleChange} />
          <select className="p-2 rounded border col-span-1" name="estado" value={nueva.estado} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <button onClick={agregarVisita} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
          {editIndex !== null ? 'Actualizar Visita' : 'Agregar Visita'}
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">Lista de Visitas</h3>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-green-700" />
          <select
            className="p-2 rounded border text-sm"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visitasFiltradas.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-green-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">{v.mascota}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide ${
                v.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                v.estado === 'Confirmada' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {v.estado}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2"><PawPrint size={16} /> Especie: {v.especie}</p>
              <p className="flex items-center gap-2"><User size={16} /> Adoptante: {v.adoptante}</p>
              <p className="flex items-center gap-2"><CalendarDays size={16} /> Fecha: {v.fecha} a las {v.hora}</p>
              <p className="text-xs italic pl-6 text-gray-500 dark:text-gray-400">{v.direccion}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => editarVisita(i)} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm flex items-center gap-1">
                <Edit3 size={14} /> Editar
              </button>
              <button onClick={() => eliminarVisita(i)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm flex items-center gap-1">
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
