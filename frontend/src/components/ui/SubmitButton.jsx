import React, { useState } from 'react';
import { PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import { PipelineAlert } from './PipelineAlert';

export const SubmitButton = ({ nodes, edges, onSubmit, onStop, isRunning = false }) => {
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = async () => {
    if (isRunning) {
      onStop?.();
      return;
    }

    if (!nodes || !edges) {
      alert("No pipeline data available. Please ensure nodes and edges are loaded.");
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting pipeline with", nodes.length, "nodes and", edges.length, "edges");
      
      // Submit to backend for analysis
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLastResponse(data);
      setShowAlert(true);

      // Call external onSubmit if provided
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(
        `Error submitting pipeline: ${error.message}. Please check if the backend server is running on http://localhost:8000`
      );
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
          {loading ? 'Analyzing...' : isRunning ? 'Stop Pipeline' : 'Run Pipeline'}
        </button>

        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Save Pipeline
        </button>
        
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Export
        </button>
      </div>

      {/* Display last analysis result */}
      {lastResponse && (
        <div className="mt-3 text-center text-sm text-gray-400">
          Last analysis: {lastResponse.num_nodes} nodes,{" "}
          {lastResponse.num_edges} edges,
          {lastResponse.is_dag ? " Valid DAG ✅" : " Contains cycles ❌"}
        </div>
      )}
      
      {/* Modern Alert Component */}
      <PipelineAlert 
        analysisData={showAlert ? lastResponse : null} 
        onClose={() => setShowAlert(false)} 
      />
    </div>
  );
};