import React from 'react';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const cn = (...inputs) => clsx(inputs);

export const Select = ({ 
  options = [], 
  value, 
  onChange, 
  className,
  size = 'sm'
}) => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={cn(
          'w-full rounded border bg-white bg-opacity-10 border-white border-opacity-30 text-white appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all',
          sizes[size],
          className
        )}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-gray-800 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
    </div>
  );
};