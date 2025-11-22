import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 rounded-md";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 border border-transparent",
    outline: "border border-slate-700 text-text-main hover:border-primary hover:text-primary bg-transparent",
    ghost: "text-text-muted hover:text-primary bg-transparent"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};