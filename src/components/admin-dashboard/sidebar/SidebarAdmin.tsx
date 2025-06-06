// src/components/admin-dashboard/sidebar/SidebarAdmin.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { modulos } from '../datos/modulosConfig';

interface SidebarAdminProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({
  activeModule,
  setActiveModule,
  collapsed,
  setCollapsed
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = modulos.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      return `bg-${color}-600 text-white shadow-lg`;
    }
    
    const colorMap: { [key: string]: string } = {
      blue: 'hover:bg-blue-50 hover:text-blue-700',
      indigo: 'hover:bg-indigo-50 hover:text-indigo-700',
      red: 'hover:bg-red-50 hover:text-red-700',
      green: 'hover:bg-green-50 hover:text-green-700',
      purple: 'hover:bg-purple-50 hover:text-purple-700',
      orange: 'hover:bg-orange-50 hover:text-orange-700',
      yellow: 'hover:bg-yellow-50 hover:text-yellow-700',
      teal: 'hover:bg-teal-50 hover:text-teal-700',
      gray: 'hover:bg-gray-50 hover:text-gray-700'
    };

    return colorMap[color] || 'hover:bg-gray-50 hover:text-gray-700';
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-xl transition-all duration-300 z-40 ${
      collapsed ? 'w-20' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>

      <div className="p-4 h-full flex flex-col">
        {/* Search Bar */}
        {!collapsed && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {filteredModules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <div key={module.id} className="relative group">
                  <button
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-start space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                      getColorClasses(module.color, isActive)
                    } ${isActive ? 'ring-2 ring-blue-300' : ''}`}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${collapsed ? 'mx-auto' : ''}`} />
                    {!collapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold block text-gray-900 leading-tight">
                          {module.name}
                        </span>
                        {!isActive && (
                          <span className="text-xs text-gray-600 block mt-1 leading-relaxed break-words">
                            {module.description}
                          </span>
                        )}
                      </div>
                    )}
                  </button>

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-gray-300 text-xs mt-1">{module.description}</div>
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="text-xs text-gray-500 text-center">
              <p className="font-medium text-gray-700">Panel de Administración</p>
              <p className="mt-1">v2.1.0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarAdmin;