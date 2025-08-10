import React, { useState, useCallback } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { createInputHandle, createOutputHandle } from '../utils/nodeHelpers';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');
  const [dataType, setDataType] = useState(data?.dataType || 'string');

  const handleConditionChange = useCallback((e) => {
    setCondition(e.target.value);
  }, []);

  const handleValueChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleDataTypeChange = useCallback((e) => {
    setDataType(e.target.value);
  }, []);

  const conditionOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Not Equals' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
    { value: 'contains', label: 'Contains' },
    { value: 'isEmpty', label: 'Is Empty' }
  ];

  const typeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' }
  ];

  const handles = [
    createInputHandle(`${id}-input`),
    createOutputHandle(`${id}-true`, { top: '40%' }),
    createOutputHandle(`${id}-false`, { top: '70%' })
  ];

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon={QuestionMarkCircleIcon}
      variant="process"
      handles={handles}
      size="large"
    >
      <div className="space-y-2">
        <FormField label="Condition">
          <Select
            options={conditionOptions}
            value={condition}
            onChange={handleConditionChange}
          />
        </FormField>
        <FormField label="Compare Value">
          <Input
            type={dataType === 'number' ? 'number' : 'text'}
            value={value}
            onChange={handleValueChange}
            placeholder="Enter comparison value"
          />
        </FormField>
        <FormField label="Data Type">
          <Select
            options={typeOptions}
            value={dataType}
            onChange={handleDataTypeChange}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};