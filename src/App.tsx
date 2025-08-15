import { useState, useEffect, useMemo } from "react";
import { TimeTravelEngine, type Step } from "./lib/engine";
import { Visualizer } from "./components/Visualizer";
import { Controls } from "./components/Controls";
import { AlertTriangle, Info } from "lucide-react";

function App() {
  const [regexStr, setRegexStr] = useState("a+b+c");
  const [textStr, setTextStr] = useState("aaabbbc");

  // State for playback and results
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<{ isMatch: boolean; match: string }>({
    isMatch: false,
    match: "",
  });

  // Initialize Engine
  const engine = useMemo(() => new TimeTravelEngine(), []);

  // Run engine whenever inputs change
  useEffect(() => {
    // Stop playback
    setIsPlaying(false);
    setStepIndex(0);

    // 1. Run the engine
    const generatedSteps = engine.run(regexStr, textStr);
    setSteps(generatedSteps);

    // 2. Determine Success
    // We look for ANY step that indicates success
    const successStep = generatedSteps.find((step) => step.type === "success");
    const isMatch = !!successStep;

    // 3. Determine Matched String
    // We use standard JS Regex to extract the exact substring for the display
    // because the engine steps might not contain the substring text directly.
    let matchText = "";
    if (isMatch) {
      try {
        const nativeMatch = textStr.match(new RegExp(regexStr));
        matchText = nativeMatch ? nativeMatch[0] : textStr;
      } catch (e) {
        matchText = "Error";
      }
    }

    setResult({ isMatch, match: matchText });
  }, [regexStr, textStr, engine]);

  // Define currentStep safely
  const currentStep: Step | null = steps[stepIndex] || null;

  // Auto-play logic
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 500); // Speed: 1.5 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="min-h-screen pb-40">
      {/* Header */}
      <header className="p-6 border-b border-slate-800 bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center text-xl font-bold">
              ⏳
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Regex Time-Travel
            </h1>
          </div>
          {/* <div className="flex gap-4">
             <a href="#" className="text-sm text-gray-400 hover:text-white transition">Docs</a>
             <a href="#" className="text-sm text-gray-400 hover:text-white transition">GitHub</a>
          </div> */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* INPUT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Regular Expression
            </label>
            <input
              value={regexStr}
              onChange={(e) => setRegexStr(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-lg focus:ring-2 focus:ring-primary outline-none transition"
              placeholder="e.g. (a+)+"
            />
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Info size={12} /> Supports literals, ., *, +
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Test String
            </label>
            <input
              value={textStr}
              onChange={(e) => setTextStr(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-lg focus:ring-2 focus:ring-primary outline-none transition"
              placeholder="String to match..."
            />
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center justify-between mb-8 bg-black/20 p-4 rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                currentStep?.type === "backtrack"
                  ? "bg-accent/20 text-accent"
                  : currentStep?.type === "success"
                  ? "bg-success/20 text-success"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {currentStep?.type || "READY"}
            </span>
            <span className="font-mono text-sm text-gray-300">
              {currentStep?.message || "Enter regex to start"}
            </span>
          </div>
          {steps.length >= 2000 && (
            <div className="flex items-center gap-2 text-accent text-sm font-bold animate-pulse">
              <AlertTriangle size={16} />
              CATASTROPHIC BACKTRACKING DETECTED
            </div>
          )}
        </div>

        {/* VISUALIZATION AREA */}
        <Visualizer regex={regexStr} text={textStr} currentStep={currentStep} />

        {/* Result Status Display */}
        {steps.length > 0 && stepIndex === steps.length - 1 && (
          <div
            className={`mt-6 p-4 rounded-lg border-2 text-center transition-all duration-500 ${
              result.isMatch
                ? "bg-green-50 border-green-500 text-green-900"
                : "bg-red-50 border-red-500 text-red-900"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">
              {result.isMatch ? "Match Found! 🎉" : "No Match Found 🚫"}
            </h3>

            {result.isMatch && (
              <div className="text-lg">
                Output:{" "}
                <span className="bg-yellow-300 text-black px-2 py-1 rounded font-mono shadow-sm">
                  {result.match}
                </span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER CONTROLS */}
      <Controls
        totalSteps={steps.length}
        currentStepIndex={stepIndex}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onStepChange={setStepIndex}
      />
    </div>
  );
}

export default App;
