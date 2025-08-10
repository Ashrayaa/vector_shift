import React, { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

export const PipelineAlert = ({ analysisData, onClose }) => {
  const [visible, setVisible] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    if (analysisData) {
      setVisible(true);
    }
  }, [analysisData]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Allow animation to complete before closing
  };

  if (!analysisData) return null;

  const { num_nodes, num_edges, is_dag } = analysisData;

  return (
    <div
      className={`fixed inset-x-0 top-4 flex justify-center z-50 transition-all duration-300 ${
        visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'
      }`}
    >
      <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-lg p-4 max-w-lg w-full mx-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {is_dag ? (
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            ) : (
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
            )}
            <h3 className="text-lg font-medium ml-2 text-white">Pipeline Analysis Results</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-slate-300 space-y-2">
          <div className="flex items-center">
            <span className="font-medium w-40">Number of Nodes:</span>
            <span className="bg-slate-700 px-3 py-1 rounded">{num_nodes}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-40">Number of Edges:</span>
            <span className="bg-slate-700 px-3 py-1 rounded">{num_edges}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-40">Graph Structure:</span>
            <span
              className={`px-3 py-1 rounded ${
                is_dag ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
              }`}
            >
              {is_dag ? 'Valid DAG ✓' : 'Contains Cycles ⚠'}
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-400 border-t border-slate-700 pt-3">
          {is_dag ? (
            <p>Your pipeline is properly structured and ready to execute.</p>
          ) : (
            <p>Warning: Your pipeline contains circular dependencies. Please review the connections.</p>
          )}
        </div>
      </div>
    </div>
  );
};
