export type StepType = 'MATCH' | 'FAIL';

export interface Snapshot {
  stepId: number;
  charIndex: number; 
  nodeId: string;    
}