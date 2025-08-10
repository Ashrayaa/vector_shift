import React from 'react';
import { clsx } from 'clsx';

const cn = (...inputs) => clsx(inputs);

export const Textarea = ({ 
  className, 
  rows = 3,
  ...props 
}) => {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full px-2 py-1 text-xs rounded border resize-none',
        'bg-white bg-opacity-10 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-60',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all',
        className
      )}
      {...props}
    />
  );
};