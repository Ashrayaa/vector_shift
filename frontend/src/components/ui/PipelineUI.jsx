import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { nodeTypes } from '../../nodeTypes';

const initialNodes = [
  {
    id: '1',
    type: 'customInput',
    position: { x: 100, y: 100 },
    data: { inputName: 'user_input', inputType: 'Text' },
  },
  {
    id: '2',
    type: 'text',
    position: { x: 300, y: 100 },
    data: { text: 'Hello {{ user_input }}, welcome to our {{ platform }}!' },
  },
  {
    id: '3',
    type: 'llm',
    position: { x: 500, y: 100 },
    data: { model: 'gpt-4', temperature: 0.7 },
  },
  {
    id: '4',
    type: 'customOutput',
    position: { x: 800, y: 100 },
    data: { outputName: 'response', outputType: 'Text' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: '1-value',
    targetHandle: '2-user_input',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: '2-output',
    targetHandle: '3-prompt',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    sourceHandle: '3-response',
    targetHandle: '4-value',
  },
];

export const PipelineUI = ({ onAddNode: addNodeFromToolbar, onNodesEdgesChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback((type, position) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {},
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Notify parent component of nodes/edges changes
  React.useEffect(() => {
    if (onNodesEdgesChange) {
      onNodesEdgesChange(nodes, edges);
    }
  }, [nodes, edges, onNodesEdgesChange]);

  // Connect toolbar add node functionality
  React.useEffect(() => {
    if (addNodeFromToolbar) {
      addNodeFromToolbar.current = addNode;
    }
  }, [addNode, addNodeFromToolbar]);

  return (
    <div className="h-[calc(100vh-200px)] bg-slate-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#334155" />
        <Controls />
        <MiniMap
          className="bg-slate-700"
          nodeColor="rgb(148, 163, 184)"
          maskColor="rgba(15, 23, 42, 0.8)"
        />
      </ReactFlow>
    </div>
  );
};