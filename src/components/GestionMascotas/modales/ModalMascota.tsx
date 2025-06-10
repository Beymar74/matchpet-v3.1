'use client';

import { useEffect, useState } from 'react';
import EditarMascota from './EditarMascota';
import CrearFichamedica from './CreaarFichamedica';
import FichaMedica from './FichaMedica';

interface Mascota {
  ID_Mascota: number;
  Nombre: string;
  Edad: number;
  Raza: string;
  Especie?: string;
  Foto?: string;
  FechaIngreso?: string;
  Compatibilidad?: number;
  Solicitudes?: number;
  Adoptabilidad?: number;
  Nombre_Estado?: string;
}

interface ModalMascotaProps {
  mascota: Mascota;
  onClose: () => void;
}

export default function ModalMascota({ mascota, onClose }: ModalMascotaProps) {
  const [pantalla, setPantalla] = useState<'modal' | 'editar' | 'ficha' | 'crearFicha'>('modal');
  const [mascotaActualizada, setMascotaActualizada] = useState<Mascota>(mascota);
  const [fichaExiste, setFichaExiste] = useState(false);

  useEffect(() => {
    const fichas = JSON.parse(localStorage.getItem('fichasMedicas') || '[]');
    const encontrada = fichas.find((f: any) => f.idMascota === mascotaActualizada.ID_Mascota.toString());
    setFichaExiste(!!encontrada);
  }, [mascotaActualizada.ID_Mascota]);

  const getEstadoColor = (estado: string | undefined) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
console.log('✅ ID pasado:', mascotaActualizada?.ID_Mascota)

  // Pantallas condicionales
  if (pantalla === 'editar') {
    return (
      
      <EditarMascota
        id={mascotaActualizada.ID_Mascota}
        modoModal
        onClose={() => setPantalla('modal')}
        onGuardar={(mascotaEditada) => {
          setMascotaActualizada(mascotaEditada);
          setPantalla('modal');
        }}
      />
    );
  }

  if (pantalla === 'ficha') {
    return (
      <FichaMedica
        mascotaId={mascotaActualizada.ID_Mascota}
        onClose={() => setPantalla('modal')}
      />
    );
  }

  if (pantalla === 'crearFicha') {
    return (
      <CrearFichamedica
        mascotaId={mascotaActualizada.ID_Mascota}
        onClose={() => setPantalla('modal')}
        onFichaGuardada={() => {
          setFichaExiste(true);
          setPantalla('ficha');
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>

        {/* Imagen */}
        <div className="relative mb-4 w-full h-70 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {mascotaActualizada.Foto?.startsWith('http') ? (
            <img
              src={mascotaActualizada.Foto}
              alt={mascotaActualizada.Nombre}
              className="object-contain max-h-full max-w-full"
            />
          ) : (
            <div className="text-6xl">{mascotaActualizada.Nombre?.[0]}</div>
          )}
          <span
            className={`absolute top-2 left-2 text-sm px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascotaActualizada.Nombre_Estado)}`}
          >
            {mascotaActualizada.Nombre_Estado ?? 'Sin estado'}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{mascotaActualizada.Nombre}</h2>

        <div className="text-lg text-gray-700 space-y-1 mb-3">
          <p><strong>Especie:</strong> {mascotaActualizada.Especie ?? '-'}</p>
          <p><strong>Raza:</strong> {mascotaActualizada.Raza}</p>
          <p><strong>Edad:</strong> {mascotaActualizada.Edad}</p>
          <p><strong>Ingreso:</strong> {mascotaActualizada.FechaIngreso ?? 'No registrado'}</p>
        </div>

        {/* Extras */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium mb-4">
          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Compatibilidad</p>
            <p className="text-[#30588C] font-bold text-lg">{mascotaActualizada.Compatibilidad ?? 0}%</p>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Solicitudes</p>
            <p className="text-[#BF3952] font-bold text-lg">{mascotaActualizada.Solicitudes ?? 0}</p>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Adoptabilidad</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div
                className="h-4 rounded-full text-white text-xs text-center"
                style={{
                  width: `${mascotaActualizada.Adoptabilidad ?? 0}%`,
                  backgroundColor:
                    (mascotaActualizada.Adoptabilidad ?? 0) > 70
                      ? '#4CAF50'
                      : (mascotaActualizada.Adoptabilidad ?? 0) > 40
                      ? '#FFB800'
                      : '#F44336'
                }}
              >
                {mascotaActualizada.Adoptabilidad ?? 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-between">
          <button
            onClick={() => setPantalla('editar')}
            className="flex items-center justify-center gap-2 bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#254559] w-full sm:w-1/3"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => setPantalla(fichaExiste ? 'ficha' : 'crearFicha')}
            className="flex items-center justify-center gap-2 bg-[#6093BF] text-white px-4 py-2 rounded hover:bg-[#30588C] w-full sm:w-1/3"
          >
            🩺 Ficha Médica
          </button>
          <button
            onClick={() => alert('🗑️ Esta funcionalidad se implementará más adelante')}
            className="flex items-center justify-center gap-2 bg-[#BF3952] text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-1/3"
          >
            🗑️ Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

