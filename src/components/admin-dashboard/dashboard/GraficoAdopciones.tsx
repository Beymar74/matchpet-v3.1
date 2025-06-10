import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';

const GraficoAdopciones = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<'semana' | 'mes' | 'año'>('mes');
  const [datos, setDatos] = useState({
    etiquetas: [] as string[],
    adopciones: [] as number[],
    solicitudes: [] as number[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/grafico-adopciones?periodo=${periodoSeleccionado}`);
        if (!res.ok) throw new Error('Error al obtener datos');
        const json = await res.json();
        setDatos(json);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [periodoSeleccionado]);

  const maxValor = Math.max(...datos.adopciones, ...datos.solicitudes, 1);

  const calcularTendencia = () => {
    const adopciones = datos.adopciones;
    if (adopciones.length < 2) return { valor: '0', direccion: 'up' };
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
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Estadísticas de Adopciones
          </h3>
          <div className={`flex items-center space-x-1 text-sm mt-2 ${
            tendencia.direccion === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 ${tendencia.direccion === 'down' ? 'rotate-180' : ''}`} />
            <span className="font-medium">{tendencia.valor}%</span>
            <span className="text-gray-500">vs período anterior</span>
          </div>
        </div>

        {/* Filtro */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value as 'semana' | 'mes' | 'año')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periodos.map(p => (
              <option key={p.valor} value={p.valor}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative h-64">
        {loading ? (
          <p className="text-center text-gray-400 mt-20">Cargando gráfico...</p>
        ) : (
          <div className="flex items-end justify-between h-full space-x-2">
            {datos.etiquetas.map((etiqueta, i) => {
              const alturaAdop = (datos.adopciones[i] / maxValor) * 100;
              const alturaSol = (datos.solicitudes[i] / maxValor) * 100;
              return (
                <div key={etiqueta} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full flex space-x-1">
                    <div className="flex-1 bg-gray-100 rounded-t">
                      <div
                        className="bg-blue-200 rounded-t transition-all duration-700 hover:bg-blue-300 relative group"
                        style={{ height: `${alturaSol * 2.4}px`, minHeight: '4px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                          Solicitudes: {datos.solicitudes[i]}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-t">
                      <div
                        className="bg-blue-500 rounded-t transition-all duration-700 hover:bg-blue-600 relative group"
                        style={{ height: `${alturaAdop * 2.4}px`, minHeight: '4px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                          Adopciones: {datos.adopciones[i]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{etiqueta}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resumen */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {datos.adopciones.reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Adopciones</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {datos.solicitudes.reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Solicitudes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {Math.round((datos.adopciones.reduce((a, b) => a + b, 0) / (datos.solicitudes.reduce((a, b) => a + b, 1))) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Tasa de Éxito</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraficoAdopciones;
