export type StepType = 'start' | 'match' | 'fail' | 'backtrack' | 'success' | 'finish';

export interface Step {
  id: number;
  type: StepType;
  regexIndex: number; // Which char in regex we are looking at
  stringIndex: number; // Which char in string we are looking at
  message: string;
  depth: number;
}

// A simplified Regex parser/matcher for demonstration
// Supports: Literals, ., *, +
export class TimeTravelEngine {
  steps: Step[] = [];
  stepId = 0;
  maxSteps = 2000; // Circuit breaker for catastrophic backtracking

  log(type: StepType, rIdx: number, sIdx: number, msg: string, depth: number) {
    if (this.steps.length >= this.maxSteps) return;
    this.steps.push({
      id: this.stepId++,
      type,
      regexIndex: rIdx,
      stringIndex: sIdx,
      message: msg,
      depth
    });
  }

  // Main entry point
  run(pattern: string, text: string): Step[] {
    this.steps = [];
    this.stepId = 0;
    
    let matchFound = false;

    // Loop through every index of the text to try finding the pattern
    // (This makes the regex "unanchored" - it searches everywhere)
    for (let startIdx = 0; startIdx <= text.length; startIdx++) {
      
      // Stop if we hit the limit
      if (this.steps.length >= this.maxSteps) break;

      this.log('start', 0, startIdx, `Attempting match starting at index ${startIdx}...`, 0);

      // Try matching from the current position
      if (this.matchRecursive(pattern, text, 0, startIdx, 0)) {
        matchFound = true;
        break; // Stop searching once we find the first match
      }
    }
    
    // Finalization Logs
    if (this.steps.length >= this.maxSteps) {
      this.steps.push({
        id: this.stepId++,
        type: 'fail',
        regexIndex: 0,
        stringIndex: 0,
        message: 'Catastrophic Backtracking Detected! Execution halted.',
        depth: 0
      });
    } else if (!matchFound) {
      this.log('finish', 0, text.length, 'No match found in entire string.', 0);
    } else {
      this.log('finish', 0, 0, 'Execution Completed', 0);
    }

    return this.steps;
  }

  matchRecursive(pattern: string, text: string, pIdx: number, tIdx: number, depth: number): boolean {
    if (this.steps.length >= this.maxSteps) return false;

    // 1. Check for success (end of pattern)
    if (pIdx >= pattern.length) {
      this.log('success', pIdx, tIdx, `Match found ending at index ${tIdx}!`, depth);
      return true;
    }

    const currentPatternChar = pattern[pIdx];
    const isStar = (pIdx + 1 < pattern.length) && pattern[pIdx + 1] === '*';
    const isPlus = (pIdx + 1 < pattern.length) && pattern[pIdx + 1] === '+';
    
    // Log attempt
    this.log('start', pIdx, tIdx, `Trying to match '${currentPatternChar}'`, depth);

    // 2. Handle Quantifiers (* and +)
    if (isStar || isPlus) {
       const charToMatch = currentPatternChar;
       const nextPIdx = pIdx + 2; // Skip char and *
       
       // Greedy match: Consume as many as possible
       let maxConsume = 0;
       while (tIdx + maxConsume < text.length && 
             (text[tIdx + maxConsume] === charToMatch || charToMatch === '.')) {
         maxConsume++;
       }

       // For '+', we must match at least one
       if (isPlus && maxConsume === 0) {
          this.log('fail', pIdx, tIdx, `+ requires at least one '${charToMatch}'`, depth);
          return false;
       }

       // Backtracking Loop: Try consuming max, then max-1, ... 0
       for (let i = maxConsume; i >= (isPlus ? 1 : 0); i--) {
          this.log('match', pIdx, tIdx + i, `Quantifier consumed ${i} chars. Recursing...`, depth);
          
          if (this.matchRecursive(pattern, text, nextPIdx, tIdx + i, depth + 1)) {
            return true;
          }
          
          this.log('backtrack', pIdx, tIdx + i, `Backtracking from ${i} consumption`, depth);
       }
       
       return false;
    }

    // 3. Handle Single Character Match
    if (tIdx < text.length && (pattern[pIdx] === '.' || pattern[pIdx] === text[tIdx])) {
       this.log('match', pIdx, tIdx, `Matched '${text[tIdx]}'`, depth);
       if (this.matchRecursive(pattern, text, pIdx + 1, tIdx + 1, depth + 1)) {
         return true;
       }
       this.log('backtrack', pIdx, tIdx, 'Backtracking single char', depth);
       return false;
    }

    // 4. Failure
    this.log('fail', pIdx, tIdx, 'Mismatch', depth);
    return false;
  }
}