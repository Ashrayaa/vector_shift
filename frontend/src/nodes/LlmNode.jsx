import React, { useState, useCallback } from "react";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import {
  createInputHandle,
  createOutputHandle,
  createMultipleInputHandles,
} from "../utils/nodeHelpers";

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  const handleModelChange = useCallback((e) => {
    setModel(e.target.value);
  }, []);

  const handleTemperatureChange = useCallback((e) => {
    setTemperature(parseFloat(e.target.value));
  }, []);

  const modelOptions = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "claude-3", label: "Claude 3" },
    { value: "llama-2", label: "Llama 2" },
  ];

  const handles = [
    ...createMultipleInputHandles([`${id}-system`, `${id}-prompt`], 15),
    createOutputHandle(`${id}-response`),
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={CpuChipIcon}
      variant="llm"
      handles={handles}
      size="large"
    >
      <div className="space-y-2">
        <FormField label="Model">
          <Select
            options={modelOptions}
            value={model}
            onChange={handleModelChange}
          />
        </FormField>
        <FormField label="Temperature">
          <Input
            type="number"
            step="0.1"
            min="0"
            max="2"
            value={temperature}
            onChange={handleTemperatureChange}
            placeholder="0.7"
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
