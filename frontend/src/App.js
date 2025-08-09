// /frontend/src/App.js
import React, { useRef, useState } from "react";
import { PipelineToolbar } from "./components/ui/PipelineToolbar";
import { PipelineUI } from "./components/ui/PipelineUI";
import { SubmitButton } from "./components/ui/SubmitButton";

function App() {
  const addNodeRef = useRef();
  const [isRunning, setIsRunning] = useState(false);

  const handleAddNode = (nodeType, position) => {
    if (addNodeRef.current) {
      addNodeRef.current(nodeType, position);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    // Simulate pipeline execution
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      <PipelineToolbar onAddNode={handleAddNode} />
      <div className="flex-1">
        <PipelineUI onAddNode={addNodeRef} />
      </div>
      <SubmitButton
        onSubmit={handleSubmit}
        onStop={handleStop}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;
