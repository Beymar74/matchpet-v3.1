import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled, 
  className = '' 
}) => {
  const baseStyles = 'font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white hover:shadow-lg transform hover:scale-105',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl',
    ghost: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-white text-red-500 hover:bg-red-50 shadow-lg',
    success: 'bg-gradient-to-r from-[#BF3952] to-pink-500 text-white hover:shadow-xl transform hover:scale-110'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    icon: 'w-12 h-12 rounded-full',
    'icon-lg': 'w-16 h-16 rounded-full'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};