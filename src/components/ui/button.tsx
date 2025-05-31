// src/components/ui/button.tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'default',
      className = '',
      type = 'button',
      disabled = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseClass =
      'px-5 py-2 rounded-full text-sm font-medium transition duration-300 focus:outline-none';
    const variantClass =
      variant === 'outline'
        ? 'bg-white text-[#30588C] border border-[#30588C] hover:bg-[#eef3f8] hover:text-[#254559]'
        : 'bg-[#BF3952] text-white border border-[#BF3952] hover:bg-[#a53147]';

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${baseClass} ${variantClass} ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
export { Button };
