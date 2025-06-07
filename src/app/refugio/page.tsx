// src/app/refugio/page.tsx
"use client";
import React, { useState } from 'react';
import HeaderRefugio from '@/components/layout/HeaderRefugio';
import SidebarNavegacion from './componentes/navegacion/SidebarNavegacion';
import InfoRefugio from './componentes/navegacion/InfoRefugio';
import TarjetasEstadisticas from './componentes/dashboard/TarjetasEstadisticas';
import GraficoOcupacion from './componentes/dashboard/GraficoOcupacion';
import SolicitudesRecientes from './componentes/dashboard/SolicitudesRecientes';
import GestionMascotas from './componentes/mascotas/GestionMascotas';
import GestionAdopciones from './componentes/adopciones/GestionAdopciones';
import GestionReportes from './componentes/reportes/GestionReportes';
import GestionConfiguracion from './componentes/configuracion/GestionConfiguracion';
import { refugioInfo, estadisticas, mascotas, solicitudesPendientes } from './datos/ejemplos';

const RefugioPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContenido = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <TarjetasEstadisticas estadisticas={estadisticas} />
            <GraficoOcupacion refugioInfo={refugioInfo} />
            <SolicitudesRecientes solicitudesPendientes={solicitudesPendientes} />
          </div>
        );
      case 'mascotas':
        return <GestionMascotas mascotas={mascotas} />;
      case 'adopciones':
        return <GestionAdopciones />;
      case 'reportes':
        return <GestionReportes />;
      case 'configuracion':
        return <GestionConfiguracion />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderRefugio />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SidebarNavegacion 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <InfoRefugio refugioInfo={refugioInfo} />
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {renderContenido()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefugioPage;