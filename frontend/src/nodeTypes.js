import { ConditionalNode } from "./nodes/ConditionalNode";
import { DatabaseNode } from "./nodes/DatabaseNode";
import { DelayNode } from "./nodes/DelayNode";
import { FilterNode } from "./nodes/FilterNode";
import { InputNode } from "./nodes/InputNode.jsx";
import { LLMNode } from "./nodes/LlmNode.jsx";
import { OutputNode } from "./nodes/OutputNode.jsx";
import { TextNode } from "./nodes/TextNode.jsx";
import { TransformNode } from "./nodes/TransformNode";

export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  delay: DelayNode,
  conditional: ConditionalNode,
  database: DatabaseNode,
};

// Node creation helpers for easy addition of new nodes
export const createNodeData = (type, position, customData = {}) => ({
  id: `${type}-${Date.now()}`,
  type,
  position,
  data: customData,
});

// Available node categories for toolbar organization
export const nodeCategories = {
  "Input/Output": [
    { type: "customInput", label: "Input", description: "Data input node" },
    { type: "customOutput", label: "Output", description: "Data output node" },
  ],
  Processing: [
    { type: "text", label: "Text", description: "Static text or template" },
    { type: "transform", label: "Transform", description: "Transform data" },
    {
      type: "filter",
      label: "Filter",
      description: "Filter data based on conditions",
    },
    {
      type: "conditional",
      label: "Conditional",
      description: "Branch logic based on conditions",
    },
    {
      type: "delay",
      label: "Delay",
      description: "Add time delays to pipeline",
    },
  ],
  "AI/ML": [{ type: "llm", label: "LLM", description: "Large Language Model" }],
  Data: [
    { type: "database", label: "Database", description: "Database operations" },
  ],
};
