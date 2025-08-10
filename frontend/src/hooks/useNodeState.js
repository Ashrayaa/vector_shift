import { useState, useCallback } from "react";

export const useNodeState = (initialData = {}) => {
  const [nodeData, setNodeData] = useState(initialData);

  const updateField = useCallback((field, value) => {
    setNodeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateData = useCallback((newData) => {
    setNodeData((prev) => ({
      ...prev,
      ...newData,
    }));
  }, []);

  return {
    nodeData,
    updateField,
    updateData,
    setNodeData,
  };
};
