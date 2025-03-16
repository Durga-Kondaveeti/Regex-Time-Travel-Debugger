export type StepType = 'MATCH' | 'FAIL' | 'ADVANCE' | 'BACKTRACK';

export interface Snapshot {
  stepId: number;
  charIndex: number; 
  nodeId: string;    
  type: StepType;
  message: string;
}