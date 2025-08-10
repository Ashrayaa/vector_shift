import React, { useState, useCallback } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";

import { createInputHandle, createOutputHandle } from '../utils/nodeHelpers';
import { Textarea } from '../components/ui/Textarea';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const [customCode, setCustomCode] = useState(data?.customCode || '');

  const handleOperationChange = useCallback((e) => {
    setOperation(e.target.value);
  }, []);

  const handleCustomCodeChange = useCallback((e) => {
    setCustomCode(e.target.value);
  }, []);

  const operationOptions = [
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'trim', label: 'Trim Whitespace' },
    { value: 'reverse', label: 'Reverse' },
    { value: 'custom', label: 'Custom JavaScript' }
  ];

  const handles = [
    createInputHandle(`${id}-input`),
    createOutputHandle(`${id}-output`)
  ];

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon={ArrowsRightLeftIcon}
      variant="process"
      handles={handles}
      size="large"
    >
      <div className="space-y-2">
        <FormField label="Operation">
          <Select
            options={operationOptions}
            value={operation}
            onChange={handleOperationChange}
          />
        </FormField>
        {operation === 'custom' && (
          <FormField label="Custom Code">
            <Textarea
              value={customCode}
              onChange={handleCustomCodeChange}
              placeholder="// Transform function&#10;return input.toUpperCase();"
              rows={3}
            />
          </FormField>
        )}
      </div>
    </BaseNode>
  );
};