// /frontend/src/nodes/FilterNode.jsx
import React, { useState, useCallback } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { createInputHandle, createOutputHandle } from '../utils/nodeHelpers';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const handleFilterTypeChange = useCallback((e) => {
    setFilterType(e.target.value);
  }, []);

  const handleFilterValueChange = useCallback((e) => {
    setFilterValue(e.target.value);
  }, []);

  const handleCaseSensitiveChange = useCallback((e) => {
    setCaseSensitive(e.target.checked);
  }, []);

  const filterOptions = [
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'equals', label: 'Equals' },
    { value: 'regex', label: 'Regex' }
  ];

  const handles = [
    createInputHandle(`${id}-input`),
    createOutputHandle(`${id}-filtered`),
    createOutputHandle(`${id}-rejected`, { top: '70%' })
  ];

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={FunnelIcon}
      variant="process"
      handles={handles}
      size="large"
    >
      <div className="space-y-2">
        <FormField label="Filter Type">
          <Select
            options={filterOptions}
            value={filterType}
            onChange={handleFilterTypeChange}
          />
        </FormField>
        <FormField label="Filter Value">
          <Input
            type="text"
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder="Enter filter criteria"
          />
        </FormField>
        <FormField>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={handleCaseSensitiveChange}
              className="rounded"
            />
            Case Sensitive
          </label>
        </FormField>
      </div>
    </BaseNode>
  );
};
