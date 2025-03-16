import { useState, useMemo } from "react";
import { generateTrace } from "./core/engine";

function App() {
  const [regex, setRegex] = useState("a+b");
  const [text, setText] = useState("aaab");
  const [stepIndex, setStepIndex] = useState(0);
  const trace = useMemo(() => {
    return generateTrace(regex, text);
  }, [regex, text]);

  const currentSnapshot = trace[stepIndex];

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⏳ Regex Time-Travel</h1>

      {/* first input */}
      <div className="flex gap-4 mb-8">
        <input
          className="border p-2 rounded"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* first checker*/}
      <div className="mb-4 text-xl font-mono tracking-widest bg-gray-100 p-4 rounded">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={
              i === currentSnapshot?.charIndex
                ? "bg-yellow-400 text-black font-bold"
                : "text-gray-500"
            }
          >
            {char}
          </span>
        ))}
      </div>

      {/* Time Travel */}
      <input
        type="range"
        min="0"
        max={trace.length - 1}
        value={stepIndex}
        onChange={(e) => setStepIndex(Number(e.target.value))}
        className="w-full"
      />

      <div className="mt-2 text-sm text-gray-600">
        Step {stepIndex} / {trace.length}: {"1"}
      </div>
    </div>
  );
}

export default App;
