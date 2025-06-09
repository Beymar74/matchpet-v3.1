// src/app/GestionNotificaciones/nueva-mascota/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Eye, PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AvisoMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fecha: string;
  refugio: string;
  estado: 'Publicado' | 'Retirado';
}

const NuevaMascota = () => {
  const router = useRouter();
  const [avisos, setAvisos] = useState<AvisoMascota[]>([]);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [nuevoAviso, setNuevoAviso] = useState({ nombre: '', especie: '', raza: '', fecha: '', refugio: '', estado: 'Publicado' as const });
  const [fechaFiltro, setFechaFiltro] = useState('');

  useEffect(() => {
    const datos: AvisoMascota[] = [
      {
        id: 1,
        nombre: 'Luna',
        especie: 'Perro',
        raza: 'Labrador',
        fecha: '2025-06-08',
        refugio: 'Refugio Esperanza',
        estado: 'Publicado'
      },
      {
        id: 2,
        nombre: 'Mishi',
        especie: 'Gato',
        raza: 'Angora',
        fecha: '2025-06-06',
        refugio: 'Patitas Callejeras',
        estado: 'Retirado'
      },
      {
        id: 3,
        nombre: 'Rocky',
        especie: 'Perro',
        raza: 'Pitbull',
        fecha: '2025-06-07',
        refugio: 'Amigos Peludos',
        estado: 'Publicado'
      }
    ];
    setAvisos(datos);
  }, []);

  const crearNuevoAviso = () => {
    if (!nuevoAviso.nombre || !nuevoAviso.fecha || new Date(nuevoAviso.fecha) < new Date()) {
      alert('❗ Completa todos los campos y asegúrate de que la fecha sea válida.');
      return;
    }
    const nuevo: AvisoMascota = {
      id: Date.now(),
      ...nuevoAviso
    };
    setAvisos([...avisos, nuevo]);
    setModalCrearAbierto(false);
    setNuevoAviso({ nombre: '', especie: '', raza: '', fecha: '', refugio: '', estado: 'Publicado' });
  };

  const avisosFiltrados = fechaFiltro
    ? avisos.filter((a) => a.fecha === fechaFiltro)
    : avisos;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Avisos de Nueva Mascota</h1>
        <p className="text-gray-600 max-w-2xl mt-1">
          Gestiona los avisos enviados por los refugios para promocionar nuevas mascotas rescatadas.
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

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setModalCrearAbierto(true)}
          >
            <PlusCircle className="w-5 h-5" /> Crear Aviso
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Especie</th>
              <th className="px-4 py-2 text-left">Raza</th>
              <th className="px-4 py-2 text-left">Refugio</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {avisosFiltrados.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{a.nombre}</td>
                <td className="px-4 py-2">{a.especie}</td>
                <td className="px-4 py-2">{a.raza}</td>
                <td className="px-4 py-2">{a.refugio}</td>
                <td className="px-4 py-2">{a.fecha}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${a.estado === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => router.push('/PantallaGestionMascotas')}
                    title="Ver detalles"
                  >
                    <Eye className="inline w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setAvisos(avisos.filter(av => av.id !== a.id))}
                    title="Eliminar aviso"
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
            <h2 className="text-lg font-semibold mb-4">Crear Nuevo Aviso</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre de la mascota"
                className="w-full border px-3 py-2 rounded"
                value={nuevoAviso.nombre}
                onChange={(e) => setNuevoAviso({ ...nuevoAviso, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Especie"
                className="w-full border px-3 py-2 rounded"
                value={nuevoAviso.especie}
                onChange={(e) => setNuevoAviso({ ...nuevoAviso, especie: e.target.value })}
              />
              <input
                type="text"
                placeholder="Raza"
                className="w-full border px-3 py-2 rounded"
                value={nuevoAviso.raza}
                onChange={(e) => setNuevoAviso({ ...nuevoAviso, raza: e.target.value })}
              />
              <input
                type="text"
                placeholder="Refugio"
                className="w-full border px-3 py-2 rounded"
                value={nuevoAviso.refugio}
                onChange={(e) => setNuevoAviso({ ...nuevoAviso, refugio: e.target.value })}
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={nuevoAviso.fecha}
                onChange={(e) => setNuevoAviso({ ...nuevoAviso, fecha: e.target.value })}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setModalCrearAbierto(false)} className="px-4 py-2 text-sm bg-gray-200 rounded">Cancelar</button>
              <button onClick={crearNuevoAviso} className="px-4 py-2 text-sm bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NuevaMascota;
