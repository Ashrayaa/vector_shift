// /frontend/src/components/PipelineToolbar.jsx
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { nodeCategories } from '../../nodeTypes';


export const PipelineToolbar = ({ onAddNode }) => {
  const [activeCategory, setActiveCategory] = useState('Input/Output');

  const handleAddNode = (nodeType) => {
    const position = {
      x: Math.random() * 300,
      y: Math.random() * 300,
    };
    onAddNode(nodeType, position);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-700 p-4">
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-semibold text-white">Pipeline Builder</h2>
        
        {/* Category Tabs */}
        <div className="flex gap-2">
          {Object.keys(nodeCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Node Buttons */}
        <div className="flex gap-2 flex-wrap">
          {nodeCategories[activeCategory]?.map((node) => (
            <button
              key={node.type}
              onClick={() => handleAddNode(node.type)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 
                         text-white rounded transition-colors text-sm"
              title={node.description}
            >
              <PlusIcon className="w-4 h-4" />
              {node.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// /frontend/src/components/PipelineUI.jsx  

// /frontend/src/components/SubmitButton.jsx
