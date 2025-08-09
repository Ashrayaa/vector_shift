import React, { useState } from 'react';
import { PlayIcon, StopIcon } from '@heroicons/react/24/solid';

export const SubmitButton = ({ onSubmit, onStop, isRunning = false }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (isRunning) {
      onStop?.();
      return;
    }

    setLoading(true);
    try {
      await onSubmit?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border-t border-slate-700 p-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={handleClick}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isRunning ? (
            <StopIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
          {loading ? 'Processing...' : isRunning ? 'Stop Pipeline' : 'Run Pipeline'}
        </button>

        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Save Pipeline
        </button>
        
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Export
        </button>
      </div>
    </div>
  );
};