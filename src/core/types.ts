export type StepType = 'MATCH' | 'FAIL' | 'ADVANCE' | 'BACKTRACK';

export interface Snapshot {
  stepId: number;
  charIndex: number; // Where we are in the text string
  nodeId: string;    // Which part of the regex we are looking at
  type: StepType;
  message: string;
}