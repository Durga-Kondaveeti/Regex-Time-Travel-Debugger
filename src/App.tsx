import { useState, useMemo, useEffect } from 'react';
import { generateTrace } from './core/engine';
import { Controls } from './components/Controls';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [regexStr, setRegexStr] = useState("a+b");
  const [textStr, setTextStr] = useState("aaab");
  
  // Player State
  const [stepIndex, setStepIndex] = useState(0);

  // Generate trace only when inputs change
  const trace = useMemo(() => {
    try {
      // Reset player when inputs change
      setStepIndex(0);
      return generateTrace(regexStr, textStr);
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [regexStr, textStr]);

  const currentSnapshot = trace[stepIndex];
  const totalSteps = trace.length;

  // Auto-Play Logic

  const handleStep = (delta: number) => {
    setStepIndex(prev => Math.min(Math.max(prev + delta, 0), totalSteps - 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            ⏳ Regex Time-Travel
          </h1>
          <p className="text-slate-500">Visualizing the engine state, step by step.</p>
        </header>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Regex Pattern</label>
            <input 
              className="w-full p-3 font-mono border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              value={regexStr} 
              onChange={e => setRegexStr(e.target.value)}
              placeholder="e.g. (a+)+"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Test String</label>
            <input 
              className="w-full p-3 font-mono border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              value={textStr} 
              onChange={e => setTextStr(e.target.value)} 
              placeholder="e.g. aaaaaaa!"
            />
          </div>
        </div>

        {/* Visualization Screen */}
        <div className="bg-slate-900 rounded-xl p-8 mb-6 shadow-xl relative overflow-hidden">
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
             {currentSnapshot?.type === 'MATCH' && <span className="flex items-center gap-1 text-green-400 font-bold"><CheckCircle2 size={16}/> Match</span>}
             {currentSnapshot?.type === 'FAIL' && <span className="flex items-center gap-1 text-red-400 font-bold"><AlertCircle size={16}/> Fail</span>}
          </div>

          {/* The String Display */}
          <div className="text-3xl font-mono tracking-widest leading-loose break-all text-slate-400">
            {textStr.split('').map((char, i) => {
              const isCurrent = i === currentSnapshot?.charIndex;
              return (
                <span 
                  key={i}
                  className={`
                    relative inline-block px-1 rounded transition-all duration-200
                    ${isCurrent ? 'bg-blue-600 text-white scale-110 shadow-lg z-10' : ''}
                  `}
                >
                  {char}
                  {/* Cursor Indicator */}
                  {isCurrent && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45"></div>
                  )}
                </span>
              );
            })}
          </div>

          {/* Engine Message */}
          <div className="mt-8 pt-4 border-t border-slate-700 text-slate-300 font-mono text-sm">
            <span className="text-slate-500">ENGINE LOG: </span>
            {currentSnapshot ? currentSnapshot.message : "Ready to start..."}
          </div>
        </div>

        {/* Controls */}
        <Controls 
          currentStep={stepIndex}
          totalSteps={totalSteps}
          onSeek={setStepIndex}
        />
      </div>
    </div>
  );
}

export default App;