import React, { useState, useCallback } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { BaseNode } from "../components/ui/BaseNode";
import { FormField } from "../components/ui/FormField";
import { createOutputHandle } from "../utils/nodeHelpers";
import { Textarea } from "../components/ui/Textarea";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handles = [createOutputHandle(`${id}-output`)];

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={DocumentTextIcon}
      variant="process"
      handles={handles}
    >
      <FormField label="Content">
        <Textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text content..."
          rows={3}
        />
      </FormField>
    </BaseNode>
  );
};
