"use client"

import React, { useState } from 'react';
import { 
  Heart, Plus, Search, Filter, Download, Eye, Edit,
  CheckCircle, XCircle, Clock, MapPin, Shield,
  PawPrint, Camera, Star
} from 'lucide-react';
import { mascotasSimuladas } from '@/data/mascotasSimuladas';
import { useRouter } from "next/navigation";
import RegistrarMascota from "@/components/GestionMascotas/modales/RegistrarMascota";

const GestionMascotas = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false); // ✅ agregado
  const router = useRouter();

  const estadisticasMascotas = [
    { titulo: 'Total Mascotas', valor: 856, cambio: '+23 esta semana', color: 'red', icon: Heart },
    { titulo: 'Disponibles', valor: 634, cambio: 'Para adopción', color: 'green', icon: CheckCircle },
    { titulo: 'En Proceso', valor: 142, cambio: 'Adoptándose', color: 'blue', icon: Clock },
    { titulo: 'Pendientes Revisión', valor: 12, cambio: 'Requieren aprobación', color: 'yellow', icon: XCircle }
  ];

  const filtros = [
    { id: 'todos', label: 'Todas', count: 856 },
    { id: 'disponibles', label: 'Disponibles', count: 634 },
    { id: 'proceso', label: 'En Proceso', count: 142 },
    { id: 'adoptadas', label: 'Adoptadas', count: 68 },
    { id: 'pendientes', label: 'Pendientes', count: 12 }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-blue-100 text-blue-800';
      case 'Adoptado': return 'bg-purple-100 text-purple-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Disponible': return <CheckCircle className="h-3 w-3" />;
      case 'En Proceso': return <Clock className="h-3 w-3" />;
      case 'Adoptado': return <Heart className="h-3 w-3" />;
      case 'Pendiente': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Mascotas</h1>
              <p className="text-gray-600 mt-1">Supervisar registro, aprobación y estado de mascotas</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, moderator</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setMostrarModal(true)}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Mascota</span>
            </button>
          </div>
        </div>
      </div>

      

      {/* Modal de Registrar Mascota */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✖
            </button>
            <RegistrarMascota onClose={() => setMostrarModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionMascotas;

