'use client';
import React, { useState, useEffect } from 'react';
import EstadisticasCards from './EstadisticasCards';
import EstadoSistema from './EstadoSistema';
import GraficoAdopciones from './GraficoAdopciones';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [estadisticas, setEstadisticas] = useState({
    usuarios: 0,
    mascotas: 0,
    adopciones: 0,
    refugios: 0,
    pendientes: 0,
    compatibilidad: 0
  });

  const fetchEstadisticas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/estadisticas');
      const data = await res.json();
      setEstadisticas(data);
    } catch (error) {
      console.error('❌ Error al cargar estadísticas:', error);
    } finally {
      setLastUpdate(new Date());
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await fetchEstadisticas();
  };

  useEffect(() => {
    fetchEstadisticas();

    const interval = setInterval(() => {
      fetchEstadisticas();
    }, 300000); // cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">
            Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Actualizando...' : 'Actualizar'}</span>
        </button>
      </div>

      {/* Estadísticas Cards */}
      <EstadisticasCards loading={loading} />


      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GraficoAdopciones />
          <EstadoSistema />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
