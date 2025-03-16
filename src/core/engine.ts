import { RegExpParser } from "regexpp";
import { Snapshot } from "./types";

function* matchRecursive(
  node: any,
  text: string,
  index: number
): Generator<Snapshot, boolean, unknown> {
  yield {
    stepId: Date.now(),
    charIndex: index,
    nodeId: node.type,
  };

  if (index < text.length && text[index] === node.value) {
    yield { stepId: Date.now(), charIndex: index, nodeId: "1" };
    return true;
  } else {
    yield { stepId: Date.now(), charIndex: index, nodeId: "2" };
    return false;
  }
}

export function generateTrace(regexPattern: string, text: string): Snapshot[] {
  const parser = new RegExpParser();
  const ast = parser.parsePattern(regexPattern);

  const iterator = matchRecursive(ast, text, 0, []);
  const steps: Snapshot[] = [];

  for (const step of iterator) {
    steps.push(step);
  }

  return steps;
}
