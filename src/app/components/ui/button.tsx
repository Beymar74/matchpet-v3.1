import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
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
      size = 'md',
      className = '',
      type = 'button',
      disabled = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseClass =
      'inline-flex items-center justify-center font-medium rounded-full transition duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

    const variantClass =
      variant === 'outline'
        ? 'bg-white text-[#30588C] border border-[#30588C] hover:bg-[#eef3f8] hover:text-[#254559]'
        : 'bg-[#BF3952] text-white border border-[#BF3952] hover:bg-[#a53147]';

    const sizeClass =
      size === 'sm'
        ? 'px-4 py-1.5 text-sm'
        : size === 'lg'
        ? 'px-6 py-3 text-lg'
        : 'px-5 py-2 text-base'; // md (default)

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
export { Button };
