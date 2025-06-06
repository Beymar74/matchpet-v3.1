// src/components/admin-dashboard/AdminDashboard.tsx
"use client";

import React, { useState } from 'react';
import HeaderAdmin from '@/components/layout/HeaderAdmin';
import SidebarAdmin from './sidebar/SidebarAdmin';
import Dashboard from './dashboard/Dashboard';
import ModuloGenerico from './modulos/ModuloGenerico';
import GestionUsuarios from './modulos/GestionUsuarios';
import GestionMascotas from './modulos/GestionMascotas';
import GestionAdopciones from './modulos/GestionAdopciones';
import GestionCompatibilidad from './modulos/GestionCompatibilidad';
import GestionReportes from './modulos/GestionReportes';
import GestionNotificaciones from './modulos/GestionNotificaciones';
import GestionComunicacion from './modulos/GestionComunicacion';
import ConfiguracionSistema from './modulos/ConfiguracionSistema';
import { modulos } from './datos/modulosConfig';

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'usuarios':
        return <GestionUsuarios />;
      
      case 'mascotas':
        return <GestionMascotas />;
      
      case 'adopciones':
        return <GestionAdopciones />;
      
      case 'compatibilidad':
        return <GestionCompatibilidad />;
      
      case 'reportes':
        return <GestionReportes />;
      
      case 'notificaciones':
        return <GestionNotificaciones />;
      
      case 'comunicacion':
        return <GestionComunicacion />;
      
      case 'configuracion':
        return <ConfiguracionSistema />;
      
      default:
        // Para módulos no implementados, usar el componente genérico
        const activeModuleData = modulos.find(m => m.id === activeModule);
        return <ModuloGenerico moduleData={activeModuleData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <HeaderAdmin />
      
      <div className="flex">
        {/* Sidebar */}
        <SidebarAdmin 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderModuleContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;