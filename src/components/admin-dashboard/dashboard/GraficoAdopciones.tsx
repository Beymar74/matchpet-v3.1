// src/components/admin-dashboard/dashboard/GraficoAdopciones.tsx
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';

const GraficoAdopciones = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');
  
  const datos = {
    mes: {
      etiquetas: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      adopciones: [85, 92, 78, 105, 118, 127],
      solicitudes: [120, 135, 110, 145, 165, 180]
    },
    semana: {
      etiquetas: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      adopciones: [18, 22, 15, 25, 28, 35, 20],
      solicitudes: [25, 30, 22, 35, 40, 45, 28]
    },
    año: {
      etiquetas: ['2020', '2021', '2022', '2023', '2024'],
      adopciones: [890, 1150, 1320, 1485, 1620],
      solicitudes: [1200, 1580, 1850, 2100, 2340]
    }
  };

  const datosActuales = datos[periodoSeleccionado as keyof typeof datos];
  const maxValor = Math.max(...datosActuales.adopciones, ...datosActuales.solicitudes);

  const calcularTendencia = () => {
    const adopciones = datosActuales.adopciones;
    const ultimo = adopciones[adopciones.length - 1];
    const penultimo = adopciones[adopciones.length - 2];
    const cambio = ((ultimo - penultimo) / penultimo) * 100;
    return {
      valor: Math.abs(cambio).toFixed(1),
      direccion: cambio > 0 ? 'up' : 'down'
    };
  };

  const tendencia = calcularTendencia();

  const periodos = [
    { valor: 'semana', label: 'Esta semana' },
    { valor: 'mes', label: 'Últimos 6 meses' },
    { valor: 'año', label: 'Últimos 5 años' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Estadísticas de Adopciones
          </h3>
          <div className="flex items-center space-x-4 mt-2">
            <div className={`flex items-center space-x-1 text-sm ${
              tendencia.direccion === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`h-4 w-4 ${
                tendencia.direccion === 'down' ? 'rotate-180' : ''
              }`} />
              <span className="font-medium">{tendencia.valor}%</span>
              <span className="text-gray-500">vs período anterior</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periodos.map(periodo => (
              <option key={periodo.valor} value={periodo.valor}>
                {periodo.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Adopciones Completadas</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">Solicitudes Recibidas</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {datosActuales.etiquetas.map((etiqueta, index) => {
            const alturaAdopciones = (datosActuales.adopciones[index] / maxValor) * 100;
            const alturaSolicitudes = (datosActuales.solicitudes[index] / maxValor) * 100;
            
            return (
              <div key={etiqueta} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex space-x-1">
                  {/* Barra de Solicitudes */}
                  <div className="flex-1 bg-gray-100 rounded-t">
                    <div
                      className="bg-blue-200 rounded-t transition-all duration-700 hover:bg-blue-300 relative group"
                      style={{ 
                        height: `${alturaSolicitudes * 2.4}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Solicitudes: {datosActuales.solicitudes[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de Adopciones */}
                  <div className="flex-1 bg-gray-100 rounded-t">
                    <div
                      className="bg-blue-500 rounded-t transition-all duration-700 hover:bg-blue-600 relative group"
                      style={{ 
                        height: `${alturaAdopciones * 2.4}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Adopciones: {datosActuales.adopciones[index]}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Etiqueta */}
                <span className="text-xs text-gray-500 mt-2 font-medium">
                  {etiqueta}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas Resumen */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {datosActuales.adopciones.reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-sm text-gray-600">Total Adopciones</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">
            {datosActuales.solicitudes.reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-sm text-gray-600">Total Solicitudes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {Math.round((datosActuales.adopciones.reduce((a, b) => a + b, 0) / datosActuales.solicitudes.reduce((a, b) => a + b, 0)) * 100)}%
          </p>
          <p className="text-sm text-gray-600">Tasa de Éxito</p>
        </div>
      </div>
    </div>
  );
};

export default GraficoAdopciones;