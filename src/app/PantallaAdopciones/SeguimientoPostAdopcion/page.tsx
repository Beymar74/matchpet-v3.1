'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const seguimientosIniciales = [
  {
    mascota: 'Luna',
    estado: 'Bueno',
    comentario: 'Mascota en buen estado.',
    imagen: '/Gatos/gatito_PA_14.png',
    fecha: '2025-05-15',
  },
  {
    mascota: 'Max',
    estado: 'Control',
    comentario: 'Necesita refuerzo de vacuna.',
    imagen: '/Gatos/gatito_PA_12.png',
    fecha: '2025-05-22',
  },
  {
    mascota: 'Bella',
    estado: 'Urgente',
    comentario: 'Se detectó decaimiento, revisar.',
    imagen: '/Gatos/gatito_PA_15.png',
    fecha: '2025-05-28',
  },
  {
    mascota: 'Pimpi',
    estado: 'Bueno',
    comentario: 'Sin novedades, comportamiento normal.',
    imagen: '/Gatos/gatito_PA_16.png',
    fecha: '2025-05-20',
  },
  {
    mascota: 'Silpi',
    estado: 'Control',
    comentario: 'Monitorear consumo de alimentos.',
    imagen: '/Perros/perrito_PA_13.png',
    fecha: '2025-05-21',
  },
  {
    mascota: 'Gael',
    estado: 'Urgente',
    comentario: 'Problemas respiratorios detectados.',
    imagen: '/Perros/perrito_PA_15.png',
    fecha: '2025-05-22',
  },
  {
    mascota: 'Hassan',
    estado: 'Bueno',
    comentario: 'Salud estable y actividad normal.',
    imagen: '/Perros/perrito_PA_14.png',
    fecha: '2025-05-19',
  },
  {
    mascota: 'Blanquito',
    estado: 'Control',
    comentario: 'Leve pérdida de peso.',
    imagen: '/Perros/perrito_PA_15.png',
    fecha: '2025-05-23',
  },
  {
    mascota: 'Bella',
    estado: 'Bueno',
    comentario: 'Responde bien al tratamiento.',
    imagen: '/Perros/perrito_PA_16.png',
    fecha: '2025-05-18',
  },
  {
    mascota: 'Pepa',
    estado: 'Urgente',
    comentario: 'Infección en proceso, necesita atención.',
    imagen: '/Perros/perrito_PA_13.png',
    fecha: '2025-05-24',
  },
];

