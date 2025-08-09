import { Position } from "reactflow";

export const createHandle = (
  type,
  position,
  id,
  style = {},
  className = ""
) => ({
  type,
  position,
  id,
  style,
  className,
});

export const createInputHandle = (id, style = {}) =>
  createHandle("target", Position.Left, id, style);

export const createOutputHandle = (id, style = {}) =>
  createHandle("source", Position.Right, id, style);

export const createMultipleInputHandles = (ids, startTop = 25) =>
  ids.map((id, index) =>
    createInputHandle(id, { top: `${startTop + index * 30}%` })
  );

export const nodeTypes = {
  INPUT: "input",
  OUTPUT: "output",
  PROCESS: "process",
  LLM: "llm",
  TEXT: "text",
};
