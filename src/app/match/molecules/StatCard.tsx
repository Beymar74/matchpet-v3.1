import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: 'blue' | 'pink' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  color = 'blue' 
}) => {
  const colors = {
    blue: 'from-blue-400 to-cyan-500',
    pink: 'from-pink-400 to-rose-500',
    purple: 'from-purple-400 to-indigo-500'
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};