export default function SeguimientoPostAdopcion() {
  const [seguimientos, setSeguimientos] = useState(seguimientosIniciales);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nuevoSeguimiento, setNuevoSeguimiento] = useState({
    fecha: '',
    mascota: '',
    comentario: '',
    estado: 'Bueno',
    imagen: '',
  });

  // Estado para validar campos
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const printRef = useRef<HTMLDivElement>(null);

  const seguimientosFiltrados = seguimientos.filter((s) =>
    s.mascota.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroFecha === '' || s.fecha === filtroFecha)
  );

  const contarPorEstado = (estado: string) =>
    seguimientos.filter((s) => s.estado === estado).length;

  // Validación básica inline
  const validar = () => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!nuevoSeguimiento.fecha) nuevosErrores.fecha = 'La fecha es obligatoria.';
    if (!nuevoSeguimiento.mascota.trim()) nuevosErrores.mascota = 'El nombre de la mascota es obligatorio.';
    if (!nuevoSeguimiento.comentario.trim()) nuevosErrores.comentario = 'El comentario es obligatorio.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleAddSeguimiento = () => {
    if (!validar()) return;

    setSeguimientos([...seguimientos, nuevoSeguimiento]);
    setNuevoSeguimiento({
      fecha: '',
      mascota: '',
      comentario: '',
      estado: 'Bueno',
      imagen: '',
    });
    setErrores({});
    setShowModal(false);
  };

  // Manejo subida imagen local y preview
  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoSeguimiento({ ...nuevoSeguimiento, imagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportPDF = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('seguimiento_post_adopcion.pdf');
  };

  // Función para eliminar seguimiento
  const handleEliminar = (index: number) => {
    if (confirm('¿Estás seguro de eliminar este seguimiento?')) {
      const nuevos = [...seguimientos];
      nuevos.splice(index, 1);
      setSeguimientos(nuevos);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-80 mb-8">
        <img
          src="/Perros y Gatos/bannerprincipaladopciones.jpg"
          alt="Banner Seguimiento"
          className="object-cover w-full h-full rounded-lg brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow mb-2">
            Seguimiento Post-Adopción
          </h1>
          <p className="text-sm md:text-lg max-w-2xl drop-shadow">
            Consulta las observaciones realizadas durante el seguimiento del bienestar de las mascotas adoptadas.
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-white">{seguimientos.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Bueno</p>
          <p className="text-2xl font-bold text-green-500">{contarPorEstado('Bueno')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Control</p>
          <p className="text-2xl font-bold text-yellow-500">{contarPorEstado('Control')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Urgente</p>
          <p className="text-2xl font-bold text-red-500">{contarPorEstado('Urgente')}</p>
        </div>
      </div>

      {/* Botón para abrir modal */}
      <div className="max-w-4xl mx-auto mb-6 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Añadir Seguimiento
        </button>
      </div>

      {/* Exportar PDF */}
      <div className="max-w-4xl mx-auto mb-4 text-right">
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          📄 Exportar PDF
        </button>
      </div>

      {/* Filtros */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre de mascota..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Lista de seguimientos */}
      <div className="max-w-4xl mx-auto" ref={printRef}>
        <ul className="space-y-6">
          {seguimientosFiltrados.map((s, index) => (
            <li
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex gap-4 items-center"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                {s.imagen ? (
                  <Image
                    src={s.imagen}
                    alt={`Foto de ${s.mascota}`}
                    fill
                    className="rounded-full object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-20 h-20 flex items-center justify-center text-gray-600">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Mascota:</strong> {s.mascota}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Fecha:</strong> {s.fecha}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  <strong>Comentario:</strong> {s.comentario}
                </p>
                <p className="mt-1 text-sm">
                  <strong>Estado:</strong>{' '}
                  <span
                    className={
                      s.estado === 'Bueno'
                        ? 'text-green-500'
                        : s.estado === 'Control'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }
                  >
                    {s.estado}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleEliminar(seguimientos.indexOf(s))}
                className="ml-4 text-red-600 hover:text-red-800 font-bold"
                title="Eliminar seguimiento"
                aria-label={`Eliminar seguimiento de ${s.mascota}`}
              >
                &times;
              </button>
            </li>
          ))}
          {seguimientosFiltrados.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400">No hay seguimientos para mostrar.</p>
          )}
        </ul>
      </div>

      {/* Modal añadir seguimiento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Nuevo Seguimiento</h2>
            <label className="block mb-1 font-semibold" htmlFor="fecha">Fecha *</label>
            <input
              id="fecha"
              type="date"
              value={nuevoSeguimiento.fecha}
              onChange={(e) =>
                setNuevoSeguimiento({ ...nuevoSeguimiento, fecha: e.target.value })
              }
              className="w-full mb-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errores.fecha && <p className="text-red-600 text-sm mb-2">{errores.fecha}</p>}

            <label className="block mb-1 font-semibold" htmlFor="mascota">Nombre de la mascota *</label>
            <input
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              value={nuevoSeguimiento.mascota}
              onChange={(e) =>
                setNuevoSeguimiento({ ...nuevoSeguimiento, mascota: e.target.value })
              }
              className="w-full mb-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errores.mascota && <p className="text-red-600 text-sm mb-2">{errores.mascota}</p>}

            <label className="block mb-1 font-semibold" htmlFor="comentario">Comentario *</label>
            <textarea
              id="comentario"
              placeholder="Comentario"
              value={nuevoSeguimiento.comentario}
              onChange={(e) =>
                setNuevoSeguimiento({ ...nuevoSeguimiento, comentario: e.target.value })
              }
              className="w-full mb-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errores.comentario && <p className="text-red-600 text-sm mb-2">{errores.comentario}</p>}

            <label className="block mb-1 font-semibold" htmlFor="estado">Estado *</label>
            <select
              id="estado"
              value={nuevoSeguimiento.estado}
              onChange={(e) =>
                setNuevoSeguimiento({ ...nuevoSeguimiento, estado: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="Bueno">Bueno</option>
              <option value="Control">Control</option>
              <option value="Urgente">Urgente</option>
            </select>

            <label className="block mb-1 font-semibold" htmlFor="imagen">Imagen (opcional)</label>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="w-full mb-4"
            />
            {nuevoSeguimiento.imagen && (
              <img
                src={nuevoSeguimiento.imagen}
                alt="Preview"
                className="mb-4 w-24 h-24 object-cover rounded-full mx-auto"
              />
            )}

            <div className="text-right space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrores({});
                }}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSeguimiento}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
