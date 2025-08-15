import type { Step } from '../core/engine';
import clsx from 'clsx';

interface VisualizerProps {
  regex: string;
  text: string;
  currentStep: Step | null;
}

export const Visualizer = ({ regex, text, currentStep }: VisualizerProps) => {
  const rIdx = currentStep?.regexIndex ?? -1;
  const sIdx = currentStep?.stringIndex ?? -1;
  const type = currentStep?.type;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto my-8">
      {/* REGEX DISPLAY */}
      <div className="bg-surface p-6 rounded-xl shadow-lg border border-slate-700">
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Pattern</h3>
        <div className="font-mono text-2xl tracking-wide break-all">
          {regex.split('').map((char, index) => (
            <span
              key={index}
              className={clsx(
                "inline-block px-1 rounded transition-colors duration-200",
                index === rIdx && type === 'match' && "bg-success/20 text-success border border-success",
                index === rIdx && type === 'fail' && "bg-accent/20 text-accent border border-accent",
              )}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* STRING DISPLAY */}
      <div className="bg-surface p-6 rounded-xl shadow-lg border border-slate-700">
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Target String</h3>
        <div className="font-mono text-2xl tracking-wide break-all">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={clsx(
                "inline-block px-1 rounded transition-colors duration-200",
                index === sIdx && "bg-white/10 ring-2 ring-primary"
              )}
            >
              {char}
            </span>
          ))}
          {/* Cursor at end of string */}
          <span className={clsx("inline-block w-2 h-6 align-middle ml-1 bg-gray-600", sIdx === text.length && "bg-white")}></span>
        </div>
      </div>
    </div>
  );
};