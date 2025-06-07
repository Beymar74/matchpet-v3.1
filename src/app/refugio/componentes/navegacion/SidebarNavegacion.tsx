// src/app/refugio/componentes/navegacion/SidebarNavegacion.tsx
import React from 'react';
import { Home, Heart, Users, BarChart3, Settings } from 'lucide-react';
import { TabType } from '../../tipos';

interface SidebarNavegacionProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const SidebarNavegacion: React.FC<SidebarNavegacionProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'mascotas' as TabType, label: 'Mis Mascotas', icon: Heart },
    { id: 'adopciones' as TabType, label: 'Adopciones', icon: Users },
    { id: 'reportes' as TabType, label: 'Reportes', icon: BarChart3 },
    { id: 'configuracion' as TabType, label: 'Configuración', icon: Settings }
  ];

  return (
    <nav className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-[#011526] text-white">
        <h2 className="font-semibold">Panel de Control</h2>
      </div>
      
      <div className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-[#BF3952] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNavegacion;