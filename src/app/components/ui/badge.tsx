import React from 'react';
import { cn } from '@/lib/utils'; // Asegúrate de tener esta función

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'default' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition';

  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    outline: 'bg-white border border-gray-300 text-gray-700',
    secondary: 'bg-white/20 border border-transparent text-white',
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};

export { Badge };
