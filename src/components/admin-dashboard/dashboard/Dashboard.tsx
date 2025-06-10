// src/components/admin-dashboard/dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import EstadisticasCards from './EstadisticasCards';
import AccionesRapidas from './AccionesRapidas';
import EstadoSistema from './EstadoSistema';
import GraficoAdopciones from './GraficoAdopciones';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleRefresh = async () => {
    setLoading(true);
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    // Auto-refresh cada 5 minutos
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000);

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
        {/* Columna Izquierda - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gráfico de Adopciones */}
          <GraficoAdopciones />
          
          {/* Estado del Sistema */}
          <EstadoSistema />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;