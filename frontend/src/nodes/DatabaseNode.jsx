import React, { useState, useCallback } from 'react';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { createInputHandle, createOutputHandle } from '../utils/nodeHelpers';
import { Textarea } from '../components/ui/Textarea';

export const DatabaseNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'select');
  const [table, setTable] = useState(data?.table || 'users');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10');
  const [connection, setConnection] = useState(data?.connection || 'default');

  const handleOperationChange = useCallback((e) => {
    setOperation(e.target.value);
  }, []);

  const handleTableChange = useCallback((e) => {
    setTable(e.target.value);
  }, []);

  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleConnectionChange = useCallback((e) => {
    setConnection(e.target.value);
  }, []);

  const operationOptions = [
    { value: 'select', label: 'SELECT' },
    { value: 'insert', label: 'INSERT' },
    { value: 'update', label: 'UPDATE' },
    { value: 'delete', label: 'DELETE' }
  ];

  const connectionOptions = [
    { value: 'default', label: 'Default DB' },
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mongodb', label: 'MongoDB' }
  ];

  const handles = [
    createInputHandle(`${id}-params`),
    createOutputHandle(`${id}-result`),
    createOutputHandle(`${id}-error`, { top: '70%' })
  ];

  return (
    <BaseNode
      id={id}
      title="Database"
      icon={CircleStackIcon}
      variant="process"
      handles={handles}
      size="large"
    >
      <div className="space-y-2">
        <FormField label="Connection">
          <Select
            options={connectionOptions}
            value={connection}
            onChange={handleConnectionChange}
          />
        </FormField>
        <FormField label="Operation">
          <Select
            options={operationOptions}
            value={operation}
            onChange={handleOperationChange}
          />
        </FormField>
        <FormField label="Table">
          <Input
            type="text"
            value={table}
            onChange={handleTableChange}
            placeholder="Table name"
          />
        </FormField>
        <FormField label="Query">
          <Textarea
            value={query}
            onChange={handleQueryChange}
            placeholder="SQL query..."
            rows={2}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};