'use client';

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import FiltrosBusqueda from './FiltrosBusqueda';
import TarjetaMascota from '../../../../components/GestionMascotas/TarjetaMascota';
import ModalMascota from '../../../../components/GestionMascotas/modales/ModalMascota';
import RegistrarMascota from '../../../../components/GestionMascotas/modales/RegistrarMascota';
import { mascotasSimuladas } from '@/data/mascotasSimuladas';

const GestionMascotas: React.FC = () => {
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState<number | null>(null);
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);

  // 🔍 Estados para los filtros
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Mascota seleccionada para ver detalle en el modal
  const mascotaSeleccionada = mascotasSimuladas.find(m => m.id === mascotaSeleccionadaId);

  // 🧠 Aplicar filtros a las mascotas
  const mascotasFiltradas = mascotasSimuladas.filter((mascota) => {
    const coincideTexto =
      mascota.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      mascota.raza.toLowerCase().includes(filtroTexto.toLowerCase());

    const coincideEspecie = filtroEspecie === '' || mascota.especie === filtroEspecie;
    const coincideEstado = filtroEstado === '' || mascota.estado === filtroEstado;

    return coincideTexto && coincideEspecie && coincideEstado;
  });

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-[#011526]">Gestión de Mascotas</h2>
        <button
          className="bg-[#BF3952] text-white px-4 py-2 rounded-lg hover:bg-[#254559] flex items-center space-x-2"
          onClick={() => setModalRegistroAbierto(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Agregar Mascota</span>
        </button>
      </div>

      {/* Componentes de filtros */}
      <FiltrosBusqueda
        filtroTexto={filtroTexto}
        filtroEspecie={filtroEspecie}
        filtroEstado={filtroEstado}
        onFiltroTextoChange={setFiltroTexto}
        onFiltroEspecieChange={setFiltroEspecie}
        onFiltroEstadoChange={setFiltroEstado}
      />

      {/* Tarjetas de mascotas filtradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotasFiltradas.map((mascota) => (
          <TarjetaMascota
            key={mascota.id}
            id={mascota.id}
            onClick={() => setMascotaSeleccionadaId(mascota.id)}
          />
        ))}
      </div>

      {/* Modal de detalles */}
      {mascotaSeleccionada && (
        <ModalMascota
          mascota={mascotaSeleccionada}
          onClose={() => setMascotaSeleccionadaId(null)}
        />
      )}

      {/* Modal de registrar nueva mascota */}
      {modalRegistroAbierto && (
        <RegistrarMascota onClose={() => setModalRegistroAbierto(false)} />
      )}
    </div>
  );
};

export default GestionMascotas;
