import React from 'react';
import { clsx } from 'clsx';

const cn = (...inputs) => clsx(inputs);

export const FormField = ({ 
  label, 
  children, 
  error, 
  required, 
  className 
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label className={cn(
          'block text-xs font-medium opacity-90',
          required && "after:content-['*'] after:text-red-400 after:ml-1"
        )}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};
