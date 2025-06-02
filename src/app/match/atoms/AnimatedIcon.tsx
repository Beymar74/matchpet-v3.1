import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  animate?: boolean;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: Icon, 
  className = '', 
  animate = true 
}) => {
  return (
    <Icon className={`${className} ${animate ? 'group-hover:scale-110 transition-transform' : ''}`} />
  );
};
