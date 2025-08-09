import React from 'react';
import { clsx } from 'clsx';

const cn = (...inputs) => clsx(inputs);

export const Input = ({ 
  className, 
  variant = 'default', 
  size = 'sm',
  ...props 
}) => {
  const variants = {
    default: 'bg-white bg-opacity-10 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-60',
    ghost: 'bg-transparent border-transparent text-white'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
  };

  return (
    <input
      className={cn(
        'w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
