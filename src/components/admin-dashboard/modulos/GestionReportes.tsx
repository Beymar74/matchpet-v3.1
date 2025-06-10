// src/components/admin-dashboard/modulos/GestionReportes.tsx
import React, { useState } from 'react';
import { 
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Settings,
  Shield,
  Calendar,
  FileText,
  TrendingUp,
  PieChart,
  Clock,
  Share2,
  Mail,
  Printer,
  Home,
  LineChart,
  MapPin,
  Heart
} from 'lucide-react';
import Link from 'next/link';
const GestionReportes = () => {
  const botonesModulo7 = [
    {
      nombre: 'Inicio',
      ruta: '/admin',
      color: 'blue',
      icon: Home
    },
    {
      nombre: 'Comparativa',
      ruta: '/ComparativaAdopciones',
      color: 'indigo',
      icon: BarChart3
    },
    {
      nombre: 'Evolución',
      ruta: '/EvolucionHistorica',
      color: 'purple',
      icon: LineChart
    },
    {
      nombre: 'Región',
      ruta: '/ActividadRegion',
      color: 'green',
      icon: MapPin
    },
    {
      nombre: 'Favoritos',
      ruta: '/FavoritosFrecuentes',
      color: 'pink',
      icon: Heart
    },
    {
      nombre: 'Logs',
      ruta: '/LogsAuditorias',
      color: 'orange',
      icon: FileText
    }
  ];


  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Reportes</h1>
              <p className="text-gray-600 mt-1">Estadísticas detalladas y exportación de datos</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, analyst</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Acciones Rápidas */}
<div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>

  {/* Botones adicionales de navegación tipo módulo 7 */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
  {botonesModulo7.map((btn) => {
    const Icon = btn.icon;
    return (
      <Link
        key={btn.nombre}
        href={btn.ruta}
        className={`flex flex-col items-center p-4 bg-${btn.color}-50 rounded-lg hover:bg-${btn.color}-100 transition-colors group shadow`}
      >
        <Icon className={`h-8 w-8 text-${btn.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
        <span className={`text-sm font-semibold text-${btn.color}-900`}>{btn.nombre}</span>
        <span className={`text-xs text-${btn.color}-600 mt-1`}>Ir a {btn.nombre}</span>
      </Link>
    );
  })}
</div>

</div>

    </div>
  );
};

export default GestionReportes;