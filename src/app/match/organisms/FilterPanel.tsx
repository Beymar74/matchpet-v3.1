'use client';

import React from 'react';
import { Filter, Heart, Clock } from 'lucide-react';
import { Button } from '../atoms/Button';
import { FilterSelect } from '../molecules/FilterSelect';
import { StatCard } from '../molecules/StatCard';

interface FilterPanelProps {
  filters: {
    especie: string;
    edad: string;
    tamaño: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onApply: () => void;
  matchCount?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFilterChange, 
  onApply,
  matchCount = 0
}) => {
  return (
    <aside className="lg:w-80 space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-[#30588C]" />
          <h3 className="text-xl font-bold text-[#30588C]">Filtros</h3>
        </div>
        
        <div className="space-y-4">
          <FilterSelect
            label="Especie"
            value={filters.especie}
            onChange={(e) => onFilterChange('especie', e.target.value)}
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'perros', label: 'Perros' },
              { value: 'gatos', label: 'Gatos' }
            ]}
          />

          <FilterSelect
            label="Edad"
            value={filters.edad}
            onChange={(e) => onFilterChange('edad', e.target.value)}
            options={[
              { value: 'cualquier', label: 'Cualquier edad' },
              { value: 'cachorro', label: 'Cachorro (0-1 año)' },
              { value: 'joven', label: 'Joven (1-3 años)' },
              { value: 'adulto', label: 'Adulto (3+ años)' }
            ]}
          />

          <FilterSelect
            label="Tamaño"
            value={filters.tamaño}
            onChange={(e) => onFilterChange('tamaño', e.target.value)}
            options={[
              { value: 'cualquier', label: 'Cualquier tamaño' },
              { value: 'pequeño', label: 'Pequeño' },
              { value: 'mediano', label: 'Mediano' },
              { value: 'grande', label: 'Grande' }
            ]}
          />

          <Button variant="primary" size="md" onClick={onApply} className="w-full">
            Aplicar filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={Heart} value={matchCount} label="Matches" color="pink" />
        <StatCard icon={Clock} value="3d" label="Activo" color="blue" />
      </div>
    </aside>
  );
};