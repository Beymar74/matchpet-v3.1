"use client";

import React, { useState } from 'react';
import FormattedNumber from '@/components/FormattedNumber';
// Remover esta línea: import HeaderAdmin from '@/components/layout/HeaderAdmin';
import { 
  Users, 
  Heart, 
  PieChart, 
  Settings, 
  Bell, 
  MessageCircle, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  UserCheck,
  UserX,
  AlertTriangle,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Database,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  UserCog,
  PawPrint
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  // Datos de ejemplo
  const stats = {
    totalUsers: 1247,
    totalPets: 856,
    adoptionsMonth: 127,
    activeRefugios: 34,
    pendingRequests: 23,
    compatibility: 92.5
  };

  const recentActivity = [
    { id: 1, type: 'adoption', message: 'Nueva adopción: Max adoptado por María García', time: '2 min', status: 'success' },
    { id: 2, type: 'user', message: 'Nuevo refugio registrado: Hogar Peludo', time: '15 min', status: 'info' },
    { id: 3, type: 'alert', message: 'Solicitud de adopción requiere revisión', time: '1 hora', status: 'warning' },
    { id: 4, type: 'system', message: 'Backup de base de datos completado', time: '2 horas', status: 'success' }
  ];

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, description: 'Vista general del sistema' },
    { id: 'users', name: 'Gestión de Usuarios', icon: Users, description: 'Administrar usuarios y roles' },
    { id: 'pets', name: 'Gestión de Mascotas', icon: Heart, description: 'Supervisar registro de mascotas' },
    { id: 'adoptions', name: 'Adopciones', icon: UserCheck, description: 'Monitorear proceso de adopción' },
    { id: 'compatibility', name: 'Compatibilidad', icon: PawPrint, description: 'Configurar algoritmo de matching' },
    { id: 'reports', name: 'Reportes', icon: PieChart, description: 'Estadísticas y exportaciones' },
    { id: 'notifications', name: 'Notificaciones', icon: Bell, description: 'Gestionar alertas del sistema' },
    { id: 'communication', name: 'Comunicación', icon: MessageCircle, description: 'Supervisar comunicaciones' },
    { id: 'settings', name: 'Configuración', icon: Settings, description: 'Ajustes del sistema' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">
                <FormattedNumber value={stats.totalUsers} />
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Mascotas</p>
              <p className="text-2xl font-bold text-gray-900">
                <FormattedNumber value={stats.totalPets} />
              </p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adopciones/Mes</p>
              <p className="text-2xl font-bold text-gray-900">
                <FormattedNumber value={stats.adoptionsMonth} />
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Refugios Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                <FormattedNumber value={stats.activeRefugios} />
              </p>
            </div>
            <MapPin className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                <FormattedNumber value={stats.pendingRequests} />
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compatibilidad</p>
              <p className="text-2xl font-bold text-gray-900">              
                <FormattedNumber value={stats.compatibility} />%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-600" />
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Nuevo Usuario</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Heart className="h-8 w-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-900">Aprobar Mascota</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Generar Reporte</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Settings className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Configurar</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2 text-indigo-600" />
          Estado del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Base de Datos: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">API: Funcionando</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Notificaciones: Limitado</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Storage: 78% usado</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    if (activeModule === 'dashboard') return renderDashboard();
    
    const activeModuleData = modules.find(m => m.id === activeModule); // Find the module data
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-between mb-4">
            {/* Check if icon exists before creating the element */}
            {activeModuleData?.icon &&
              React.createElement(activeModuleData.icon, {
                className: "h-12 w-12 text-gray-400"
              })
            }
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {modules.find(m => m.id === activeModule)?.name}
          </h3>
          <p className="text-gray-600 mb-6">
            {modules.find(m => m.id === activeModule)?.description}
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Configurar Módulo
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeModule === module.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{module.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderModuleContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;