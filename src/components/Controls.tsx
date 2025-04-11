import React from 'react';
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  onTogglePlay: () => void;
  onStep: (delta: number) => void;
  onSeek: (step: number) => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  isPlaying, currentStep, totalSteps, onTogglePlay, onStep, onSeek, onReset 
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
      {/* Slider Timeline */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1 font-mono">
          <span>Start</span>
          <span>Step {currentStep} / {totalSteps - 1}</span>
        </div>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={onReset}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>

        <button onClick={() => onSeek(0)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <SkipBack size={20} />
        </button>
        
        <button onClick={() => onStep(-1)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={onTogglePlay}
          className="w-14 h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform active:scale-95"
        >
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={() => onStep(1)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ChevronRight size={24} />
        </button>

        <button onClick={() => onSeek(totalSteps - 1)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};