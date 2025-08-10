// /frontend/src/App.js
import React, { useRef, useState } from "react";

import { SubmitButton } from "./components/ui/SubmitButton";
import { PipelineToolbar } from "./components/ui/PipelineToolbar";
import { PipelineUI } from "./components/ui/PipelineUI";

function App() {
  const addNodeRef = useRef();
  const [isRunning, setIsRunning] = useState(false);
  const [currentNodes, setCurrentNodes] = useState([]);
  const [currentEdges, setCurrentEdges] = useState([]);

  const handleAddNode = (nodeType, position) => {
    if (addNodeRef.current) {
      addNodeRef.current(nodeType, position);
    }
  };

  const handleNodesEdgesChange = (nodes, edges) => {
    setCurrentNodes(nodes);
    setCurrentEdges(edges);
  };

  const handleSubmit = async (analysisData) => {
    setIsRunning(true);

    // Simulate pipeline execution based on analysis
    if (analysisData?.is_dag) {
      console.log("Pipeline is valid DAG, executing...");
      // Simulate execution time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Pipeline executed successfully!");
    } else {
      console.log("Pipeline contains cycles, cannot execute.");
    }

    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      <PipelineToolbar onAddNode={handleAddNode} />
      <div className="flex-1">
        <PipelineUI
          onAddNode={addNodeRef}
          onNodesEdgesChange={handleNodesEdgesChange}
        />
      </div>
      <SubmitButton
        nodes={currentNodes}
        edges={currentEdges}
        onSubmit={handleSubmit}
        onStop={handleStop}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;
