import React, { useState, useCallback } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { createInputHandle, createOutputHandle } from '../utils/nodeHelpers';

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration || 1);
  const [unit, setUnit] = useState(data?.unit || 'seconds');

  const handleDurationChange = useCallback((e) => {
    setDuration(parseInt(e.target.value));
  }, []);

  const handleUnitChange = useCallback((e) => {
    setUnit(e.target.value);
  }, []);

  const unitOptions = [
    { value: 'milliseconds', label: 'Milliseconds' },
    { value: 'seconds', label: 'Seconds' },
    { value: 'minutes', label: 'Minutes' }
  ];

  const handles = [
    createInputHandle(`${id}-input`),
    createOutputHandle(`${id}-output`)
  ];

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon={ClockIcon}
      variant="process"
      handles={handles}
    >
      <div className="space-y-2">
        <FormField label="Duration">
          <Input
            type="number"
            min="1"
            value={duration}
            onChange={handleDurationChange}
            placeholder="1"
          />
        </FormField>
        <FormField label="Unit">
          <Select
            options={unitOptions}
            value={unit}
            onChange={handleUnitChange}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};