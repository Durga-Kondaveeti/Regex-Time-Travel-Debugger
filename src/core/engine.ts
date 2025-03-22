import { RegExpParser } from "regexpp";
import { Snapshot } from "./types";

// This is a simplified recursive matcher that yields snapshots
function* matchRecursive(
  node: any,
  text: string,
  index: number,
  path: string[]
): Generator<Snapshot, boolean, unknown> {
  // 1. Emit Snapshot: We are entering a node
  yield {
    stepId: Date.now(),
    charIndex: index,
    nodeId: node.type,
    type: "ADVANCE",
    message: `Checking ${node.type} against char '${text[index]}'`,
  };

  // 2. Logic for different Regex Nodes (Simplified)
  if (node.type === "Character") {
    if (index < text.length && text[index] === node.value) {
      yield {
        stepId: Date.now(),
        charIndex: index,
        nodeId: node.type,
        type: "MATCH",
        message: "Character Matched!",
      };
      return true; // Match success
    } else {
      yield {
        stepId: Date.now(),
        charIndex: index,
        nodeId: node.type,
        type: "FAIL",
        message: "Mismatch",
      };
      return false; // Backtrack trigger
    }
  }

  // ... (Logic for Quantifiers, Groups, Disjunctions would go here)

  return false;
}

export function generateTrace(regexPattern: string, text: string): Snapshot[] {
  const parser = new RegExpParser();
  const ast = parser.parsePattern(regexPattern);

  // Create the generator
  const iterator = matchRecursive(ast, text, 0, []);
  const steps: Snapshot[] = [];

  // Run the generator to completion and store steps
  for (const step of iterator) {
    steps.push(step);
    // Safety break for catastrophic backtracking protection in the debugger itself
    if (steps.length > 10000) break;
  }

  return steps;
}
