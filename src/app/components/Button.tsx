import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-[#1A1A1A] text-white hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white',
    light: 'bg-[#3CB371] text-white hover:translate-y-[-2px] hover:shadow-lg',
    medium: 'bg-[#F4B400] text-white hover:translate-y-[-2px] hover:shadow-lg',
    heavy: 'bg-[#E53935] text-white hover:translate-y-[-2px] hover:shadow-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
