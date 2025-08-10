import React, { useState, useCallback } from "react";
import { InboxIcon } from "@heroicons/react/24/outline";

import { createOutputHandle } from "../utils/nodeHelpers";
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleNameChange = useCallback((e) => {
    setInputName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setInputType(e.target.value);
  }, []);

  const typeOptions = [
    { value: "Text", label: "Text" },
    { value: "File", label: "File" },
    { value: "Number", label: "Number" },
    { value: "Boolean", label: "Boolean" },
  ];

  const handles = [createOutputHandle(`${id}-value`)];

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={InboxIcon}
      variant="input"
      handles={handles}
    >
      <div className="space-y-2">
        <FormField label="Name">
          <Input
            type="text"
            value={inputName}
            onChange={handleNameChange}
            placeholder="Enter input name"
          />
        </FormField>
        <FormField label="Type">
          <Select
            options={typeOptions}
            value={inputType}
            onChange={handleTypeChange}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
