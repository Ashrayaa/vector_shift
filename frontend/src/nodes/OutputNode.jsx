import React, { useState, useCallback } from "react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { createInputHandle } from "../utils/nodeHelpers";

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = useCallback((e) => {
    setOutputName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setOutputType(e.target.value);
  }, []);

  const typeOptions = [
    { value: "Text", label: "Text" },
    { value: "Image", label: "Image" },
    { value: "File", label: "File" },
    { value: "JSON", label: "JSON" },
  ];

  const handles = [createInputHandle(`${id}-value`)];

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={DocumentArrowDownIcon}
      variant="output"
      handles={handles}
    >
      <div className="space-y-2">
        <FormField label="Name">
          <Input
            type="text"
            value={outputName}
            onChange={handleNameChange}
            placeholder="Enter output name"
          />
        </FormField>
        <FormField label="Type">
          <Select
            options={typeOptions}
            value={outputType}
            onChange={handleTypeChange}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
