
import React from 'react';
import { Handle } from 'reactflow';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  icon: Icon, 
  children, 
  handles = [], 
  className,
  variant = 'default',
  size = 'default'
}) => {
  const variants = {
    default: 'bg-slate-800 border-slate-600 text-slate-100',
    input: 'bg-blue-900 border-blue-700 text-blue-50',
    output: 'bg-green-900 border-green-700 text-green-50',
    process: 'bg-purple-900 border-purple-700 text-purple-50',
    llm: 'bg-orange-900 border-orange-700 text-orange-50'
  };

  const sizes = {
    small: 'w-40 min-h-16',
    default: 'w-48 min-h-20',
    large: 'w-56 min-h-24'
  };

  return (
    <div className={cn(
      'border-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200',
      'flex flex-col relative group',
      variants[variant],
      sizes[size],
      className
    )}>
      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={cn(
            'w-3 h-3 border-2 transition-colors',
            handle.type === 'source' 
              ? 'bg-green-500 border-green-400' 
              : 'bg-blue-500 border-blue-400',
            handle.className
          )}
          style={handle.style}
        />
      ))}

      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-current border-opacity-20">
        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span className="font-semibold text-sm truncate">{title}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-3">
        {children}
      </div>
    </div>
  );
};
