'use client';

import Link from 'next/link';
import { BarChart3, Clock, Globe, Heart, ArrowDown, Eye, ShieldCheck } from 'lucide-react';

export default function ReportesPage() {
  const secciones = [
    {
      nombre: 'Comparativa de Adopciones',
      ruta: '/ComparativaAdopciones',
      descripcion: 'Compara adopciones por mes, región y tipo de mascota.',
      icono: <BarChart3 className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Evolución Histórica',
      ruta: '/EvolucionHistorica',
      descripcion: 'Visualiza la tendencia de adopciones a lo largo del tiempo.',
      icono: <Clock className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Actividad por Región',
      ruta: '/ActividadRegion',
      descripcion: 'Consulta la actividad y adopciones por zonas geográficas.',
      icono: <Globe className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Favoritos Frecuentes',
      ruta: '/FavoritosFrecuentes',
      descripcion: 'Descubre las mascotas más seleccionadas por los usuarios.',
      icono: <Heart className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Exportación de Reportes',
      ruta: '/ExportacionReportes',
      descripcion: 'Descarga los datos analíticos en formato PDF o Excel.',
      icono: <ArrowDown className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Vista Previa de Reporte',
      ruta: '/VistapreviaReporte',
      descripcion: 'Previsualiza reportes antes de exportarlos.',
      icono: <Eye className="w-6 h-6 text-pink-600" />,
    },
    {
      nombre: 'Logs y Auditorías',
      ruta: '/LogsAuditorias',
      descripcion: 'Revisa el historial de cambios y accesos al sistema.',
      icono: <ShieldCheck className="w-6 h-6 text-pink-600" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-pink-600">Reportes y Estadísticas</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Visualiza, analiza y exporta información clave del sistema para tomar mejores decisiones sobre la gestión de adopciones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {secciones.map((sec, index) => (
          <Link
            key={index}
            href={sec.ruta}
            className="group block bg-white hover:bg-pink-50 transition-all duration-200 rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-200 hover:border-pink-400"
          >
            <div className="flex items-center gap-3 mb-3">
              {sec.icono}
              <h2 className="text-lg font-semibold text-pink-700 group-hover:underline">
                {sec.nombre}
              </h2>
            </div>
            <p className="text-gray-500 text-sm">{sec.descripcion}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
