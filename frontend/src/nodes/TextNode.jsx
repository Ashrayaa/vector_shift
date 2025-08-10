// /frontend/src/nodes/TextNode.jsx
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { createOutputHandle, createInputHandle } from '../utils/nodeHelpers';
import { FormField } from '../components/ui/FormField';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  
  // Extract variables from text using regex
  const extractedVariables = useMemo(() => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    
    while ((match = variablePattern.exec(text)) !== null) {
      variables.add(match[1].trim());
    }
    
    return Array.from(variables);
  }, [text]);

  // Auto-resize textarea based on content
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 60)}px`;
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [text, autoResize]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  // Calculate dynamic node dimensions
  const getNodeDimensions = useMemo(() => {
    const baseWidth = 200;
    const baseHeight = 120;
    const minWidth = 200;
    const maxWidth = 400;
    const minHeight = 120;
    
    // Calculate width based on text length and variables
    const textLength = text.length;
    const variableCount = extractedVariables.length;
    
    const calculatedWidth = Math.min(
      Math.max(minWidth, baseWidth + Math.floor(textLength / 10) * 5),
      maxWidth
    );
    
    const calculatedHeight = Math.max(
      minHeight,
      baseHeight + Math.floor(textLength / 50) * 20 + (variableCount * 15)
    );
    
    return {
      width: calculatedWidth,
      height: calculatedHeight
    };
  }, [text, extractedVariables]);

  // Create handles dynamically based on variables
  const handles = useMemo(() => {
    const outputHandle = createOutputHandle(`${id}-output`);
    
    const inputHandles = extractedVariables.map((variable, index) => 
      createInputHandle(`${id}-${variable}`, {
        top: `${25 + (index * 25)}%`
      })
    );
    
    return [...inputHandles, outputHandle];
  }, [id, extractedVariables]);

  // Custom BaseNode that accepts dynamic dimensions
  return (
    <div 
      className="border-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 
                 flex flex-col relative group bg-purple-900 border-purple-700 text-purple-50"
      style={{
        width: getNodeDimensions.width,
        minHeight: getNodeDimensions.height
      }}
    >
      {/* Handles */}
      {handles.map((handle, index) => (
        <div
          key={`${handle.type}-${handle.id || index}`}
          className={`absolute w-3 h-3 border-2 rounded-full transition-colors ${
            handle.type === 'source' 
              ? 'bg-green-500 border-green-400 -right-1.5' 
              : 'bg-blue-500 border-blue-400 -left-1.5'
          }`}
          style={{
            top: handle.style?.top || (handle.type === 'source' ? '50%' : `${25 + (index * 25)}%`),
            transform: 'translateY(-50%)'
          }}
          data-testid={`handle-${handle.type}-${handle.id}`}
        />
      ))}

      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-current border-opacity-20">
        <DocumentTextIcon className="w-4 h-4 flex-shrink-0" />
        <span className="font-semibold text-sm truncate">Text</span>
        {extractedVariables.length > 0 && (
          <span className="text-xs bg-blue-600 px-1.5 py-0.5 rounded">
            {extractedVariables.length} var{extractedVariables.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Variables List */}
      {extractedVariables.length > 0 && (
        <div className="px-3 py-2 border-b border-current border-opacity-20">
          <div className="text-xs opacity-75 mb-1">Variables:</div>
          <div className="flex flex-wrap gap-1">
            {extractedVariables.map((variable) => (
              <span
                key={variable}
                className="text-xs bg-blue-800 bg-opacity-50 px-2 py-0.5 rounded"
              >
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-3">
        <FormField label="Content">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text content with variables like {{ input }}..."
            className="w-full px-2 py-1 text-xs rounded border resize-none
                       bg-white bg-opacity-10 border-white border-opacity-30 text-white 
                       placeholder-white placeholder-opacity-60
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 
                       transition-all overflow-hidden"
            style={{
              minHeight: '60px',
              height: 'auto'
            }}
            rows={1}
          />
        </FormField>
      </div>
    </div>
  );
};