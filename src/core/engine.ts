import { RegExpParser } from "regexpp";
import { Snapshot } from "./types";

function* matchRecursive(
  node: any,
  text: string,
  index: number,
  path: string[]
): Generator<Snapshot, boolean, unknown> {
  yield {
    stepId: Date.now(),
    charIndex: index,
    nodeId: node.type,
    type: "ADVANCE",
    message: `Checking ${node.type} against char '${text[index]}'`,
  };

  if (index < text.length && text[index] === node.value) {
    yield {
      stepId: Date.now(),
      charIndex: index,
      nodeId: node.type,
      type: "MATCH",
      message: "Character Matched!",
    };
    return true;
  } else {
    yield {
      stepId: Date.now(),
      charIndex: index,
      nodeId: node.type,
      type: "FAIL",
      message: "Mismatch",
    };
    return false;
  }

  return false;
}

export function generateTrace(regexPattern: string, text: string): Snapshot[] {
  const parser = new RegExpParser();
  const ast = parser.parsePattern(regexPattern);

  const iterator = matchRecursive(ast, text, 0, []);
  const steps: Snapshot[] = [];

  for (const step of iterator) {
    steps.push(step);

    if (steps.length > 10000) break;
  }

  return steps;
}
